export interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  authModal: AuthModalType
  pendingEmail: string
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<boolean>
  confirmEmail: (code: string) => Promise<boolean>
  logout: () => void
  openAuthModal: (type: AuthModalType, email?: string) => void
  closeAuthModal: () => void
}

export interface User {
  id: string
  username: string
  email: string
  emailConfirmed: boolean
}

export interface LoginFormData {
  email: string
  password: string
}

export interface RegisterFormData {
  username: string
  email: string
  password: string
  confirmPassword: string
}

export interface ConfirmEmailFormData {
  code: string
}

export type FormDataToRecord<T> = {
  [K in keyof T]: string
}

export type PartialFormData<T> = Partial<FormDataToRecord<T>>

export type AuthModalType = 'login' | 'register' | 'confirm' | null
