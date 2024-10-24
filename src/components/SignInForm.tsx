import { useForm } from "react-hook-form";
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from 'react-router-dom'


const signInSchema = z.object({
    email: z.string().min(1, { message: 'O e-mail é obrigatório' }).email({ message: 'Formato de e-mail inválido' }),
    senha: z.string().min(6, { message: 'A senha deve ter no mínimo 6 caracteres' }),
    remember: z.boolean(),
})

type SignInSchema = z.infer<typeof signInSchema>


export default function SignIn() {

 const navigate = useNavigate()

   
 const { register, handleSubmit, formState: {errors} } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema)
 })

 const handleSignIn = (data: SignInSchema) => {
   // console.log(data)
 }

 const goToSignUp = () => {
    navigate('/cadastro')
 }
 const goToForgetPass = () => {
    navigate('/esqueciasenha')
 }

 return (

    <section className="loginpg m-auto mt-12 rounded-lg p-5 px-10 mb-10">
        <div className="mb-4">
            <p className="receita text-4xl text-center font-bold"><span className="textorange">Bem vindo</span> de volta!</p>
        </div>
        <div className="h-0.5 line"></div>

    <form onSubmit={handleSubmit(handleSignIn)} className="flex flex-col">

        <label htmlFor="email" className="text-2xl inter font-bold mt-7 ml-1">E-mail</label>
        <input className="border border-customStoke mt-2 p-2 rounded-md inter text-lg" type="email" placeholder="email@email.com" {...register('email', {required: true})}/>
        {errors.email && (
          <p className="text-red-500">{errors.email.message}</p>
        )}

        <label className="text-2xl inter font-bold mt-4 ml-1" htmlFor="senha">Senha</label>
        <input className="border border-customStoke mt-2 p-2 rounded-md inter text-lg" type="password" placeholder="**********" {...register('senha', {required: true})}/>
        {errors.senha && (
          <p className="text-red-500">{errors.senha.message}</p>
        )}

    <div className="flex justify-between my-5">
        <div>
        <input id="remember" className="w-5 h-5 border-customStoke borde" type="checkbox" {...register('remember', {required: true})}/>
        <label htmlFor="remember" className="inter ml-2 text-customGray">Lembrar Senha</label>
        </div>
        <label className="inter font-bold text-customGray underline"><a className="cursor-pointer" onClick={goToForgetPass}>Esqueceu sua senha?</a></label>
    </div>

    <button type="submit" className="bg-orange-500 text-white inter text-2xl font-bold p-2 mb-5 rounded-md">Login</button>

    <p className="text-center text-customGray font-bold inter mb-1">Não possui uma conta? <a onClick={goToSignUp} className="textorange underline cursor-pointer">Crie uma!</a></p>
    </form>

    </section>

  );
}