import FILTER from '../assets/Filter.png'

export default function Search() {

    return(
        <section>
            <div className="flex flex-row gap-20 tsm:gap-8 tsm:flex-col">
                <div className="w-1/2 lg:w-2/3 tsm:w-full tsm:text-center">
                    <p className="text-4xl tsm:text-2xl lg:text-3xl tsm:tracking-normal font-medium inter tracking-wider">Encontre A 
                    <span className="textorange"> Melhor<br/> Receita</span> Para A Sua Fome
                    </p>
                </div>
                <div className="flex w-2/3 searchbar tsm:w-full lg:items-center tlg:items-center">
                    <input type="text" placeholder="Procure por uma receita" 
                    className="bg-red-500 w-3/4 rounded-full text-xl search mt-4 txl:mt-[1.3rem] tsm:mt-0 outline-none tsm:p-4 tlg:mt-0 lg:w-full tlg:h-16 txl:h-14 lg:h-16 lg:text-lg tsm:w-full tsm:text-base tsm:pl-16"/>
                    <img src={FILTER} className='cursor-pointer w-9 h-9 mt-8 ml-6 tlg:mt-0 tsm:hidden lg:hidden tmd:hidden ' alt="" />
                </div>
            </div>
        </section>
    )
}