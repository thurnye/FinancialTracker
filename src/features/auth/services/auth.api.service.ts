/**
 * Auth API Service
 * - Login
 * - Register
 * - Logout
 * - Token refresh
 */

import { apiClient, TokenManager } from '../../../shared/services/apiClient.service';
import { IUserLoginInfo, RegisterData, AuthTokens, IUser } from '../types/auth.types';

class AuthApiService {
  /**
   * Login user
   */
  async login(credentials: IUserLoginInfo): Promise<AuthTokens> {
    console.log('[Auth API] 🔐 Login attempt for:', credentials.email);

    // Make the request using the underlying axios client to access headers
    const axiosResponse = await apiClient.getClient().post<any>('/auth/login', credentials);

    console.log('[Auth API] Login response status:', axiosResponse.status);
    console.log('[Auth API] Login response headers:', axiosResponse.headers);
    console.log('[Auth API] Login response data:', axiosResponse.data);

    // Check for Set-Cookie header (even though we can't read HttpOnly cookies)
    const setCookieHeader = axiosResponse.headers['set-cookie'];
    console.log('[Auth API] Set-Cookie header:', setCookieHeader);

    // Extract access token from response header
    const accessToken = axiosResponse.headers['x-access-token'];

    if (!accessToken) {
      console.error('[Auth API] ❌ No access token in response headers!');
      throw new Error('No access token received from server');
    }

    console.log('[Auth API] ✅ Access token received, length:', accessToken.length);

    // Store access token in memory
    // Refresh token is automatically set by backend as HttpOnly cookie
    TokenManager.setAccessToken(accessToken);
    console.log('[Auth API] ✅ Access token stored in TokenManager');

    // Return combined response matching AuthTokens interface
    const result = {
      accessToken,
      refreshToken: '', // Not needed - it's in HttpOnly cookie
      user: axiosResponse.data.data
    };

    console.log('[Auth API] ✅ Login successful, returning user:', result.user.email);
    return result;
  }

  /**
   * Register new user
   */
  async register(data: RegisterData): Promise<AuthTokens> {
    // Make the request using the underlying axios client to access headers
    const axiosResponse = await apiClient.getClient().post<any>('/auth/register', data);

    // Extract access token from response header
    const accessToken = axiosResponse.headers['x-access-token'];

    if (!accessToken) {
      throw new Error('No access token received from server');
    }

    // Store access token in memory
    // Refresh token is automatically set by backend as HttpOnly cookie
    TokenManager.setAccessToken(accessToken);

    // Return combined response matching AuthTokens interface
    return {
      accessToken,
      refreshToken: '', // Not needed - it's in HttpOnly cookie
      user: axiosResponse.data.data
    };
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } finally {
      // Clear tokens regardless of API response
      TokenManager.clear();
    }
  }

  /**
   * Get current user profile
   */
  async getCurrentUser(): Promise<IUser> {
    return apiClient.get<IUser>('/auth/me');
  }

  /**
   * Refresh access token
   */
  async refreshToken(): Promise<AuthTokens> {
    try {
      console.log('[Auth API] Calling /auth/refresh endpoint...');

      // No need to send refresh token - it's in HttpOnly cookie
      // Backend will automatically read it from the cookie
      const axiosResponse = await apiClient.getClient().post<any>('/auth/refresh', {});

      console.log('[Auth API] Refresh response status:', axiosResponse.status);
      console.log('[Auth API] Response headers:', axiosResponse.headers);
      console.log('[Auth API] Response data:', axiosResponse.data);

      // Extract access token from response header
      const accessToken = axiosResponse.headers['x-access-token'];

      if (!accessToken) {
        console.error('[Auth API] ❌ No access token in response headers');
        throw new Error('No access token received from server');
      }

      console.log('[Auth API] ✅ Access token received from header');

      // Update access token in memory
      TokenManager.setAccessToken(accessToken);
      // Backend sets new refresh token cookie automatically

      // Extract user from response body
      const userData = axiosResponse.data.data;

      if (!userData) {
        console.error('[Auth API] ❌ No user data in response body');
        throw new Error('No user data received from server');
      }

      console.log('[Auth API] ✅ User data received:', userData);

      return {
        accessToken,
        refreshToken: '', // Not needed - it's in HttpOnly cookie
        user: userData
      };
    } catch (error: any) {
      console.error('[Auth API] ❌ Refresh token error:', error);
      console.error('[Auth API] Error response:', error.response?.data);
      console.error('[Auth API] Error status:', error.response?.status);
      throw error;
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return TokenManager.getAccessToken() !== null;
  }

  /**
   * Request password reset
   */
  async requestPasswordReset(email: string): Promise<void> {
    await apiClient.post('/auth/password/reset-request', { email });
  }

  /**
   * Reset password with token
   */
  async resetPassword(token: string, newPassword: string): Promise<void> {
    await apiClient.post('/auth/password/reset', { token, newPassword });
  }

  /**
   * Change password (authenticated user)
   */
  async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    await apiClient.post('/auth/password/change', {
      currentPassword,
      newPassword,
    });
  }

  /**
   * Verify email with token
   */
  async verifyEmail(token: string): Promise<void> {
    await apiClient.post('/auth/email/verify', { token });
  }

  /**
   * Resend verification email
   */
  async resendVerificationEmail(): Promise<void> {
    await apiClient.post('/auth/email/resend-verification');
  }
}

export const authApiService = new AuthApiService();
