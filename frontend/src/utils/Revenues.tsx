import { FaStar } from 'react-icons/fa';

type RevenuesProps = {
    revenues: Array<{ title: string; src: string; perfil: string; name: string; date: string; likes: string }>
};

export default function Revenues({ revenues }: RevenuesProps) {
    return (
        <section className="mb-20">
            <div className="flex flex-wrap gap-12 tsm:gap-9 mt-5 tsm:mt-0 tsm:flex-col">
                {revenues.map((revenue, index) => (
                    <div className='w-2/5 tsm:w-full lg:w-[45%] tlg:w-[45%] tsm:px-2' key={index}>
                        <div className='flex justify-center'>
                            <div className='flex max-w-80 h-11 items-center'>
                                <p className='text-xl receita text-center cursor-pointer'>{revenue.title}</p>
                            </div>
                        </div>

                        <div className="relative bg-gray-300 w-full h-80 tsm:h-60 tlg:h-60 lg:h-64 mt-4 rounded-sm overflow-hidden cursor-pointer"
                            style={{ boxShadow: '0 5px 5px 0 rgba(0,0,0,.15)' }}>
                            <div
                                className="absolute inset-0 transition-transform duration-500 ease-out hover:scale-110"
                                style={{
                                    backgroundImage: `url(${revenue.src})`,
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                }}>
                            </div>
                        </div>

                        <div className='mt-2 flex cursor-pointer'>
                            <div className='mr-2'>
                                <img src={revenue.perfil} alt="" className='w-[60px] rounded-full mt-1 border-orange-500 border-2 tsm:w-[50px]' />
                            </div>
                            <div className='mt-1 tsm:mt-[0.15rem]'>
                                <p className='text-lg inter font-bold leading-tight tsm:text-base'>{revenue.name}</p>
                                <p className='text-sm leading-tight tsm:text-xs'>{revenue.date}</p>
                                <div className='flex items-center space-x-1 flex-row'>
                                    <FaStar className='w-[20px] tsm:w-[12px]' color='#FFB100' />
                                    <p className='text-sm tsm:text-xs'>{revenue.likes} favoritos</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}