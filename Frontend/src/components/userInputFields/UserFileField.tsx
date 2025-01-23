import {Field} from 'react-final-form';
import type { InputHTMLAttributes } from 'react';
interface Props extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
  }
const UserFileField = ({name, ...props}: Props) =>{
    const userField = (
        <Field name = {name}>
            {({input: {onChange}}) => (
                <div>
                    <input 
                        type = 'file' 
                        onChange = {({target}) =>{
                            onChange(target.files)
                        }}
                        {...props}
                    />
                </div>
            )}
        </Field>
    )
    return userField
}
export default UserFileField;