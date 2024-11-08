import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from 'react-router-dom';

const signUpSchema = z.object({
    nome: z.string().min(1, { message: 'Este campo é obrigatório' }),
    username: z.string().min(1, { message: 'Este campo é obrigatório' }),
    email: z.string().min(1, { message: 'O e-mail é obrigatório' }).email({ message: 'Formato de e-mail inválido' }),
    telefone: z.string()
        .min(14, { message: 'O telefone deve ter 11 dígitos' })
        .regex(/^\(\d{2}\) \d{5}-\d{4}$/, { message: 'Formato de telefone inválido' }),
    senha: z.string().min(6, { message: 'A senha deve ter no mínimo 6 caracteres' }),
    csenha: z.string().min(1, { message: 'Este campo é obrigatório' }),
}).refine((data) => data.senha === data.csenha, {
    message: 'As senhas não coincidem',
    path: ['csenha'],
});

type SignUpSchema = z.infer<typeof signUpSchema>;

export default function SignUp() {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema)
    });

    const handleSignIn = (data: SignUpSchema) => { // adicionei o 'cleanData' para mandar o numero de telefone sem os () e -, avisar se for tratar disso no backend.
        const cleanData = {
            ...data,
            telefone: data.telefone.replace(/\D/g, ""),
        };
        console.log(cleanData);
    };

    const goToLogin = () => {
        navigate('/login');
    };

    const formatPhone = (value: string) => {
        value = value.replace(/\D/g, "");
        if (value.length > 11) value = value.slice(0, 11); // Limita o input a 11 dígitos
        if (value.length > 6) {
            return `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
        } else if (value.length > 2) {
            return `(${value.slice(0, 2)}) ${value.slice(2)}`;
        } else {
            return value;
        }
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedPhone = formatPhone(e.target.value);
        setValue('telefone', formattedPhone);
    };

    return (
        <section className="m-auto mt-12 tsm:mt-10 lg:w-2/3 txl:w-[48%] tlg:w-2/3 w-[42%] tsm:w-11/12 rounded-lg p-5 px-10 mb-12 tsm:mb-10" style={{'backgroundColor': '#d9d9d9'}}>
            <div className="mb-4 tsm:mb-2 ">
                <p className="receita text-4xl tsm:text-[1.6rem] text-center font-bold tsm:leading-8"><span className="textorange">Bem vindo ao</span> Receitalhada!</p>
            </div>
            <div className="h-0.5 line"></div>

            <form onSubmit={handleSubmit(handleSignIn)} className="flex flex-col">

                <label htmlFor="nome" className="text-2xl tsm:text-xl inter font-bold mt-5 ml-1">Nome</label>
                <input className="border border-customStoke mt-2 p-2 rounded-md inter text-lg tsm:text-sm" type="text" placeholder="Seu Nome" {...register('nome', { required: true })}/>
                {errors.nome && <p className="text-red-500 tsm:text-sm">{errors.nome.message}</p>}

                <label htmlFor="nome" className="text-2xl tsm:text-xl inter font-bold mt-5 ml-1">Usuário</label>
                <input className="border border-customStoke mt-2 p-2 rounded-md inter text-lg tsm:text-sm" type="text" placeholder="Seu Nome de Usuário" {...register('username', { required: true })}/>
                {errors.username && <p className="text-red-500 tsm:text-sm">{errors.username.message}</p>}

                <label htmlFor="email" className="text-2xl tsm:text-xl inter font-bold mt-4 ml-1">E-mail</label>
                <input className="border border-customStoke mt-2 p-2 rounded-md inter text-lg tsm:text-sm" type="email" placeholder="email@email.com" {...register('email', { required: true })}/>
                {errors.email && <p className="text-red-500 tsm:text-sm">{errors.email.message}</p>}

                <label htmlFor="telefone" className="text-2xl tsm:text-xl inter font-bold mt-5 ml-1">Telefone</label>
                <input className="border border-customStoke mt-2 p-2 rounded-md inter text-lg tsm:text-sm" type="text" placeholder="(12) 34567-8910" {...register('telefone', { required: true, onChange: handlePhoneChange })}/>
                {errors.telefone && <p className="text-red-500 tsm:text-sm">{errors.telefone.message}</p>}

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
