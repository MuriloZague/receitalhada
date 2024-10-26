import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from 'react-router-dom';

const signUpSchema = z.object({
    nome: z.string().min(1, { message: 'Este campo é obrigatório' }),
    email: z.string().min(1, { message: 'O e-mail é obrigatório' }).email({ message: 'Formato de e-mail inválido' }),
    senha: z.string().min(6, { message: 'A senha deve ter no mínimo 6 caracteres' }),
    csenha: z.string().min(1, { message: 'Este campo é obrigatório' }),
}).refine((data) => data.senha === data.csenha, {
    message: 'As senhas não coincidem',
    path: ['csenha'],
});

type SignUpSchema = z.infer<typeof signUpSchema>;

export default function SignUp() {
    const navigate = useNavigate();
    
    const { register, handleSubmit, formState: { errors } } = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema)
    });

    const handleSignIn = (data: SignUpSchema) => {
        console.log(data);
    };

    const goToLogin = () => {
        navigate('/login');
    };

    return (
        <section className="loginpg m-auto mt-12 tsm:mt-10 tsm:w-11/12 rounded-lg p-5 px-10 mb-12 tsm:mb-10">
            <div className="mb-4 tsm:mb-2 ">
                <p className="receita text-4xl tsm:text-[1.6rem] text-center font-bold tsm:leading-8"><span className="textorange">Bem vindo ao</span> Receitalhada!</p>
            </div>
            <div className="h-0.5 line"></div>

            <form onSubmit={handleSubmit(handleSignIn)} className="flex flex-col">

                <label htmlFor="nome" className="text-2xl tsm:text-xl inter font-bold mt-5 ml-1">Nome</label>
                <input className="border border-customStoke mt-2 p-2 rounded-md inter text-lg tsm:text-sm" type="text" placeholder="Seu Nome" {...register('nome', { required: true })}/>
                {errors.nome && <p className="text-red-500 tsm:text-sm">{errors.nome.message}</p>}

                <label htmlFor="email" className="text-2xl tsm:text-xl inter font-bold mt-4 ml-1">E-mail</label>
                <input className="border border-customStoke mt-2 p-2 rounded-md inter text-lg tsm:text-sm" type="email" placeholder="email@email.com" {...register('email', { required: true })}/>
                {errors.email && <p className="text-red-500 tsm:text-sm">{errors.email.message}</p>}

                <label className="text-2xl tsm:text-xl inter font-bold mt-4 ml-1" htmlFor="senha">Senha</label>
                <input className="border border-customStoke mt-2 p-2 rounded-md inter text-lg tsm:text-sm" type="password" placeholder="**********" {...register('senha', { required: true })}/>
                {errors.senha && <p className="text-red-500 tsm:text-sm">{errors.senha.message}</p>}

                <label className="text-2xl tsm:text-xl inter font-bold mt-4 ml-1" htmlFor="csenha">Confirme sua senha</label>
                <input className="border border-customStoke mt-2 p-2 rounded-md inter text-lg tsm:text-sm" type="password" placeholder="**********" {...register('csenha', { required: true })}/>
                {errors.csenha && <p className="text-red-500 tsm:text-sm">{errors.csenha.message}</p>}

                <button type="submit" className="bg-orange-500 text-white inter text-2xl font-bold p-2 mb-5 mt-6 rounded-md tsm:text-xl">Cadastrar</button>

                <p className="text-center text-customGray font-bold inter mb-1 tsm:text-sm">Já possui uma conta? <a onClick={goToLogin} className="textorange underline cursor-pointer">Entre!</a></p>
            </form>
        </section>
    );
}
