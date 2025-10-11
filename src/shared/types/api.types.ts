/**
 * Shared API Response Types
 * Matches backend format from libs/response.ts
 */

export interface ApiError {
  code: string;
  message: string;
  field?: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiMeta {
  requestId: string;
  timestamp: string;
  pagination?: PaginationMeta;
}

export interface ApiResponse<T = any> {
  data: T | null;
  meta: ApiMeta;
  errors?: ApiError[];
}

// Type guards
export const isSuccessResponse = <T,>(
  response: ApiResponse<T>
): response is ApiResponse<T> & { data: T } => {
  return response.data !== null && !response.errors;
};

export const isErrorResponse = <T,>(
  response: ApiResponse<T>
): response is ApiResponse<null> & { errors: ApiError[] } => {
  return response.data === null && Array.isArray(response.errors);
};

// Error Codes matching backend
export enum ErrorCode {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR = 'AUTHORIZATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  CONFLICT_ERROR = 'CONFLICT_ERROR',
  RATE_LIMIT_ERROR = 'RATE_LIMIT_ERROR',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  NETWORK_ERROR = 'NETWORK_ERROR',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',
}

// Custom API Error Class
export class ApiClientError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public code: ErrorCode = ErrorCode.INTERNAL_ERROR,
    public field?: string,
    public errors?: ApiError[]
  ) {
    super(message);
    this.name = 'ApiClientError';
  }
}
