import React, { useState, useEffect } from 'react'
import { User, AuthModalType, AuthContextType } from '@types/'
import { AuthContext } from './AuthContext'

const mockUsers = [
  {
    id: '1',
    username: 'testuser',
    email: 'test@test.com',
    password: 'password123',
    emailConfirmed: true,
  },
  {
    id: '2',
    username: 'demo',
    email: 'demo@demo.com',
    password: 'demo123',
    emailConfirmed: false,
  },
]

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null)
  const [authModal, setAuthModal] = useState<AuthModalType>(null)
  const [pendingEmail, setPendingEmail] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    const foundUser = mockUsers.find(
      (u) => u.email === email && u.password === password
    )

    if (foundUser) {
      const userData: User = {
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
        emailConfirmed: foundUser.emailConfirmed,
      }

      setUser(userData)
      localStorage.setItem('currentUser', JSON.stringify(userData))

      if (!foundUser.emailConfirmed) {
        openAuthModal('confirm', foundUser.email)
      } else {
        closeAuthModal()
      }
      return true
    }

    return false
  }

  const register = async (
    username: string,
    email: string
  ): Promise<boolean> => {
    const userExists = mockUsers.some((u) => u.email === email)
    if (userExists) {
      return false
    }

    openAuthModal('confirm', email)
    return true
  }

  const confirmEmail = async (code: string): Promise<boolean> => {
    if (code === '123456') {
      if (user) {
        const updatedUser = { ...user, emailConfirmed: true }
        setUser(updatedUser)
        localStorage.setItem('currentUser', JSON.stringify(updatedUser))
      }
      closeAuthModal()
      return true
    }

    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('currentUser')
  }

  const openAuthModal = (type: AuthModalType, email: string = '') => {
    setAuthModal(type)
    setPendingEmail(email)
  }

  const closeAuthModal = () => {
    setAuthModal(null)
    setPendingEmail('')
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    authModal,
    pendingEmail,
    isLoading,
    login,
    register,
    confirmEmail,
    logout,
    openAuthModal,
    closeAuthModal,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
