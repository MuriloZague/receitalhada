import REVENUES from '../assets/brazilianreceitas.jpg';
import PASTA from '../assets/massas.jpg';
import JUICE from '../assets/sucos.jpg';
import VEGAN from '../assets/vegetais.jpg';
import CAKES from '../assets/doces.jpg';
import CAKE from '../assets/revenues/bolo.jpg';

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


  const initialCards: Card[] = [
    { title: 'Receitas Brasileiras', src: REVENUES },
    { title: 'Massas', src: PASTA },
    { title: 'Sucos Naturais', src: JUICE },
    { title: 'Vegano', src: VEGAN },
    { title: 'Doces', src: CAKES },
    { title: 'Bolos', src: CAKE },
  ];

  const [cards, setCards] = useState<Card[]>(initialCards);

  return (
    <CardsContext.Provider value={{ cards, setCards }}>
      {children}
    </CardsContext.Provider>
  );
};

// Hook para usar o context
export const useCards = () => {
  const context = useContext(CardsContext);
  if (!context) {
    throw new Error('useCards must be used within a CardsProvider');
  }
  return context;
};