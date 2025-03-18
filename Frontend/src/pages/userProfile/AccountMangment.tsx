import ChangePassword from "../../components/userSettings/ChangePassword"
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
        <div className="profile-cards">
            <h1>Notifications</h1>
            <h2>Email Notfications</h2>
        </div>
        <div>
            <h1>Delete Account</h1>
            <p>Would you like to delete your account? Please note this is not reversable. If you would like to back up any data, please export it before deleting</p>
            
        </div>
        </>
    )
    return content
}
export default AccountMangment