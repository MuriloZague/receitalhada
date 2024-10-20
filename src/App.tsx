import Header from "./components/Header"
import Search from "./components/Search"
import Cards from "./components/ListCard"

import REVENUES from './assets/brazilianreceitas.jpg'
import PASTA from './assets/massas.jpg'
import JUICE from './assets/sucos.jpg'
import VEGAN from './assets/vegetais.jpg'
import CAKES from './assets/doces.jpg'
import Revenues from "./components/ListRevenues"

import CAKE from './assets/revenues/bolo.jpg'
import CONDENSADO from './assets/revenues/condensado.jpg'
import CHURRASCO from './assets/revenues/churrasco.png'

import F from './assets/revenues/F.png'
import M from './assets/revenues/m.png'
import Publicity from "./components/Ads"

const listCard = [
  {title: 'Receitas Brasileiras', src: REVENUES},
  {title: 'Massas', src: PASTA},
  {title: 'Sucos Naturais', src: JUICE},
  {title: 'Vegano', src: VEGAN},
  {title: 'Doces', src: CAKES},
]

const listRevenues = [
  {title: 'Bolos Famosos da Tia Flávia', src: CAKE, perfil: F, name: 'Tia Flávia', date: '18/10/2024 às 15:35', likes: '25'},
  {title: 'Melhores Churrascos na opinião do tio Márcio', src: CHURRASCO, perfil: M, name: 'Tio Marcio', date: '13/08/2024 às 12:16', likes: '16'},
  {title: 'Doce de Leite Condensado', src: CONDENSADO, perfil: F, name: 'Tia Flávia', date: '15/08/2024 às 19:25', likes: '12'},
  {title: 'Melhores Churrascos na opinião do tio Márcio', src: CHURRASCO, perfil: M, name: 'Tio Marcio', date: '13/08/2024 às 12:16', likes: '16'},

]

function App() {

  return (
    <div>
      <Header />
      <div className="mt-10 px-20 pl-24">
      <Search />
      <Cards sources={listCard}/>
      <Revenues revenues={listRevenues} />
      
      </div>
    </div>
  )
}

export default App
