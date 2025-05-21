import { useState } from "react";
import type { functionType } from "../modals.types";
import { AiOutlineClose } from "react-icons/ai";
import useUserInfo from '../../../hooks/useUserInfo';
import useAuth from '../../../hooks/useAuth';
import { useMessage } from "../../../context/MessageContext/MessageContext";
import AlertMessage from "../../alertMessage/AlertMessage";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/high-res.css';
const Notication:React.FC<functionType> =({modalFunction}) =>{
    const {notifications} = useUserInfo();
    const {message} = useMessage();
    const {userPhoneNotfication} = useAuth();
    const [phoneNumber, setPhoneNumber] = useState('')
    const numberChange = (number:string) =>{
        setPhoneNumber(number)
    }
    const onSubmit = () =>{
        userPhoneNotfication()
        console.log(phoneNumber)
    }
    const content = message ? <AlertMessage /> : (
        <div className="modal-box">
            <AiOutlineClose className="exit-button right-align" onClick={modalFunction} />
            <div className="flex-center box-padding">
                {notifications ?(
                    <div className="flex-center">
                    <h1>Would you like to stop notifications?</h1>
                    <button className="button" type="submit">Submit</button>
                    </div>
                ): (
                    <div className="flex-center box-padding">
                    <h1>Would you like to sign up for text notifications?</h1>
                    <p>With notifications you will get a text a few days before your period starts and a few days before it ends.</p>
                    <PhoneInput
                        // containerClass="flex-center"
                        containerStyle={{width:'auto'}}
                        onChange={numberChange}
                        country={'us'}
                        value={phoneNumber}
                    />
                    <button className="button" type="submit" onClick={onSubmit}>Submit</button>
                    </div>
                )
                }
            </div>
        </div>
    )

    return content
}
export default Notication