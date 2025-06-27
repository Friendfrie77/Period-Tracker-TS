import {Form} from 'react-final-form';
import {passwordRegex, passwordRegexResults} from '../../utils/passwordRegex';
import { valuesTypes } from '../modal/modals.types';
import UserTextField from '../userInputFields/UserTextField';
import type { userInfoProps } from '../../types/types';
const ChangePassword: React.FC<userInfoProps> = ({id}) =>{
    const passwordChange = async () =>{
        
    }
    const content = (
        <div>
            <Form 
                onSubmit={passwordChange}
                validate = {(values:valuesTypes) =>{
                    const errors:{
                        oldPassword?:string,
                        password?:string,
                        passwordConfirm?:string
                    } = {};
                    if(!values.oldPassword){
                        errors.oldPassword = 'Required'
                    }
                    if(!values.password){
                        errors.password = 'Required'
                    }
                    if(!values.passwordConfirm){
                        errors.passwordConfirm = 'Required'
                    }if(values.password && values.passwordConfirm){
                        const regex:passwordRegexResults = passwordRegex(values.password, values.passwordConfirm)
                        if(!regex.isValid){
                            errors.password = regex.msg
                        }
                    }
                    return errors;
                }}
                render = {({handleSubmit, valid}) =>(
                    <form onSubmit={handleSubmit} className='password-change-form flex-center'>
                        <span className ={`need-to-add`}>test</span>
                        <UserTextField
                            fieldName='oldPassword'
                            type='password'
                            spanHTMLFor='oldPassword'
                            span = 'Current Password'
                            isDisabled = {false}
                        />
                        <UserTextField
                            fieldName='password'
                            type='password'
                            spanHTMLFor='password'
                            span = 'New Password'
                            isDisabled = {false}
                        />
                        <UserTextField
                            fieldName='passwordConfirm'
                            type='password'
                            spanHTMLFor='passwordConfirm'
                            span = 'Confirm New Password'
                            isDisabled = {false}
                        />
                        <button type = 'submit' className='button' disabled = {!valid}>Submit</button>
                    </form>
                )} 
            />
        </div>
    )
    return content
}
export default ChangePassword
