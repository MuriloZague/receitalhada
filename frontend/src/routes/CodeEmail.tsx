import Header from "../components/Header";
import EmailCode from "../components/EmailCode";

export default function CodeEmail() {
    return(
        <div>
            <Header title={true} account={false} />
            <div className="mt-14">
                <EmailCode />
            </div>
        </div>
    )
}