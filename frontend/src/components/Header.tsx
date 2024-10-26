import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import LOGO from '../assets/logo.png'
import ACCOUNT from '../assets/iconaccount.svg'

type HeaderProps = {
    account: Boolean;
    title: Boolean;
}

export default function Header({account, title}: HeaderProps) {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const navigate = useNavigate()

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const goToLogin = () => {
        navigate('/login');
    };

    const goToSignUp = () => {
        navigate('/cadastro')
    }

    const goToHome = () => {
        navigate('/')
    }

    return(
        <div>
            {title === false ? 
            <div className="px-16 tsm:px-7 tsm:mt-4 p-4 flex justify-between">
                <img src={LOGO} className='w-[280px] tsm:w-[190px] tsm:h-[35px] ml-8 tsm:ml-0 cursor-pointer'/> 
                {account && (
                    <img className='mt-1 cursor-pointer w-[45px] tsm:w-[35px]' src={ACCOUNT} onClick={toggleMenu} />
                )}
                
                {isMenuOpen && (
                    <div className="absolute right-5 top-20 bg-white border border-gray-300 shadow-md p-2 px-8 rounded">
                    <p className="cursor-pointer hover:text-gray-700 mb-1 text-center" onClick={goToLogin}>Entrar</p>
                    <hr />
                    <p className="cursor-pointer hover:text-gray-700 text-center" onClick={goToSignUp}>Cadastrar</p>
                </div>
                )}
            </div>
            :
            <div className="px-16 p-4 flex justify-center">
            <img src={LOGO} onClick={goToHome} className='w-[280px] tsm:w-[190px] tsm:mt-4 cursor-pointer'/> 
            {account && (
                <img className='mt-1 cursor-pointer' src={ACCOUNT} width={45} onClick={toggleMenu} />
            )}
            
        </div>
        }
            <div className="lineorange h-5 tsm:h-3">
            </div>
            
        </div>
    )
}