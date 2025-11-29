import type React from 'react'
import styles from './styles/ProjectContainer.module.scss'
import { Pipeline } from '@components/'
import { useAuth, useUser } from '@contexts/'

export const ProjectContainer: React.FC = () => {
  const { isAuthenticated, logout } = useAuth()
  const { user, refreshUser, updateUserSettings, isLoading } = useUser()

  const handleUpdateTheme = async () => {
    try {
      await updateUserSettings({
        theme: user?.settingsData.theme === 'light' ? 'dark' : 'light',
      })
    } catch (error) {
      console.error('Failed to update theme:', error)
    }
  }

  if (!isAuthenticated) {
    return <div>Please log in to access projects</div>
  }

  if (isLoading && !user) {
    return <div>Loading user data...</div>
  }

  return (
    <>
      <Pipeline />
      <div className={styles.pageContainer}>
        <div className={styles.userPanel}>
          <div className={styles.userInfo}>
            <h3>Welcome, {user?.profileData.firstName}!</h3>
            <p>Email: {user?.profileData.email}</p>
            <p>Company: {user?.profileData.company || 'Not specified'}</p>
            <p>Projects: {user?.projectData.projects.length}</p>
            <p>Theme: {user?.settingsData.theme}</p>
          </div>
          <div className={styles.userActions}>
            <button
              onClick={refreshUser}
              className={styles.btn}
              disabled={isLoading}
            >
              {isLoading ? 'Refreshing...' : 'Refresh Profile'}
            </button>
            <button
              onClick={handleUpdateTheme}
              className={styles.btn}
              disabled={isLoading}
            >
              Toggle Theme
            </button>
            <button onClick={logout} className={styles.btnLogout}>
              Logout
            </button>
          </div>
        </div>

        <div className={styles.pageUp}>
          <a href="#" className={styles.block}>
            <p>Тест-кейсы</p>
            <span>Manage test cases</span>
          </a>
          <a href="#" className={styles.block}>
            <p>Тест-план</p>
            <span>Create test plans</span>
          </a>
          <a href="#" className={styles.block}>
            <p>Скрипты</p>
            <span>Testing scripts</span>
          </a>
          <a href="#" className={styles.block}>
            <p>Автотестинг</p>
            <span>Automated testing</span>
          </a>
          <a href="#" className={styles.block}>
            <p>Отчеты</p>
            <span>Generate reports</span>
          </a>
        </div>
        <div className={styles.pageDown}>
          <p>
            Управление проектом{' '}
            {user?.projectData.projects[0]?.name || 'Default Project'}. Выберите
            раздел для работы.
          </p>
          <p>
            Balance: ${user?.financeData.balance} | Subscription:{' '}
            {user?.financeData.subscription === 0 ? 'Free' : 'Premium'}
          </p>
        </div>
      </div>
    </>
  )
}
