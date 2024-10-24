import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import LoginPage from './routes/LoginPage.tsx'
import Erro from './routes/Error.tsx'

const router = createBrowserRouter([
  {
    path: '/', element: <App />,
    errorElement: <Erro />
  },
  {
    path: '/login', element: <LoginPage />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
