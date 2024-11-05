//components
import Header from "./components/Header"
import Search from "./components/Search"
import Cards from "./components/ListCard"
import Revenues from "./routes/LastRevenues"
import Footer from "./components/Footer"


function App() {
  return (
    <div>
        <Header title={false} account={true}/>
      <div className="mt-10 txl:px-14 px-20 tsm:px-4 pl-24 lg:px-10 tlg:px-12">
        <Search />
        <Cards />
        <Revenues />
      </div>
        <Footer />
    </div>
  )
}

export default App;
