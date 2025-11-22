import type React from 'react'
import { ProtectedRoute } from '@components/'
import styles from './styles/ProjectContainer.module.scss'

export const ProjectContainer: React.FC = () => {
  return (
    <ProtectedRoute>
      <div className={styles.pageContainer}>
        <div className={styles.pageUp}>
          <a href="#" className={styles.block}>
            <p>Тест-кейсы</p>
          </a>
          <a href="#" className={styles.block}>
            <p>Тест-план</p>
          </a>
          <a href="#" className={styles.block}>
            <p>Скрипты</p>
          </a>
          <a href="#" className={styles.block}>
            <p>Автотестинг</p>
          </a>
          <a href="#" className={styles.block}>
            <p>Отчеты</p>
          </a>
        </div>
        <div className={styles.pageDown}>
          <p>Управление проектом. Выберите раздел для работы.</p>
        </div>
      </div>
    </ProtectedRoute>
  )
}
