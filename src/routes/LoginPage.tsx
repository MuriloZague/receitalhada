import Header from "../components/Header";
import Sign from "../components/SignInForm";

export default function LoginPage() {
    return (
        <div>
            <Header title={true} account={false}/>
            <Sign />
        </div>
    );
}
