import RecipeS from '../assets/brazilianreceitas.jpg';
import PASTA from '../assets/massas.jpg';
import JUICE from '../assets/sucos.jpg';
import VEGAN from '../assets/vegetais.jpg';
import CAKES from '../assets/doces.jpg';
import CAKE from '../assets/recipes/bolo.jpg';
import CARNES from '../assets/recipes/churrasco.png'

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Card {
  title: string;
  src: string;
}

interface CardsContextType {
  cards: Card[];
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
}

const CardsContext = createContext<CardsContextType | undefined>(undefined);

export const CardsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

 
  // não usar banco de dados / API para os cartões (ou usa, sei la) pois eles representam as categorias 
  // das receitas e somos nos que vamos adicionar as categorias
  const listCards: Card[] = [
    { title: 'Receitas Brasileiras', src: RecipeS },
    { title: 'Massas', src: PASTA },
    { title: 'Sucos Naturais', src: JUICE },
    { title: 'Vegano', src: VEGAN },
    { title: 'Carnes', src: CARNES},
    { title: 'Doces', src: CAKES },
    { title: 'Bolos', src: CAKE },
  ];

  const [cards, setCards] = useState<Card[]>(listCards);

  return (
    <CardsContext.Provider value={{ cards, setCards }}>
      {children}
    </CardsContext.Provider>
  );
};

export const useCards = () => {
  const context = useContext(CardsContext);
  if (!context) {
    throw new Error('cardscontext error');
  }
  return context;
};