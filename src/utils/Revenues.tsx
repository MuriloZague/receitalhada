import F from '../assets/F.png'
import { FaStar } from 'react-icons/fa'

export default function Revenues(){
    return(
        <section className="mb-32">
            <div>
                <div>
                    <p>Bolos famosos da tia Flávia</p>
                </div>
                <div className="bg-gray-300 w-4/12 h-80">
                </div>
                <div className='mt-2 flex'>
                    <div className='mr-2'>
                        <img src={F} alt="" width={60} className='rounded-full mt-1 border-orange-500 border'/>
                    </div>
                    <div>
                        <p className='text-lg inter font-bold'>Tia Flávia</p>
                        <p className='text-sm'>18/10/2024 ás 15:35</p>
                        <div className='flex'>
                            <FaStar size={20} color='#FFB100'/>
                            <p className='text-sm'>16 favoritos</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}