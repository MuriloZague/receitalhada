import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import LoginPage from './routes/LoginPage.tsx'
import Cadastro from './routes/SignUp.tsx'
import Erro from './routes/Error.tsx'
import ForgotPass from './routes/ForgotPass.tsx'
import AllRevenues from './routes/AllRevenues.tsx'

import { RevenuesProvider } from './utils/RevenuesContext.tsx';
import { CardsProvider } from './utils/CardsContext';

const router = createBrowserRouter([
  {
    path: '/', element: <App />,
    errorElement: <Erro />
  },
  {
    path: '/login', element: <LoginPage />
  },
  {
    path: '/cadastro', element: <Cadastro />
  },
  {
    path: '/esqueciasenha', element: <ForgotPass />
  },
  {
    path: '/receitas', element: <AllRevenues />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CardsProvider>
      <RevenuesProvider>
        <RouterProvider router={router} />
      </RevenuesProvider>
    </CardsProvider>
  </StrictMode>,
)
