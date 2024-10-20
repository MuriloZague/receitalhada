import Revenues from "../utils/Revenues";

export default function ListRevenues(){

    return(
        <section className="mt-10">
            <div>
                <div>
                    <p className="inter text-3xl font-bold">Principais <span className="textorange">Receitas</span></p>
                </div>
                <Revenues />
            </div>
        </section>
    )
}