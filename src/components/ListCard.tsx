import Card from "../utils/Card";

type CardsInfo = {
    sources: Array<{ title: string; src: string }>
}

export default function ListCard({sources}: CardsInfo) {
    return (
        <section className="mt-14">
            <Card sources={sources} />
        </section>
    )
}