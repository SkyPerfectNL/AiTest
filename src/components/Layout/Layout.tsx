import type React from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Pipeline, Sidebar } from '../'
import { useSidebar } from '@contexts/'
import styles from './Layout.module.scss'

export const Layout: React.FC = () => {
  const { isOpen } = useSidebar()

  return (
    <div className={styles.bodyLayout}>
      <Sidebar />
      <div
        className={`${styles.contentLayout} ${isOpen ? styles.contentShifted : ''}`}
      >
        <Header />
        <Pipeline />
        <div className={styles.mainContent}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
