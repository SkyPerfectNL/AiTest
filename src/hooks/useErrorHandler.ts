import { useState, useCallback } from 'react'
import { ApiError, AuthError, NetworkError } from '@interfaces/'

export const useErrorHandler = () => {
  const [error, setError] = useState<string | null>(null)

  const handleError = useCallback((error: unknown) => {
    if (error instanceof AuthError) {
      setError('Authentication error: ' + error.message)
      // auto redirect to login nado
    } else if (error instanceof NetworkError) {
      setError('Network error: Please check your connection')
    } else if (error instanceof ApiError) {
      setError(`API error: ${error.message}`)
    } else if (error instanceof Error) {
      setError(error.message)
    } else {
      setError('An unknown error occurred')
    }
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    error,
    handleError,
    clearError,
  }
}
