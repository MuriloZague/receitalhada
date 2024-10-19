import FILTER from '../assets/Filter.png'

export default function Search() {

    return(
        <section>
            <div className="flex flex-row gap-20">
                <div className="w-1/2">
                    <p className="text-4xl font-medium inter tracking-wider">Encontre A 
                    <span className="textorange"> Melhor<br/> Receita</span> Para A Sua Fome
                    </p>
                </div>
                <div className="flex w-2/3 searchbar">
                    <input type="text" placeholder="Procure por uma receita" className="bg-red-500 w-3/4 rounded-full text-xl search mt-4"/>
                    <img src={FILTER} className='w-9 h-9 mt-8 ml-6' alt="" />
                </div>
            </div>
        </section>
    )
}