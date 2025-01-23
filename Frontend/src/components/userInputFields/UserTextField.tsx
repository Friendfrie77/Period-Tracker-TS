import {Field} from 'react-final-form';
import type {UserFieldProps} from './inputFields.types'

const UserTextField: React.FC<UserFieldProps> =({fieldName, type, isDisabled, spanHTMLFor, span}) =>{
    const userField =(
        <Field name = {`${fieldName}`}>
            {({input, meta}) =>(
                <div className='text-field'>
                    <input {...input} type = {`${type}`} disabled = {isDisabled} />
                    <label htmlFor={spanHTMLFor} className={`text-field-lable ${meta.error && meta.touched && !meta.active  ? `span-error` : ''}`}>
                        <span className={`text-field-span ${isDisabled ? 'input-disabled' : ''}`}>{span}</span>
                    </label>
                    {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                </div>
            )}
        </Field>
    )
    return userField
}
export default UserTextField