import InputCode from './FormCode'

export default function EmailCode(){
    return(
        <section className="w-full m-auto flex justify-center">
            <div className="flex p-6 py-8 tsm:py-6 gap-5 flex-col w-[45%] tsm:p-4 tlg:w-[60%] lg:w-[70%] tsm:w-[95%] bg-[#D9D9D9] rounded-2xl">
                <div>
                    <p className="receita text-4xl tsm:text-3xl text-center">Confirmar Email</p>
                </div>
                <div className="bg-[#B8B8B8] h-[2px] w-[95%]"></div>
                <div className='mt-5'>
                    <p className="inter text-lg">Digite o código de 6 dígitos:</p>
                </div>
                <div>
                    <InputCode />
                </div>
            </div>
        </section>
    )
}