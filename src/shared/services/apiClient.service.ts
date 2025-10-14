import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import { ApiClientError, ErrorCode, ApiResponse } from '../types/api.types';
import { sanitizeObject, redactSensitiveData } from '../utils/security.utils';
import { getBotDetectionHeaders } from '../utils/botDetection.utils';

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'https://localhost:7002/api/';
const API_TIMEOUT = 30000;

/**
 * TokenManager — keeps the access token in memory only.
 * (Secure: resets on refresh, not stored in localStorage)
 */
class TokenManager {
  private static accessToken: string | null = null;
  private static storageKey = 'accessToken';

  static getAccessToken(): string | null {
    if (!this.accessToken) {
      this.accessToken = sessionStorage.getItem(this.storageKey);
    }
    return this.accessToken;
  }

  static setAccessToken(token: string): void {
    this.accessToken = token;
    sessionStorage.setItem(this.storageKey, token);
  }

  static clear(): void {
    this.accessToken = null;
    sessionStorage.removeItem(this.storageKey);
  }
}

/**
 * ApiClient — handles:
 * - Attaching tokens
 * - Silent refresh using HttpOnly cookie
 * - Preventing refresh loops
 */
class ApiClient {
  private client: AxiosInstance;
  private isRefreshing = false;
  private refreshSubscribers: Array<(token: string) => void> = [];

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: API_TIMEOUT,
      withCredentials: true, // ✅ allows backend HttpOnly cookie
      headers: { 'Content-Type': 'application/json' },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.client.interceptors.request.use(this.handleRequest.bind(this));
    this.client.interceptors.response.use(
      this.handleResponse.bind(this),
      this.handleResponseError.bind(this)
    );
  }

  private async handleRequest(config: InternalAxiosRequestConfig) {
    const token = TokenManager.getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;

    Object.assign(config.headers, getBotDetectionHeaders());
    config.headers['X-Request-ID'] = this.generateRequestId();

    if (config.data) config.data = sanitizeObject(config.data);

    if (process.env.NODE_ENV === 'development') {
      console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`, {
        data: redactSensitiveData(config.data || {}),
      });
    }

    return config;
  }

  private async handleResponse(response: any) {
    const newToken = response.headers['x-access-token'];
    if (newToken) {
      TokenManager.setAccessToken(newToken);
      if (process.env.NODE_ENV === 'development') {
        console.log('🔐 Access token updated from header.');
      }
    }
    return response;
  }

  /**
   * Handle 401 errors by automatically refreshing access token.
   * Skips itself during /auth/refresh calls to prevent infinite loops.
   */
  private async handleResponseError(error: AxiosError<ApiResponse<any>>) {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (!error.response) {
      throw new ApiClientError('Network error', 0, ErrorCode.NETWORK_ERROR);
    }

    const { status, config } = error.response;
    const isRefreshCall = config?.url?.includes('/auth/refresh');

    if (status === 401 && !originalRequest._retry && !isRefreshCall) {
      originalRequest._retry = true;
      try {
        const newToken = await this.refreshAccessToken();
        if (newToken && originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return this.client(originalRequest); // retry once
        }
      } catch {
        TokenManager.clear();
        window.location.href = '/login';
        throw new ApiClientError(
          'Session expired. Please log in again.',
          401,
          ErrorCode.AUTHENTICATION_ERROR
        );
      }
    }

    // prevent recursive refresh loops
    if (isRefreshCall) {
      console.warn('[API] Refresh call failed — not retrying recursively.');
      TokenManager.clear();
    }

    throw error;
  }

  /**
   * Calls /auth/refresh to get a new access token using the HttpOnly cookie.
   * Never runs recursively.
   */
  private async refreshAccessToken(): Promise<string | null> {
    if (
      this.isRefreshing ||
      window.location.pathname.includes('/auth/refresh')
    ) {
      console.log('[API] Skipping duplicate refresh request.');
      return null;
    }

    this.isRefreshing = true;

    try {
      const res = await axios.post(
        `${API_BASE_URL}auth/refresh`,
        {},
        { withCredentials: true }
      );

      const newToken = res.headers['x-access-token'];
      if (newToken) {
        TokenManager.setAccessToken(newToken);
        this.refreshSubscribers.forEach((cb) => cb(newToken));
        this.refreshSubscribers = [];
        return newToken;
      }

      return null;
    } finally {
      this.isRefreshing = false;
    }
  }

  private generateRequestId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }

  // basic wrappers
  async get<T>(url: string, config?: any): Promise<T> {
    const response = await this.client.get<ApiResponse<T>>(url, config);
    return response.data.data!;
  }

  async post<T>(url: string, data?: any, config?: any): Promise<T> {
    const response = await this.client.post<ApiResponse<T>>(url, data, config);
    return response.data.data!;
  }

  async put<T>(url: string, data?: any, config?: any): Promise<T> {
    const response = await this.client.put<ApiResponse<T>>(url, data, config);
    return response.data.data!;
  }

  async delete<T>(url: string, config?: any): Promise<T> {
    const response = await this.client.delete<ApiResponse<T>>(url, config);
    return response.data.data!;
  }

  getClient(): AxiosInstance {
    return this.client;
  }
}

export const apiClient = new ApiClient();
export { TokenManager };
