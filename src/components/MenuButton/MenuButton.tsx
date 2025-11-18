import React from 'react'
import styles from './MenuButton.module.scss'

export const MenuButton: React.FC<{
  onClick: () => void
  isActive?: boolean
}> = ({ onClick, isActive }) => {
  return (
    <div
      className={`${styles.menuToggle} ${isActive ? styles.open : ''}`}
      onClick={onClick}
    >
      <div className={styles.bar} />
      <div className={styles.bar} />
      <div className={styles.bar} />
    </div>
  )
}
