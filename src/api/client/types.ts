export interface RequestConfig extends RequestInit {
  headers?: Record<string, string>
}

export interface ErrorResponse {
  message: string
  code?: string
  details?: unknown
}

export interface RequestInterceptor {
  (config: RequestConfig): Promise<RequestConfig> | RequestConfig
}

export interface ResponseInterceptor {
  (response: Response): Promise<Response> | Response
}

export interface ErrorInterceptor {
  (error: Error): Promise<Error> | Error
}
