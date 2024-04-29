interface passwordRegexResults {
    isValid: boolean;
    msg?: string;
}

const passwordRegex = (newPassword:string, confirmNewPassword:string) : passwordRegexResults =>{
    if(newPassword !== confirmNewPassword){
        return({isValid: false, msg: 'Passwords do not match'})
    }else{
        if(newPassword.length < 6){
            return({isValid: false, msg: 'Password must be longer than 6 characters'})
        }else if(newPassword.search(/[a-z]/i) < 0){
            return ({isValid:false, msg: 'Password must contain at least one letter'})
        }else if(newPassword.search(/[0-9]/i) < 0){
            return ({isValid:false, msg: 'Password must contain at least one number'})
        }else if(newPassword.search(/^(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹]).*$/i) < 0){
            return ({isValid:false, msg: 'Password must contain at least one special symbol'})
        }else{
            return ({isValid:true})
        }
    }
}

export {passwordRegex};
export type {passwordRegexResults};