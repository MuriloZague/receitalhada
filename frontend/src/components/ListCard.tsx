import Card from "../utils/Card";
import Ads from "./Ads";

type CardsInfo = {
    sources: Array<{ title: string; src: string }>
}

export default function ListCard({sources}: CardsInfo) {
    return (
        <section className="mt-10 tsm:mt-2">
            <Card sources={sources} />
        <div className="flex w-full justify-center mt-5 xl:hidden tlg:hidden">
            <Ads width="320" height="50"/>
        </div>
        </section>
    )
}