import { useNavigate } from 'react-router-dom'

import Recipes from "../utils/Recipes";
import Ads from "../components/Ads";

import Seta from '../assets/seta.svg'

export default function LastRevenues(){

    const navigate = useNavigate()

    const gotToAllRevenues = () => {
        navigate('/receitas')
    }
 
    return(
        <section className="mt-8 w-full flex mb-64 justify-between" >
            <div className="tsm:w-full w-[80%] lg:w-full">
                <div className="mb-8 tsm:mb-8">
                    <p className="inter text-4xl font-bold tsm:text-3xl tsm:text-center">Ultimas <span className="textorange">Receitas</span></p>
                </div>
                <Recipes />
                <div className="flex justify-center txl:pr-20 pr-20 tlg:pr-12 lg:pr-0 tsm:pr-0">
                    <button onClick={() => gotToAllRevenues()} className="bg-customOrange p-3 px-5 rounded-full">
                        <div className="flex gap-4">
                            <p className="inter text-white text-lg font-bold">Ver todas as receitas</p>
                            <img src={Seta} alt="" className="w-[18px]" />
                        </div>
                    </button>
                </div>
            </div>
            <div className="lg:hidden tsm:hidden">
                <Ads width="250" height="500" />
            </div>
        </section>
    )
}