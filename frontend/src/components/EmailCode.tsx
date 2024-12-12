export default function EmailCode(){
    return(
        <section className="w-full m-auto flex justify-center">
            <div className="flex p-6 py-8 tsm:py-6 gap-5 flex-col w-[45%] lg:w-[70%] tsm:w-[92%] items-center text-center bg-[#D9D9D9] rounded-2xl">
                <div>
                    <p className="receita text-customOrange text-4xl tsm:text-3xl">AVISO!</p>
                </div>
                <div className="bg-[#B8B8B8] h-[2px] w-[95%]"></div>
                <div className="w-[80%] tsm:w-[90%]">
                    <p className="inter text-xl tsm:text-lg">Para verificarmos o seu email, um código de 
                    <span className="textorange"> 6 dígitos</span> foi enviado para o email:<br/>
                    <span className="font-bold"> example@gmail.com</span></p>
                </div>
                <div className="mt-2 lg:w-[60%] tsm:mt-0 w-[55%] tsm:w-[100%]">
                    <p className="inter text-xl tsm:text-lg">Ainda não recebeu seu código?
                    <span className="text-customOrange"> <a href="">Reenviar código</a></span></p>
                </div>
            </div>
        </section>
    )
}