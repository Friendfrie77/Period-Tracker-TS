import ChangePassword from "../../components/userSettings/ChangePassword"
import UserNotifications from "../../components/userNotifications/UserNotifications"
import DeleteAccount from "../../components/userSettings/DeleteAccount"
import useAuth from "../../hooks/useAuth"
import useUserInfo from "../../hooks/useUserInfo"

const AccountMangment:React.FC = () =>{
    const role = "user"
    //password, email not, text not, delete account, change password
    const content = (
        <>
        <h1 className="subheader-text">Account Mangment</h1>
        <div className="profile-cards">
            <h1 className="center-align subheader-text">Change Password</h1>
            {role != "user" ? (
                <p>This setting is only avilable for online accounts.</p>
            ) :
            (
            <>
                <p>What would you like your new password to be?</p>
                <ChangePassword />
            </>
            )
            }
        </div>
        <div className="profile-cards box-padding">
            <h1 className="center-align subheader-text">Notifications</h1>
            <h2>Email Notifications:</h2>
            <UserNotifications notificationType="email" />
            <h3>Text Notifications</h3>
            <UserNotifications notificationType="text" />
        </div>
        <div className="profile-cards box-padding">
            <h1 className="center-align subheader-text">Delete Account</h1>
            <span>Would you like to delete your account? Please note this is not reversable. If you would like to back up any data, please export it before deleting</span>
            <DeleteAccount/>
        </div>
        </>
    )
    return content
}
export default AccountMangment