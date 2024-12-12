import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Components
import LoginPage from './routes/LoginPage.tsx'
import Cadastro from './routes/SignUp.tsx'
import Erro from './routes/Error.tsx'
import ForgotPass from './routes/ForgotPass.tsx'
import AllRecipes from './routes/AllRecipes.tsx'
import CodeEmail from './routes/CodeEmail.tsx'

// Providers
import { RecipesProvider } from './utils/RecipesContext.tsx';
import { CardsProvider } from './utils/CardsContext';

const router = createBrowserRouter([
  {
    path: '/', element: <App />,
    errorElement: <Erro /> // Error 404! page
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
    path: '/receitas', element: <AllRecipes />
  },
  {
    path: '/codeemail', element: <CodeEmail />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CardsProvider>
      <RecipesProvider>
        <RouterProvider router={router} />
      </RecipesProvider>
    </CardsProvider>
  </StrictMode>,
)
