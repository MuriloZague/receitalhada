//assets temporários perfis
import F from '../assets/recipes/F.png'
import M from '../assets/recipes/m.png'

//assets temporarios receitas
import CAKE from '../assets/recipes/bolo.jpg'
import CONDENSADO from '../assets/recipes/condensado.jpg'
import CHURRASCO from '../assets/recipes/churrasco.png'

import React, { createContext, useContext, useState, ReactNode } from 'react';

// dados das receitas
interface Recipe {
  id: string;
  title: string;
  src: string;
  category: string;
  perfil: string;
  name: string;
  date: string;
  likes: number;
  rating: number;
}

interface RecipesContextType {
  recipes: Recipe[];
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
}

const RecipesContext = createContext<RecipesContextType | undefined>(undefined);

export const RecipesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  // Dados exemplos temporários das receitas
  // Usar banco da dados / API para receitas
  // As receitas vão possuir categorias? como serão categorizadas?
  const initialRecipes: Recipe[] = [
    { id: '1', title: 'Bolos Famosos da Tia Flávia', src: CAKE, category: 'Bolos', perfil: F, name: 'Tia Flávia', date: '18/10/2024 às 15:35', likes: 25, rating: 3.5 },
    { id: '2', title: 'Melhores Churrascos na opinião do tio Márcio', src: CHURRASCO, category: 'Carnes', perfil: M, name: 'Tio Marcio', date: '13/08/2024 às 12:16', likes: 16, rating: 5.0 },
    { id: '3', title: 'Doce de Leite Condensado', src: CONDENSADO, category: 'Doces', perfil: F, name: 'Tia Flávia', date: '15/08/2024 às 19:25', likes: 12, rating: 2.5 },
    { id: '4', title: 'Doce de Leite Condensado', src: CONDENSADO, category: 'Doces', perfil: F, name: 'Tia Flávia', date: '15/08/2024 às 19:25', likes: 12, rating: 2.5 },
  ];

  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);

  return (
    <RecipesContext.Provider value={{ recipes, setRecipes }}>
      {children}
    </RecipesContext.Provider>
  );
};

export const useRecipes = () => {
  const context = useContext(RecipesContext);
  if (!context) {
    throw new Error('recipescontext error');
  }
  return context;
};