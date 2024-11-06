import Card from "../utils/Card";
import Ads from "./Ads";

export default function ListCard() {
    return (
        <section className="mt-10 tsm:mt-2">
            <Card />
        <div className="flex w-full justify-center mt-5 xl:hidden tlg:hidden">
            <Ads width="320" height="50"/>
        </div>
        </section>
    )
}