import type React from 'react'
import { useSidebar, useAuth } from '@contexts/'
import { MenuButton } from '@components/'
import './Header.scss'

interface HeaderProps {
  actionText?: string
  actionLink?: string
}

export const Header: React.FC<HeaderProps> = ({ actionText, actionLink }) => {
  const { toggleSidebar } = useSidebar()
  const { user, isAuthenticated, logout, openAuthModal } = useAuth()

  const handleAuthAction = () => {
    if (isAuthenticated) {
      window.location.href = '/home'
    } else {
      openAuthModal('login')
    }
  }

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
        {isAuthenticated ? (
          <>
            <span className="userGreeting">
              Привет, {user?.username || 'Пользователь'}{' '}
            </span>
            <button onClick={handleLogout} className="headerAction">
              Выйти
            </button>
            {actionLink && actionText ? (
              <a href={actionLink} className="headerAction">
                {actionText}
              </a>
            ) : (
              <button
                onClick={() => (window.location.href = '/home')}
                className="headerAction"
              >
                Личный кабинет
              </button>
            )}
          </>
        ) : (
          <>
            {actionLink && actionText ? (
              <a href={actionLink} className="headerAction">
                {actionText}
              </a>
            ) : (
              <button onClick={handleAuthAction} className="headerAction">
                {window.location.pathname === '/' ? 'Войти' : 'Личный кабинет'}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )
}
