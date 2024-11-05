//assets temporários perfis
import F from '../assets/revenues/F.png'
import M from '../assets/revenues/m.png'

//assets temporarios receitas
import CAKE from '../assets/revenues/bolo.jpg'
import CONDENSADO from '../assets/revenues/condensado.jpg'
import CHURRASCO from '../assets/revenues/churrasco.png'

import React, { createContext, useContext, useState, ReactNode } from 'react';

// dados receita
interface Revenue {
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

interface RevenuesContextType {
  revenues: Revenue[];
  setRevenues: React.Dispatch<React.SetStateAction<Revenue[]>>;
}

const RevenuesContext = createContext<RevenuesContextType | undefined>(undefined);

export const RevenuesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  // Dados exemplos temporários das receitas
  // Usar banco da dados / API para receitas
  // As receitas vão possuir categorias? como serão categorizadas?
  const initialRevenues: Revenue[] = [
    { id: '1', title: 'Bolos Famosos da Tia Flávia', src: CAKE, category: 'Bolos', perfil: F, name: 'Tia Flávia', date: '18/10/2024 às 15:35', likes: 25, rating: 3.5 },
    { id: '2', title: 'Melhores Churrascos na opinião do tio Márcio', src: CHURRASCO, category: 'Carnes', perfil: M, name: 'Tio Marcio', date: '13/08/2024 às 12:16', likes: 16, rating: 5.0 },
    { id: '3', title: 'Doce de Leite Condensado', src: CONDENSADO, category: 'Doces', perfil: F, name: 'Tia Flávia', date: '15/08/2024 às 19:25', likes: 12, rating: 2.5 },
    { id: '4', title: 'Doce de Leite Condensado', src: CONDENSADO, category: 'Doces', perfil: F, name: 'Tia Flávia', date: '15/08/2024 às 19:25', likes: 12, rating: 2.5 },
  ];

  const [revenues, setRevenues] = useState<Revenue[]>(initialRevenues);

  return (
    <RevenuesContext.Provider value={{ revenues, setRevenues }}>
      {children}
    </RevenuesContext.Provider>
  );
};

export const useRevenues = () => {
  const context = useContext(RevenuesContext);
  if (!context) {
    throw new Error('revenuescontext error');
  }
  return context;
};