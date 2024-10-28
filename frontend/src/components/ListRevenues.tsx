import Revenues from "../utils/Revenues";
import Ads from "./Ads";

type RevenuesList = {
    revenues: Array<{ title: string; src: string; perfil: string; name: string; date: string; likes: string }>
  };

export default function ListRevenues({ revenues }: RevenuesList){

    return(
        <section className="mt-8 w-full flex">
            <div className="w-11/12 tsm:w-full lg:w-full">
                <div className="mb-8 tsm:mb-5">
                    <p className="inter text-3xl font-bold tsm:text-2xl tsm:text-center">Principais <span className="textorange">Receitas</span></p>
                </div>
                <Revenues revenues={revenues} />
            </div>
            <div className="lg:hidden tsm:hidden tmd:hidden">
                <Ads width="250" height="550" />
            </div>
        </section>
    )
}