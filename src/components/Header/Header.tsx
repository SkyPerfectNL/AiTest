import type React from 'react'
import { useSidebar, useAuth } from '@contexts/'
import { MenuButton } from '@components/'
import './Header.scss'

interface HeaderProps {
  actionText?: string
  actionLink?: string
}

export const Header: React.FC<HeaderProps> = () => {
  const { toggleSidebar } = useSidebar()
  const { user, isAuthenticated, logout, openAuthModal } = useAuth()

  const handleLogout = () => {
    logout()
    window.location.href = '/'
  }

  return (
    <div className="header">
      <div className="headerLeft">
        <MenuButton onClick={toggleSidebar} />
      </div>
      <div className="headerMid">
        <div className="inputUrl">
          <label htmlFor="url">URL:</label>
          <input id="url" type="text" className="url" />
        </div>
        <div className="inputsLow">
          <div className="inputLow">
            <label htmlFor="login">Login:</label>
            <input id="login" type="text" className="login" />
          </div>
          <div className="inputLow">
            <label htmlFor="password">Password: </label>
            <input id="password" type="text" className="password" />
          </div>
        </div>
      </div>
      <div className="headerRight">
        {isAuthenticated && (
          <>
            <span className="userGreeting">
              Привет, {user?.profileData.username || 'Пользователь'}{' '}
            </span>
            <button onClick={handleLogout} className="headerAction">
              Выйти
            </button>
          </>
        )}
        <button
          onClick={(e) => {
            if (isAuthenticated) {
              window.location.href = '/account'
            } else {
              openAuthModal('login')
              e.currentTarget.blur()
            }
          }}
          className="headerAction"
        >
          {isAuthenticated ? 'Личный кабинет' : 'Войти'}
        </button>
      </div>
    </div>
  )
}
