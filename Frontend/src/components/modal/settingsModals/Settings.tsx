import { useState } from "react";
import useUserInfo from "../../../hooks/useUserInfo";
import { AiOutlineClose } from "react-icons/ai";
import DeleteAccount from "./DeleteAccount";
import ChangePassword from "./ChangePassword";
type SettingsProps ={
    setSettingOpen: () => void 
}
const SettingsModal: React.FC<SettingsProps> = ({setSettingOpen}) =>{
    const [deleteModal, setDeleteOpen] = useState(false);
    const openDelete = () =>{
        setDeleteOpen(!deleteModal);
    }
    const [passwordModal, setPasswordOpen] = useState(false);
    const openPassword = () =>{
        setPasswordOpen(!passwordModal)
    }
    const {role} = useUserInfo();
    const content = (
        <section>
            <div className={`modal-box ${deleteModal || passwordModal ? 'display-none' : ''}`}>
                <AiOutlineClose className="exit-button right-align" onClick={setSettingOpen}/>
            {role === "Guest" && <h1 className="center-align">Some settings will not be avilable on a guest account</h1>}
                <div className="setting-option center-align">
                    <button className="button" disabled = {role != "Guest"} onClick={openPassword}>Change Password</button>
                </div>
                <div className="setting-option">
                    <button className="button" disabled = {role === "Guest"}>Toggle Notication</button>
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
        </section>
    )
    return content
}
export default SettingsModal