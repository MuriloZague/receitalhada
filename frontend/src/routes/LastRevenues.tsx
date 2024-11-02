import { useNavigate } from 'react-router-dom'

import Revenues from "../utils/Revenues";
import Ads from "../components/Ads";
import Seta from '../assets/seta.svg'

export default function LastRevenues(){

    const navigate = useNavigate()

    const gotToAllRevenues = () => {
        navigate('/receitas')
    }
 
    return(
        <section className="mt-8 w-full flex mb-20">
            <div className="tsm:w-full w-[80%] lg:w-full">
                <div className="mb-10 tsm:mb-5">
                    <p className="inter text-4xl font-bold tsm:text-2xl tsm:text-center">Ultimas <span className="textorange">Receitas</span></p>
                </div>
                <Revenues />
                <div className="flex justify-center txl:pr-20 pr-24 tlg:pr-12 lg:pr-0 tsm:pr-0">
                    <button onClick={() => gotToAllRevenues()} className="bg-customOrange p-3 px-5 rounded-full">
                        <div className="flex gap-4">
                            <p className="inter text-white text-lg font-bold">Ver todas as receitas</p>
                            <img src={Seta} alt="" className="w-[18px]" />
                        </div>
                    </button>
                </div>
            </div>
            <div className="lg:hidden tsm:hidden tmd:hidden">
                <Ads width="280" height="550" />
            </div>
        </section>
    )
}