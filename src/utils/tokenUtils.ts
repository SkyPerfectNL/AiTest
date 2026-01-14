export interface JwtPayload {
  exp: number
  iat: number
  [key: string]: unknown
}

export const decodeJWT = (token: string): JwtPayload | null => {
  try {
    const payload = token.split('.')[1]
    return JSON.parse(atob(payload))
  } catch {
    return null
  }
}

export const isTokenExpired = (token: string): boolean => {
  const payload = decodeJWT(token)
  if (!payload || !payload.exp) return false
  return Date.now() >= payload.exp * 1000 - 30000
}

export const getTokenExpirationTime = (token: string): number | null => {
  const payload = decodeJWT(token)
  return payload?.exp ? payload.exp * 1000 : null
}
