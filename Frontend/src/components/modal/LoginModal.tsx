import { Form } from "react-final-form";
import Spinner from "../layout/Spinner";
import { AiOutlineClose } from "react-icons/ai";
import { emailRegex } from "../../utils/emailRegx";
import UserTextField from "../userInputFields/UserTextField";
import { useOpenModals } from "../../hooks/useOpenModals";
import useAuth from "../../hooks/useAuth";
import useLoading from "../../hooks/useLoading";

const LoginModal: React.FC =() =>{
    const {isLoading} = useLoading();
    const {logout} = useAuth();
    const {toggleLoginCall, toggleRegisterCall} = useOpenModals();
    const openReg = () =>{
        toggleRegisterCall();
        toggleLoginCall();
    }
    const onSubmit = async() =>{
        logout()
    }
    interface valuesTypes{
        email?: string, 
        password?: string
    }
    const content = isLoading ? <Spinner /> :(
        <section className="login-wrapper">
            <AiOutlineClose onClick={toggleLoginCall} className="exit-button" />
            <Form
                onSubmit={onSubmit}
                validate = {(values:valuesTypes) => {
                    const errors:{
                        email?: string,
                        password?: string
                    } = {}
                    if(!values.email){
                        errors.email = 'Required'
                    }else{
                        const regex:boolean = emailRegex(values.email).isVaild
                        if(!regex){
                            errors.email = 'Email not vaild'
                        }
                    }
                    if(!values.password){
                        errors.password = 'Required'
                    }
                    return errors;
                }}
                render = {({handleSubmit, valid
                })=>(
                    <form onSubmit={handleSubmit}>
                        <h1>Sign In</h1>
                        <UserTextField 
                            fieldName="email"
                            type = "email"
                            isDisabled = {false} 
                            spanHTMLFor="email"
                            span = 'Email'
                        />
                        <UserTextField
                            fieldName = 'password'
                            type = 'password'
                            spanHTMLFor = 'password'
                            span = 'Password'
                            isDisabled = {false}
                        />
                        <button type= "submit" className="button" disabled = {!valid}>Login</button>
                    </form>
                )}
                />
                <section className="account-reg flex-center">
                    <hr className="hr-fullpage"></hr>
                    <h3 className="body-text">New? <button className="button-link" onClick={openReg}>Create an account here &#8594;</button></h3>
                </section>
        </section>
    )
    return content;
}
export default LoginModal;