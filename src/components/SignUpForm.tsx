import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from 'react-router-dom';

const signInSchema = z.object({
    nome: z.string().min(1, { message: 'Este campo é obrigatório' }),
    email: z.string().min(1, { message: 'O e-mail é obrigatório' }).email({ message: 'Formato de e-mail inválido' }),
    senha: z.string().min(6, { message: 'A senha deve ter no mínimo 6 caracteres' }),
    csenha: z.string().min(1, { message: 'Este campo é obrigatório' }),
}).refine((data) => data.senha === data.csenha, {
    message: 'As senhas não coincidem',
    path: ['csenha'],
});

type SignInSchema = z.infer<typeof signInSchema>;

export default function SignUp() {
    const navigate = useNavigate();
    
    const { register, handleSubmit, formState: { errors } } = useForm<SignInSchema>({
        resolver: zodResolver(signInSchema)
    });

    const handleSignIn = (data: SignInSchema) => {
      //  console.log(data);
    };

    const goToLogin = () => {
        navigate('/login');
    };

    return (
        <section className="loginpg m-auto mt-12 rounded-lg p-5 px-10 mb-12">
            <div className="mb-4">
                <p className="receita text-4xl text-center font-bold"><span className="textorange">Bem vindo ao</span> Receitalhada!</p>
            </div>
            <div className="h-0.5 line"></div>

            <form onSubmit={handleSubmit(handleSignIn)} className="flex flex-col">
                <label htmlFor="nome" className="text-2xl inter font-bold mt-7 ml-1">Nome</label>
                <input className="border border-customStoke mt-2 p-2 rounded-md inter text-lg" type="text" placeholder="Seu Nome" {...register('nome', { required: true })}/>
                {errors.nome && <p className="text-red-500">{errors.nome.message}</p>}

                <label htmlFor="email" className="text-2xl inter font-bold mt-4 ml-1">E-mail</label>
                <input className="border border-customStoke mt-2 p-2 rounded-md inter text-lg" type="email" placeholder="email@email.com" {...register('email', { required: true })}/>
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                <label className="text-2xl inter font-bold mt-4 ml-1" htmlFor="senha">Senha</label>
                <input className="border border-customStoke mt-2 p-2 rounded-md inter text-lg" type="password" placeholder="**********" {...register('senha', { required: true })}/>
                {errors.senha && <p className="text-red-500">{errors.senha.message}</p>}

                <label className="text-2xl inter font-bold mt-4 ml-1" htmlFor="csenha">Confirme sua senha</label>
                <input className="border border-customStoke mt-2 p-2 rounded-md inter text-lg" type="password" placeholder="**********" {...register('csenha', { required: true })}/>
                {errors.csenha && <p className="text-red-500">{errors.csenha.message}</p>}

                <button type="submit" className="bg-orange-500 text-white inter text-2xl font-bold p-2 mb-5 mt-6 rounded-md">Cadastrar</button>

                <p className="text-center text-customGray font-bold inter mb-1">Já possui uma conta? <a onClick={goToLogin} className="textorange underline cursor-pointer">Entre!</a></p>
            </form>
        </section>
    );
}
