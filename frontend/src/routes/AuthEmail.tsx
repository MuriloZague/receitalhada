import Header from "../components/Header";
import EmailAuth from "../components/EmailAuth";

export default function CodeEmail() {
    return(
        <div>
            <Header title={true} account={false} />
            <div className="mt-14">
                <EmailAuth />
            </div>
        </div>
    )
}