import LOGO from '../assets/logo.png'


export default function Header() {
    return(
        <div>
            <div className="pl-16 p-6">
                <img src={LOGO} alt="" width={280} className='ml-8'/>
            </div>
            <div className="lineorange h-5">

            </div>
        </div>
    )
}