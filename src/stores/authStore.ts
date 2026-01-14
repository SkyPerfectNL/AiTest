import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AuthModalType } from '@interfaces/'
import { isTokenExpired } from '@utils/'

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  authModal: AuthModalType
  pendingEmail: string
  pendingPhone: string
  isLoading: boolean

  setTokens: (accessToken: string, refreshToken: string) => void
  setAuthModal: (authModal: AuthModalType) => void
  setPendingEmail: (email: string) => void
  setPendingPhone: (phone: string) => void
  setLoading: (loading: boolean) => void
  logout: () => void
  onConfirmAction: (type: "phone" | "email") => void
  setOnConfirmAction: (callback: (type: "phone" | "email") => void) => void
  validateToken: () => boolean
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      authModal: null,
      pendingEmail: '',
      pendingPhone: '',
      isLoading: false,
      onConfirmAction: (type) => {},

      setTokens: (accessToken, refreshToken) =>
        set({
          accessToken,
          refreshToken,
          isAuthenticated: !isTokenExpired(accessToken),
        }),

      setAuthModal: (authModal) => set({ authModal }),

      setPendingEmail: (pendingEmail) => set({ pendingEmail }),

      setPendingPhone: (pendingPhone) => set({ pendingPhone }),

      setLoading: (isLoading) => set({ isLoading }),

      setOnConfirmAction: (onConfirmAction) => set({ onConfirmAction }),

      logout: () =>
        set({
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          authModal: null,
          pendingEmail: '',
          onConfirmAction: (type) => {},
        }),

      validateToken: () => {
        const { accessToken } = get()
        if (!accessToken) return false

        const isValid = !isTokenExpired(accessToken)
        if (!isValid) {
          set({
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
          })
        }
        return isValid
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
    }
  )
)
