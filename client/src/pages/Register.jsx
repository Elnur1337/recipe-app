//Components
import RegisterForm from "../components/RegisterForm";

const Register = () => {
    document.title = 'Your Next Meal - Registration';
    return (
        <section className="register">
            <RegisterForm/>
            
        </section>
    );
}
export default Register;