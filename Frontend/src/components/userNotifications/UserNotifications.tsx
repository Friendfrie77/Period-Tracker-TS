import useUserInfo from "../../hooks/useUserInfo";
import useAuth from "../../hooks/useAuth";
type userNotificationsTypes ={
    notificationType: "email" | "text"
}
const UserNotifications :React.FC<userNotificationsTypes> = ({notificationType}) =>{
    //if user ops for text notifactions use a modal to have user enter phone number
    const {emailNotifications, notifications} = useUserInfo()
    const {userEmailNotfications} = useAuth();
    const emailCheckChange = (emailNotifications:boolean) =>{
        console.log("test")
        userEmailNotfications(emailNotifications)
    }
    const phoneChange = (notifications:boolean) =>{
        console.log(notifications)
    }
    // const emailNotifications = true
    console.log(emailNotifications)
    const content = (
        <div className="box-padding">
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
                        <input type="checkbox" checked={notifications === true ? true : false} onChange={() =>phoneChange(notifications)}/>
                        <span className="slider round"></span>
                </label>
            </>}
        </div>
    )
    return content
}

export default UserNotifications