import React, { useState } from 'react'
import { LoginFormData, RegisterFormData, ConfirmEmailFormData } from '@types/'
import { LoginForm } from './Forms/LoginForm'
import { RegisterForm } from './Forms/RegisterForm'
import { ConfirmEmailForm } from './Forms/ConfirmEmailForm'
import { useAuth } from '@contexts/'

import styles from './AuthModal.module.scss'

export const AuthModal: React.FC = () => {
  const {
    authModal,
    closeAuthModal,
    login,
    register,
    confirmEmail,
    pendingEmail,
    openAuthModal,
  } = useAuth()

  const [loginData, setLoginData] = useState<LoginFormData>({
    email: '',
    password: '',
  })

  const [registerData, setRegisterData] = useState<RegisterFormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [confirmData, setConfirmData] = useState<ConfirmEmailFormData>({
    code: '',
  })

  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const resetForms = () => {
    setLoginData({ email: '', password: '' })
    setRegisterData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    })
    setConfirmData({ code: '' })
    setError('')
  }

  const handleClose = () => {
    resetForms()
    closeAuthModal()
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  const switchToLogin = () => {
    resetForms()
    openAuthModal('login')
  }

  const switchToRegister = () => {
    resetForms()
    openAuthModal('register')
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const success = await login(loginData.email, loginData.password)
      if (!success) {
        setError('Неверный email или пароль')
      }
    } catch {
      setError('Ошибка при входе')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    if (registerData.password !== registerData.confirmPassword) {
      setError('Пароли не совпадают')
      setIsLoading(false)
      return
    }

    if (registerData.password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов')
      setIsLoading(false)
      return
    }

    try {
      const success = await register(
        registerData.username,
        registerData.email,
        registerData.password
      )
      if (!success) {
        setError('Пользователь с таким email уже существует')
      }
    } catch {
      setError('Ошибка при регистрации')
    } finally {
      setIsLoading(false)
    }
  }

  const handleConfirmEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    if (confirmData.code.length !== 6) {
      setError('Код должен содержать 6 символов')
      setIsLoading(false)
      return
    }

    try {
      const success = await confirmEmail(confirmData.code)
      if (!success) {
        setError('Неверный код подтверждения')
      }
    } catch {
      setError('Ошибка при подтверждении')
    } finally {
      setIsLoading(false)
    }
  }

  const getModalTitle = () => {
    switch (authModal) {
      case 'login':
        return 'Вход'
      case 'register':
        return 'Регистрация'
      case 'confirm':
        return 'Подтверждение e-mail'
      default:
        return ''
    }
  }

  return (
    <div
      className={`${styles.authModalOverlay} ${authModal ? styles.active : ''}`}
      onClick={handleOverlayClick}
    >
      <div className={styles.authModalContent}>
        <div className={styles.authModalHeader}>
          <h2>{getModalTitle()}</h2>
          <button className={styles.authCloseButton} onClick={handleClose}>
            ×
          </button>
        </div>

        {authModal === 'login' && (
          <LoginForm
            formData={loginData}
            error={error}
            isLoading={isLoading}
            onChange={(data) => setLoginData((prev) => ({ ...prev, ...data }))}
            onSubmit={handleLogin}
            onSwitchToRegister={switchToRegister}
          />
        )}

        {authModal === 'register' && (
          <RegisterForm
            formData={registerData}
            error={error}
            isLoading={isLoading}
            onChange={(data) =>
              setRegisterData((prev) => ({ ...prev, ...data }))
            }
            onSubmit={handleRegister}
            onSwitchToLogin={switchToLogin}
          />
        )}

        {authModal === 'confirm' && (
          <ConfirmEmailForm
            formData={confirmData}
            error={error}
            isLoading={isLoading}
            pendingEmail={pendingEmail}
            onChange={(data) =>
              setConfirmData((prev) => ({ ...prev, ...data }))
            }
            onSubmit={handleConfirmEmail}
            onSwitchToLogin={switchToLogin}
          />
        )}
      </div>
    </div>
  )
}
