import Revenues from "../utils/Revenues";

type RevenuesList = {
    revenues: Array<{ title: string; src: string; perfil: string; name: string; date: string; likes: string }>
  };

export default function ListRevenues({ revenues }: RevenuesList){

    return(
        <section className="mt-10">
            <div>
                <div className="mb-8">
                    <p className="inter text-3xl font-bold">Principais <span className="textorange">Receitas</span></p>
                </div>
                <Revenues revenues={revenues} />
            </div>
        </section>
    )
}