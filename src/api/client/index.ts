import {
  RequestConfig,
  RequestInterceptor,
  ResponseInterceptor,
  ErrorInterceptor,
} from './types'
import {
  authRequestInterceptor,
  errorResponseInterceptor,
  networkErrorInterceptor,
} from './interceptors'
import { API_URL } from '@constants/'

class ApiClient {
  private requestInterceptors: RequestInterceptor[] = []
  private responseInterceptors: ResponseInterceptor[] = []
  private errorInterceptors: ErrorInterceptor[] = []

  constructor() {
    this.registerRequestInterceptor(authRequestInterceptor)
    this.registerResponseInterceptor(errorResponseInterceptor)
    this.registerErrorInterceptor(networkErrorInterceptor)
  }

  registerRequestInterceptor(interceptor: RequestInterceptor): void {
    this.requestInterceptors.push(interceptor)
  }

  registerResponseInterceptor(interceptor: ResponseInterceptor): void {
    this.responseInterceptors.push(interceptor)
  }

  registerErrorInterceptor(interceptor: ErrorInterceptor): void {
    this.errorInterceptors.push(interceptor)
  }

  async request<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    let requestConfig: RequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
      ...config,
    }

    for (const interceptor of this.requestInterceptors) {
      requestConfig = await interceptor(requestConfig)
    }

    let response: Response
    try {
      response = await fetch(`${API_URL.BASE}${endpoint}`, requestConfig)

      for (const interceptor of this.responseInterceptors) {
        response = await interceptor(response)
      }

      return response.json() as Promise<T>
    } catch (error) {
      let processedError = error as Error

      for (const interceptor of this.errorInterceptors) {
        processedError = await interceptor(processedError)
      }

      throw processedError
    }
  }

  async get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'GET' })
  }

  async post<T>(
    endpoint: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put<T>(
    endpoint: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async patch<T>(
    endpoint: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' })
  }
}

export const apiClient = new ApiClient()
