import { useState } from 'react';
import { useRevenues } from '../utils/RevenuesContext';
import StarRating from './StarRating';
import Save from '../assets/save.svg';
import Saved from '../assets/saved.svg';

export default function Revenues() {
    
    const { revenues } = useRevenues();

    const [likes, setLikes] = useState(revenues.map(revenue => revenue.likes));
    const [isSaved, setIsSaved] = useState(revenues.map(() => false));

    const handleSaveClick = async (index: number, _recipeId: string) => {
        const alreadySaved = isSaved[index];

        try {
            // CONSUMIR UMA API PARA OS SALVAMENTOS (pegar quantos saves a receita tem e adicionar saves pelo usuario)

            setLikes(prevLikes => {
                const newLikes = [...prevLikes];
                newLikes[index] = alreadySaved ? newLikes[index] - 1 : newLikes[index] + 1;
                return newLikes;
            });

            setIsSaved(prevSaved => {
                const newSaved = [...prevSaved];
                newSaved[index] = !alreadySaved;
                return newSaved;
            });
        } catch (error) {
            console.error('Erro ao salvar/remover a receita:', error);
        }
    };

    return (
        
        <section className="mb-10 flex flex-col justify-center">
            <div className="flex flex-wrap gap-16 tlg:gap-7 tsm:gap-9 txl:gap-10 mt-5 tsm:mt-0 tsm:flex-col">
                {revenues.map((revenue, index) => (
                    <div className='w-[43%] tsm:w-full lg:w-[45%] txl:w-[44%] tlg:w-[46%] tsm:px-2 mb-2' key={revenue.id}>
                        <div className='flex justify-center'>
                            <div className='flex max-w-[24rem] h-11 items-center'>
                                <p className='text-[1.65rem] tsm:text-2xl tlg:text-2xl lg:text-2xl receita text-center cursor-pointer'>{revenue.title}</p>
                            </div>
                        </div>

                        <div className='items-center flex justify-between mt-6 px-2'>
                            <div className='flex gap-1 tsm:items-center'>
                                <StarRating rating={revenue.rating} />
                                <p className='inter text-customGray text-[0.95rem] tsm:text-xs'>{revenue.rating.toFixed(1)}</p>
                            </div>
                            <p className=' inter text-customGray text-[0.95rem] leading-tight tsm:text-xs'>{revenue.date}</p>
                        </div>

                        <div className="relative bg-gray-300 w-full h-[25rem] txl:h-[24rem] tsm:h-60 tlg:h-[18rem] lg:h-64 mt-1 rounded-sm overflow-hidden cursor-pointer">
                            <div
                                className="absolute inset-0 transition-transform duration-500 ease-out hover:scale-110"
                                style={{
                                    backgroundImage: `url(${revenue.src})`,
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                }}>
                            </div>
                        </div>

                        <div className='p-4 flex rounded-b-2xl items-center px-6 justify-between' style={{ boxShadow: '0 2px 4px 0 rgba(0,0,0,.20)' }}>
                            <div className='flex items-center gap-3'>
                                <img src={revenue.perfil} alt="" className='w-[55px] tlg:w-[50px] cursor-pointer rounded-full border-orange-500 border-2 tsm:w-[50px]' />
                                <p className='tsm:mt-[0.15rem] text-lg inter font-bold leading-tight tsm:text-base'>{revenue.name}</p>
                            </div>
                            <div onClick={() => handleSaveClick(index, revenue.id)}>
                                <img 
                                    src={isSaved[index] ? Saved : Save} 
                                    className={`w-[30px] h-[35px] tlg:w-[22px] txl:w-[22px] lg:w-[20px] tsm:w-[20px] transition-transform duration-200 ${isSaved[index] ? 'animate-pop' : ''}`}
                                    alt="" />
                                <p className='text-center tlg:text-sm tsm:text-sm lg:text-sm txl:text-sm'>{likes[index]}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
