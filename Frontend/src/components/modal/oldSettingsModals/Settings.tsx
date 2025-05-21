import { useState } from "react";
import useUserInfo from "../../../hooks/useUserInfo";
import { AiOutlineClose } from "react-icons/ai";
import DeleteAccount from "./DeleteAccount";
import ChangePassword from "./ChangePassword";
import Notication from "./Notications";
type SettingsProps ={
    setSettingOpen: () => void 
}
const SettingsModal: React.FC<SettingsProps> = ({setSettingOpen}) =>{
    const [settingsModelOpen, setModelOpen] = useState(false)
    const [deleteModal, setDeleteOpen] = useState(false);
    const openDelete = () =>{
        setDeleteOpen(!deleteModal);
        setModelOpen(!settingsModelOpen)
    }
    const [passwordModal, setPasswordOpen] = useState(false);
    const openPassword = () =>{
        setPasswordOpen(!passwordModal)
        setModelOpen(!settingsModelOpen)
    }
    const [notificationModal, setNotificationOpen] = useState(false);
    const openNotification = () =>{
        setNotificationOpen(!notificationModal)
        setModelOpen(!settingsModelOpen)
    }
    const {role} = useUserInfo();
    const content = (
        <section>
            <div className={`modal-box ${settingsModelOpen ? 'display-none' : ''}`}>
                <AiOutlineClose className="exit-button right-align" onClick={setSettingOpen}/>
            {role === "Guest" && <h1 className="center-align">Some settings will not be avilable on a guest account</h1>}
                <div className="setting-option center-align">
                    <button className="button" disabled = {role != "Guest"} onClick={openPassword}>Change Password</button>
                </div>
                <div className="setting-option">
                    <button className="button" disabled = {role != "Guest"} onClick={openNotification}>Toggle Notication</button>
                </div>
                <div className="setting-option">
                    <button className="button" onClick={openDelete}>Delete Account</button>
                </div>
            </div>
        {deleteModal &&
            <DeleteAccount modalFunction={openDelete}/>
        }
        {passwordModal &&
            <ChangePassword modalFunction={openPassword}/>
        }
        {notificationModal &&
            <Notication modalFunction={openNotification} />
        }
        </section>
    )
    return content
}
export default SettingsModal