import {Field} from 'react-final-form';
import type { InputHTMLAttributes } from 'react';
interface Props extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
  }
const UserFileField = ({name, ...props}: Props) =>{
    const userField = (
        <Field name = {name}>
            {({input: {onChange}}) => (
                <div className='flex-center'>
                    <input
                        id='file-upload'
                        type = 'file'
                        onChange = {({target}) =>{
                            onChange(target.files?.[0] || null)
                        }}
                        {...props}
                    />
                    <label htmlFor="file-upload" className='file-upload-button button'>Select File</label>
                </div>
            )}
        </Field>
    )
    return userField
}
export default UserFileField;