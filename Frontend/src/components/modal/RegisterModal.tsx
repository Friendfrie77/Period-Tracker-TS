import { Form } from "react-final-form";
import Spinner from "../layout/Spinner";
import { AiOutlineClose } from "react-icons/ai";
import { emailRegex } from "../../utils/emailRegx";
import { passwordRegex } from "../../utils/passwordRegex";
import UserTextField from "../userInputFields/UserTextField";
//Reg hook


//figure out props

const RegisterModal: React.FC = () =>{
        //replace is loading with hook
        const isLoading : boolean = false;
        const onSubmit = async() =>{
            //replace with hook, figure out how to passed mixed type array
        }
        const figureOutClose = () =>{
    
        }

        interface valuesTypes{
            email?: string, 
            username?: string,
            password?: string,
            passwordConfirm?: string
        }
        const content = isLoading ? <Spinner /> :(
            <section className="login-wrapper">
                <AiOutlineClose onClick={figureOutClose} className="exit-button" />
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
                        }else{
                            const regex = passwordRegex(values.password, values.passwordConfirm)
                            if(!regex){
                                errors.password = regex
                            }
                        }
                        return errors;
                    }}
                />
            </section>
        )
        return content
}
export default RegisterModal;