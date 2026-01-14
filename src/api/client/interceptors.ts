import {
  RequestConfig,
  RequestInterceptor,
  ResponseInterceptor,
  ErrorInterceptor,
} from './types'
import { useAuthStore } from '@stores/'
import { isTokenExpired } from '@utils/'
import { ApiError, AuthError, NetworkError } from '@interfaces/'
import { authApi } from '@api'

export const authRequestInterceptor: RequestInterceptor = async (
  config: RequestConfig
) => {
  const { accessToken } = useAuthStore.getState()

  if (accessToken && isTokenExpired(accessToken)) {
    console.warn('Access token expired, request may fail')
  }

  if (accessToken) {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    }
  }

  return config
}

export const errorResponseInterceptor: ResponseInterceptor = async (
  response: Response
) => {
  if (!response.ok) {
    let errorData: { message: string; code?: string; details?: unknown }
    try {
      errorData = await response.json()
    } catch {
      errorData = { message: response.statusText }
    }

    switch (response.status) {
      case 209:
        throw new ApiError(
          errorData.message || 'Token expired',
          response.status,
          'TOKEN_EXPIRED',
          errorData.details
        )
      case 401:
        throw new AuthError(
          errorData.message || 'Authentication required',
          'AUTH_REQUIRED'
        )
      default:
        throw new ApiError(
          errorData.message || `HTTP error! status: ${response.status}`,
          response.status,
          errorData.code || 'HTTP_ERROR',
          errorData.details
        )
    }
  }

  return response
}

export const tokenRefreshInterceptor: ResponseInterceptor = async (
  response: Response
) => {
  if (response.status === 209) {
    // Access token expired but refresh token valid
    try {
      await authApi.handleTokenRefresh()
      // After refresh one more request to test
      // probably better on clientapi or request
    } catch (error) {
      console.error('Token refresh failed:', error)
      throw error
    }
  }
  return response
}

export const networkErrorInterceptor: ErrorInterceptor = async (
  error: Error
) => {
  if (error.name === 'TypeError' && error.message.includes('fetch')) {
    return new NetworkError('Network connection failed')
  }
  return error
}
