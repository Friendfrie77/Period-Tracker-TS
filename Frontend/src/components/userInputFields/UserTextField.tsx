import {Field} from 'react-final-form';

type UserTextFieldProps ={
    fieldName: string,
    type: string,
    isDisabled: boolean,
    spanHTMLFor: string,
    span: string
}
const UserTextField: React.FC<UserTextFieldProps> =({fieldName, type, isDisabled, spanHTMLFor, span}) =>{
    const userField =(
        <Field name = {`${fieldName}`}>
            {({input, meta}) =>(
                <div className='text-field'>
                    <input {...input} type = {`${type}`} disabled = {isDisabled} required />
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