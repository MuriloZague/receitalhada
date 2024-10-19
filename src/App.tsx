import Header from "./components/Header"
import Search from "./components/Search"
import Cards from "./components/ListCard"

import REVENUES from './assets/brazilianreceitas.jpg'
import PASTA from './assets/massas.jpg'
import JUICE from './assets/sucos.jpg'
import VEGAN from './assets/vegetais.jpg'

const listCard = [
  {title: 'Receitas\nBrasileiras', src: REVENUES},
  {title: 'Massas', src: PASTA},
  {title: 'Sucos\nNaturais', src: JUICE},
  {title: 'Vegano', src: VEGAN},
  {title: 'Receitas\nBrasileiras', src: REVENUES},
  {title: 'Massas', src: PASTA},
  {title: 'Sucos\nNaturais', src: JUICE},
]


function App() {

  return (
    <div>
      <Header />
      <div className="mt-10 px-20 pl-24">
      <Search />
      <Cards sources={listCard}/>
      </div>
    </div>
  )
}

export default App
