import { HelmetProvider } from 'react-helmet-async'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { AuthProvider, SidebarProvider } from '@contexts/'
import { Layout, ProtectedRoute } from '@components/'
import { PAGE_ENDPOINTS } from './constants'
import { HomeContainer, IndexContainer, ProjectContainer } from './pages'

import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: PAGE_ENDPOINTS.INDEX,
        element: <IndexContainer />,
      },
      {
        path: PAGE_ENDPOINTS.HOME,
        element: (
          <ProtectedRoute>
            <HomeContainer />
          </ProtectedRoute>
        ),
      },
      {
        path: PAGE_ENDPOINTS.PROJECT,
        element: (
          <ProtectedRoute>
            <ProjectContainer />
          </ProtectedRoute>
        ),
      },
      {
        path: '*',
        element: <Navigate to={PAGE_ENDPOINTS.INDEX} replace />,
      },
    ],
  },
])

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <SidebarProvider>
          <RouterProvider router={router} />
        </SidebarProvider>
      </AuthProvider>
    </HelmetProvider>
  )
}

export default App
