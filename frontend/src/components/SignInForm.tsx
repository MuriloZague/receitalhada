import { useForm } from "react-hook-form";
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from 'react-router-dom'


const signInSchema = z.object({
    indentifier: z.string().min(1, { message: 'Nome de usuário ou E-mail obrigatório' }),
    senha: z.string().min(6, { message: 'Campo senha obrigatório' }),
    remember: z.boolean().optional(),
})

type SignInSchema = z.infer<typeof signInSchema>


export default function SignIn() {

 const navigate = useNavigate()
   
 const { register, handleSubmit, formState: {errors} } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema)
 })

 const handleSignIn = (data: SignInSchema) => {
    console.log(data)
 }

 const goToSignUp = () => {
    navigate('/cadastro')
 }
 const goToForgetPass = () => {
    navigate('/esqueciasenha')
 }

 return (

    <section className="m-auto tsm:w-11/12 lg:w-2/3 tlg:w-2/3 w-[42%] txl:w-[48%] tsm:mt-10 mt-12 rounded-lg p-5 px-10 mb-10" style={{'backgroundColor': '#d9d9d9'}}>
        <div className="mb-4 tsm:mb-2">
            <p className="receita text-4xl tsm:text-[1.6rem] text-center font-bold"><span className="textorange">Bem vindo</span> de volta!</p>
        </div>
        <div className="h-0.5 line"></div>

    <form onSubmit={handleSubmit(handleSignIn)} className="flex flex-col">

        <label htmlFor="email" className="text-2xl tsm:text-xl inter font-bold mt-7 tsm:mt-5 ml-1">E-mail ou Usuário</label>
        <input className="border border-customStoke mt-2 p-2 rounded-md inter text-lg tsm:text-sm" type="text" placeholder="email ou usuário" {...register('indentifier', {required: true})}/>
        {errors.indentifier && (
          <p className="text-red-500 tsm:text-sm">{errors.indentifier.message}</p>
        )}

        <label className="text-2xl tsm:text-xl inter font-bold mt-4 ml-1" htmlFor="senha">Senha</label>
        <input className="border border-customStoke mt-2 p-2 rounded-md inter text-lg tsm:text-sm" type="password" placeholder="**********" {...register('senha', {required: true})}/>
        {errors.senha && (
          <p className="text-red-500 tsm:text-sm">{errors.senha.message}</p>
        )}

    <div className="flex flex-row justify-between my-5 items-center">
        <div className="flex">
        <input id="remember" className="w-5 h-5 tsm:w-4 tsm:h-4 border-customStoke borde" type="checkbox" {...register('remember', {required: true})}/>
        <label htmlFor="remember" className="inter ml-2 text-customGray tsm:text-[0.74rem]">Lembrar Senha</label>
        </div>
        <label className="inter font-bold text-customGray underline tsm:text-[0.7rem]"><a className="cursor-pointer" onClick={goToForgetPass}>Esqueceu sua senha?</a></label>
    </div>

    <button type="submit" className="bg-orange-500 text-white inter text-2xl font-bold p-2 mb-5 rounded-md tsm:text-xl">Login</button>

    <p className="text-center text-customGray font-bold inter mb-1 tsm:text-sm">Não possui uma conta? <a onClick={goToSignUp} className="textorange underline cursor-pointer">Crie uma!</a></p>
    </form>

    </section>

  );
}