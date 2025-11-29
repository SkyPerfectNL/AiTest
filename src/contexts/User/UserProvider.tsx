import React, { useEffect } from 'react'
import { useUserStore, useAuthStore } from '@stores/'
import { authApi, usersApi } from '@api'
import { UserContext } from './UserContext'
import { MOCK_MODE } from '@constants/'
import { User, UserContextType } from '@interfaces/'
import { mockApiService } from '../../services/mockApiService'

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, setUser, updateUser, setLoading, setError, clearUser } =
    useUserStore()
  const { accessToken, isAuthenticated } = useAuthStore()

  useEffect(() => {
    const loadUserData = async () => {
      if (isAuthenticated && accessToken) {
        try {
          setLoading(true)
          let userData

          if (MOCK_MODE) {
            userData = await mockApiService.getCurrentUser()
          } else {
            userData = await authApi.getCurrentUser()
          }

          setUser(userData)
        } catch (error) {
          console.error('Failed to load user data:', error)
          setError(
            error instanceof Error ? error.message : 'Failed to load user data'
          )
        } finally {
          setLoading(false)
        }
      } else {
        clearUser()
      }
    }

    loadUserData()
  }, [isAuthenticated, accessToken, setUser, setLoading, setError, clearUser])

  const refreshUser = async (): Promise<void> => {
    if (!user) return

    try {
      setLoading(true)
      let userData

      if (MOCK_MODE) {
        userData = await mockApiService.getUserProfile(user.id)
      } else {
        userData = await usersApi.getUserProfile(user.id)
      }

      setUser(userData)
    } catch (error) {
      console.error('Failed to refresh user data:', error)
      setError(
        error instanceof Error ? error.message : 'Failed to refresh user data'
      )
      throw error
    } finally {
      setLoading(false)
    }
  }

  const updateUserProfile = async (
    profileData: Partial<User['profileData']>
  ): Promise<void> => {
    if (!user) return

    try {
      setLoading(true)
      let updatedUser

      if (MOCK_MODE) {
        updatedUser = await mockApiService.updateUserProfile(
          user.id,
          profileData
        )
      } else {
        updatedUser = await usersApi.updateUserProfile(user.id, { profileData })
      }

      setUser(updatedUser)
    } catch (error) {
      console.error('Failed to update user profile:', error)
      setError(
        error instanceof Error ? error.message : 'Failed to update profile'
      )
      throw error
    } finally {
      setLoading(false)
    }
  }

  const updateUserSettings = async (
    settingsData: Partial<User['settingsData']>
  ): Promise<void> => {
    if (!user) return

    try {
      setLoading(true)
      let updatedUser

      if (MOCK_MODE) {
        updatedUser = await mockApiService.updateUserSettings(
          user.id,
          settingsData
        )
      } else {
        updatedUser = await usersApi.updateUserSettings(user.id, {
          settingsData,
        })
      }

      setUser(updatedUser)
    } catch (error) {
      console.error('Failed to update user settings:', error)
      setError(
        error instanceof Error ? error.message : 'Failed to update settings'
      )
      throw error
    } finally {
      setLoading(false)
    }
  }

  const updateUserConfirmation = async (
    type: 'email' | 'phone'
  ): Promise<void> => {
    if (!user) return

    try {
      updateUser({
        profileData: {
          ...user.profileData,
          [`${type}Confirmed`]: true,
        },
      })
    } catch (error) {
      console.error('Failed to update user confirmation:', error)
      setError(
        error instanceof Error ? error.message : 'Failed to update confirmation'
      )
      throw error
    }
  }

  const clearError = (): void => {
    setError(null)
  }

  const value: UserContextType = {
    user,
    isLoading: useUserStore.getState().isLoading,
    error: useUserStore.getState().error,
    refreshUser,
    updateUserProfile,
    updateUserSettings,
    updateUserConfirmation,
    clearError,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
