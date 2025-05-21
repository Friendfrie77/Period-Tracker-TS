import {Form} from 'react-final-form';
import UserTextField from '../../userInputFields/UserTextField';
import { AiOutlineClose } from "react-icons/ai";
import useUserInfo from '../../../hooks/useUserInfo';
import useAuth from '../../../hooks/useAuth';
import { valuesTypes } from '../modals.types';
import type {functionType} from '../modals.types';
import useLoading from "../../../hooks/useLoading";
import Spinner from '../../layout/Spinner';
import { useMessage } from '../../../context/MessageContext/MessageContext';
const DeleteAccount: React.FC<functionType> = ({modalFunction})=>{
    const {role} = useUserInfo();
    const {message, messageType} = useMessage()
    const {deleteAccount} = useAuth();
    const {isLoading} = useLoading();
    const deleteAccountCall = (values:valuesTypes) =>{
        if(role){
            if(Object.keys(values).length){
                deleteAccount(role, values.email)
            }else{
                deleteAccount(role)
            }
        }
        // if(role){
        //     deleteAccount(role)
        // }
    }
    const content = isLoading? <Spinner/> : (
        <div className='modal-box'>
            <AiOutlineClose className="exit-button right-align" onClick={modalFunction}/>
            <div className='flex-center box-padding'>
                <h1 className='body-text padding-bottom-1rem'>{role === 'Guest' ? 'Any information need is not required on a guest account' : "Please enter your email adress to delete your account."}</h1>
                <p className='body-text padding-bottom-1rem'>This will delete all data associated with the acount and can not be reversed.</p>
                <Form
                    onSubmit={deleteAccountCall}
                    validate = {(values:valuesTypes) =>{
                        const error:{
                            email?:string
                        } = {};
                        if(!values.email && role !== 'Guest'){
                            error.email = 'Required'
                        }
                        return error;
                    }}
                    render = {({handleSubmit, vaild}) =>(
                        <form onSubmit={handleSubmit} className='flex-center'>
                            <span className={`${messageType === 'error' ? 'warning' : 'success'} body-text`}>{message}</span>
                            <UserTextField
                                fieldName = "email"
                                type = 'email'
                                spanHTMLFor = 'email'
                                span = {role === "Guest" ? 'Account Info will be auto filled' : "Email"}
                                isDisabled = {role === "Guest"}
                            />
                            <button className='button' type='submit' disabled={!vaild && role !== 'Guest'}>Delete</button>
                        </form>
                    )}
                />
            </div>
        </div>
    )
    return content
}
export default DeleteAccount