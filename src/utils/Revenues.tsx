import { FaStar } from 'react-icons/fa';

type RevenuesProps = {
    revenues: Array<{ title: string; src: string; perfil: string; name: string; date: string; likes: string }>
};

export default function Revenues({ revenues }: RevenuesProps) {
    return (
        <section className="mb-32">
            <div className="revenues-container flex flex-wrap gap-10 mt-5">
                {revenues.map((revenue, index) => (
                    <div key={index} className="revenue-item">
                        <div className='flex justify-center'>
                            <div className='flex max-w-80 h-11 items-center'>
                                <p className='text-xl receita text-center cursor-pointer'>{revenue.title}</p>
                            </div>
                        </div>

                        {/* Imagem da receita */}
                        <div className="relative bg-gray-300 w-96 h-80 mt-4 rounded-sm overflow-hidden cursor-pointer"
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
                                <img src={revenue.perfil} alt="" width={60} className='rounded-full mt-1 border-orange-500 border-2' />
                            </div>
                            <div className='mt-1'>
                                <p className='text-lg inter font-bold leading-tight'>{revenue.name}</p>
                                <p className='text-sm leading-tight'>{revenue.date}</p>
                                <div className='flex items-center space-x-1'>
                                    <FaStar size={20} color='#FFB100' />
                                    <p className='text-sm'>{revenue.likes} favoritos</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}