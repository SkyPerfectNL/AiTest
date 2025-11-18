import React, { useEffect, useRef, useState } from 'react'
import { useSidebar } from '@contexts/'
import { useMenuItems } from './menuItems'
import styles from './Sidebar.module.scss'

export const Sidebar: React.FC = () => {
  const { isOpen, closeSidebar } = useSidebar()
  // const [loading, setLoading] = useState(true);
  const listRef = useRef<HTMLUListElement>(null)
  const menuItems = useMenuItems()

  useEffect(() => {
    // if(loading) {
    // return;
    // }
    const className = isOpen ? styles.animateOpen : styles.animateClose
    if (listRef.current) {
      listRef.current.classList.add(className)
    }
    const timer = setTimeout(
      () => {
        if (listRef.current) {
          listRef.current.classList.remove(className)
        }
        return () => clearTimeout(timer)
      },
      510 + 100 * menuItems.length
    )
  }, [isOpen])

  // useEffect(() => {
  // setLoading(false)
  // }, [])

  return (
    <>
      {isOpen && (
        <div
          className={`${styles.sidebarOverlay} ${isOpen ? styles.active : ''}`}
          onClick={closeSidebar}
        />
      )}
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <nav className={`${styles.sidebarMenu} ${isOpen ? styles.open : ''}`}>
          {isOpen && (
            <button
              className={styles.closeSidebarMobile}
              onClick={closeSidebar}
            >
              ×
            </button>
          )}
          <div className={styles.logoCont}>
            <a href="/" className={`${!isOpen ? styles.miniLogo : ''}`}>
              <img src="#" alt="логотип" />
            </a>
          </div>
          <ul
            ref={listRef}
            className={`${isOpen ? styles.menuList : styles.sidebarIcons}`}
          >
            {menuItems.map((item) => (
              <li key={item.link} className={styles.menuItem}>
                <a
                  href={item.link}
                  className={`${isOpen ? styles.menuLink : styles.iconLink}`}
                  title={!isOpen ? item.title : undefined}
                >
                  <img
                    src={item.icon}
                    alt={item.title}
                    className={`${isOpen ? styles.menuIcon : styles.iconImg}`}
                  />
                  {isOpen && (
                    <span className={styles.menuText}>{item.title}</span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}
