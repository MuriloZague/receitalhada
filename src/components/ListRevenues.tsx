import Revenues from "../utils/Revenues";
import Ads from "./Ads";

type RevenuesList = {
    revenues: Array<{ title: string; src: string; perfil: string; name: string; date: string; likes: string }>
  };

export default function ListRevenues({ revenues }: RevenuesList){

    return(
        <section className="mt-10 w-full flex ml-5">
            <div className="w-3/4">
                <div className="mb-8">
                    <p className="inter text-3xl font-bold">Principais <span className="textorange">Receitas</span></p>
                </div>
                <Revenues revenues={revenues} />
            </div>
            <div className="">
                <Ads />
            </div>
        </section>
    )
}