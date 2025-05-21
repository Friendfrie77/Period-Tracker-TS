import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import PhoneInput from 'react-phone-input-2';
import useAuth from "../../../hooks/useAuth";
import { functionType } from "../modals.types";

const PhoneModal:React.FC<functionType> = ({modalFunction}) =>{
    const {userPhoneNotfication} = useAuth()
    const [userNumber, setUserNumber] = useState('')
    const numberChange = (number:string) =>{
        setUserNumber(number)
    }
    const onSubmit = (number:string) => {
        //mod usePhone to sometimes take number
        userPhoneNotfication(false ,true,undefined, number)
    }
    //needs the close function
    //needs call for phone
    const content = (
        <div className="modal-box">
            <AiOutlineClose className="exit-button right-align"  onClick={modalFunction}/>
            <div className="flex-center box-padding">
                <h1>Please enter your phone number below</h1>
                <PhoneInput
                    containerStyle={{width:'auto'}}
                    onChange={numberChange}
                    country={'us'}
                    value={userNumber}
                />
                    <button className="button" onClick={() =>onSubmit(userNumber)}>Submit</button>
            </div>
        </div>
    )
    return content
}
export default PhoneModal