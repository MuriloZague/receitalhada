import FILTER from '../assets/Filter.png'

export default function Search() {

    return(
        <section>
            <div className="flex flex-row gap-20 tsm:gap-8 tsm:flex-col">
                <div className="w-1/2 tsm:w-full tsm:text-center">
                    <p className="text-4xl tsm:text-2xl tsm:tracking-normal font-medium inter tracking-wider">Encontre A 
                    <span className="textorange"> Melhor<br/> Receita</span> Para A Sua Fome
                    </p>
                </div>
                <div className="flex w-2/3 searchbar tsm:w-full">
                    <input type="text" placeholder="Procure por uma receita" 
                    className="bg-red-500 w-3/4 rounded-full text-xl search mt-4 tsm:mt-0 outline-none tsm:p-4 tsm:w-full tsm:text-base tsm:pl-16"/>

                    <img src={FILTER} className='w-9 h-9 mt-8 ml-6 tsm:hidden' alt="" />
                </div>
            </div>
        </section>
    )
}