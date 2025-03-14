import { Form } from "react-final-form";
import Spinner from "../layout/Spinner";
import { AiOutlineClose } from "react-icons/ai";
import { emailRegex } from "../../utils/emailRegx";
import { passwordRegex, passwordRegexResults} from "../../utils/passwordRegex";
import UserTextField from "../userInputFields/UserTextField";
import { useOpenModals } from "../../hooks/useOpenModals";
import useAuth from "../../hooks/useAuth";

const RegisterModal: React.FC = () =>{
    const {toggleRegisterCall} = useOpenModals();
    const {register} = useAuth();
    //replace is loading with hook
    const isLoading : boolean = false;
    const onSubmit = async(values:valuesTypes) =>{
        register(values)
    }
    interface valuesTypes{
        email?: string, 
        username?: string,
        password?: string,
        passwordConfirm?: string
    }
    const content = isLoading ? <Spinner /> :(
        <section className="login-wrapper">
            <AiOutlineClose onClick={toggleRegisterCall} className="exit-button" />
            <Form
                onSubmit={onSubmit}
                validate={(values:valuesTypes) =>{
                    const errors:{
                        email?: string,
                        username?: string,
                        password?: string,
                        passwordConfirm?: string
                    } ={}
                    if (!values.email){
                        errors.email = 'Required'
                    }
                    if (!values.username){
                        errors.username = 'Required'
                    }
                    if (!values.password){
                        errors.password = 'Required'
                    }
                    if (!values.passwordConfirm){
                        errors.passwordConfirm = 'Required'
                    }
                    if(values.password && values.passwordConfirm){
                        const regex:passwordRegexResults = passwordRegex(values.password, values.passwordConfirm)
                        if(!regex.isValid){
                            errors.password = regex.msg
                        }
                    }
                    if(values.email){
                        const regex:boolean = emailRegex(values.email).isVaild
                        if(!regex){
                            errors.email = 'Email not vaild'
                        }
                    }
                    return errors;
                }}
                render = {({handleSubmit, valid
                })=>(
                    <form onSubmit={handleSubmit}>
                        <h1>Sign Up</h1>
                        <UserTextField 
                            fieldName = 'email'
                            type='email'
                            spanHTMLFor='email'
                            span = 'Email'
                            isDisabled = {false}
                        />
                        <UserTextField 
                            fieldName = 'username'
                            type='text'
                            spanHTMLFor='username'
                            span = 'Username'
                            isDisabled = {false}
                        />
                        <UserTextField 
                            fieldName = 'password'
                            type='password'
                            spanHTMLFor='password'
                            span = 'Password'
                            isDisabled = {false}
                        />
                        <UserTextField 
                            fieldName = 'passwordConfirm'
                            type='password'
                            spanHTMLFor='passwordConfirm'
                            span = 'Confirm Password'
                            isDisabled = {false}
                        />
                        <button type= "submit" className="button" disabled = {!valid}>Submit</button>
                    </form>
                )}
            />
        </section>
    )
        return content
}
export default RegisterModal;