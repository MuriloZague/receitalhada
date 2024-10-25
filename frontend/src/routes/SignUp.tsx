import Header from "../components/Header";
import SignUp from "../components/SignUpForm";

export default function SignUpPage() {
    return (
        <div>
            <Header title={true} account={false}/>
            <SignUp/>
        </div>
    );
}
