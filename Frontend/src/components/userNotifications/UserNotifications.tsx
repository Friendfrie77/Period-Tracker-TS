import { useState } from "react";
import useUserInfo from "../../hooks/useUserInfo";
import useAuth from "../../hooks/useAuth";
import PhoneModal from "../modal/settingModals/PhoneModal";
import PageFade from "../layout/PageFade";
type userNotificationsTypes ={
    notificationType: "email" | "text"
}
const UserNotifications :React.FC<userNotificationsTypes> = ({notificationType}) =>{
    //if user ops for text notifactions use a modal to have user enter phone number
    const [phoneModel, setPhoneModel] = useState(false)
    const {emailNotifications, notifications} = useUserInfo()
    const {userEmailNotfications, userPhoneNotfication} = useAuth();
    const openPhoneModel = () =>{
        setPhoneModel(!phoneModel)
    }
    const emailCheckChange = (emailNotifications:boolean) =>{
        console.log(emailNotifications)
        userEmailNotfications(emailNotifications)
    }
    const phoneChange = (notifications:boolean, phoneModel:boolean, openPhoneModel:() => void) =>{
        userPhoneNotfication(notifications, phoneModel, openPhoneModel)
    }

    const content = (
        <div className="box-padding flex-col flex-row-gap-1rem">
            {notificationType === "email" ?(
                <>
                    <span>You are currently {emailNotifications === true ? 'receiving' : 'are not receiving'} email notifications when your period is near. To change that please hit the toggle switch.</span>
                    <label className="checkbox-container">
                        <input type="checkbox" checked={emailNotifications === true ? true : false} onChange={() =>emailCheckChange(emailNotifications)}/>
                        <span className="slider round"></span>
                    </label>
                </>
            ):
            <>
                <span>You are currently {notifications === true ? 'receiving' : 'are not receiving'} text notifications when your period is near.</span>
                <label className="checkbox-container">
                        <input type="checkbox" checked={notifications === true ? true : false} onChange={() =>phoneChange(notifications, phoneModel, openPhoneModel)}/>
                        <span className="slider round"></span>
                </label>
            </>}
            {phoneModel &&
                <PageFade>
                    <PhoneModal modalFunction={openPhoneModel}/>
                </PageFade>
            }
        </div>
    )
    return content
}

export default UserNotifications