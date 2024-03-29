import { Form } from "react-final-form";
import Spinner from "../layout/Spinner";
import { AiOutlineClose } from "react-icons/ai";
import { emailRegex } from "../../utils/emailRegx";
import UserTextField from "../userInputFields/UserTextField";
import { useOpenModals } from "../../hooks/useOpenModals";
import useAuth from "../../hooks/useAuth";
import useLoading from "../../hooks/useLoading";
//passwordRegex
//use regSetup hook
//userlogin hook

//figure out props

const LoginModal: React.FC =() =>{
    const {isLoading} = useLoading();
    const {login, logout} = useAuth();
    const {toggleLoginCall} = useOpenModals();
    // const onSubmit = async(values:valuesTypes) =>{
    //     login(values);
    // }
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
                        <button type= "submit" disabled = {!valid}>Submit</button>
                    </form>
                )}
                />
        </section>
    )
    return content;
}
export default LoginModal;