// useSidebarNavigation.ts
import { useAuth } from '@contexts/'

export interface MenuItem {
  title: string
  link: string
  icon: string
  requireAuth?: boolean
  children?: MenuItem[]
}

export const useSidebarNavigation = () => {
  const { isAuthenticated, openAuthModal } = useAuth()

  const baseItems: MenuItem[] = [
    {
      title: 'Главная',
      link: '/',
      icon: '#',
      requireAuth: false,
    },
    {
      title: 'О проекте',
      link: '/about',
      icon: '#',
      requireAuth: false,
    },
  ]

  const authItems: MenuItem[] = [
    {
      title: 'Проекты',
      link: '/home',
      icon: '#',
      requireAuth: true,
      children: [
        {
          title: 'Список проектов',
          link: '/home',
          icon: '#',
          requireAuth: true,
        },
        {
          title: 'Создать новый',
          link: '/project/new',
          icon: '#',
          requireAuth: true,
        },
      ],
    },
    {
      title: 'Планировщик',
      link: '#',
      icon: '#',
      requireAuth: true,
      children: [
        {
          title: 'Список задач',
          link: '#',
          icon: '#',
          requireAuth: true,
        },
        {
          title: 'Создать задачу',
          link: '#',
          icon: '#',
          requireAuth: true,
        },
      ],
    },
    {
      title: 'Ресурсы',
      link: '/resources',
      icon: '#',
      requireAuth: true,
      children: [
        {
          title: 'Мониторинг',
          link: '#',
          icon: '#',
          requireAuth: true,
        },
        {
          title: 'Аналитика',
          link: '#',
          icon: '#',
          requireAuth: true,
        },
      ],
    },
  ]

  const menuItems = [...baseItems, ...(isAuthenticated ? authItems : [])]

  const handleMenuItemClick = (e: React.MouseEvent, item: MenuItem) => {
    if (item.requireAuth && !isAuthenticated) {
      e.preventDefault()
      openAuthModal('login')
      return
    }
  }

  return {
    menuItems,
    handleMenuItemClick,
    isAuthenticated,
  }
}
