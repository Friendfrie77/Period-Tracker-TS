import { useOpenModals } from "../../hooks/useOpenModals";
import useAuth from "../../hooks/useAuth";
interface warningModelProps{
    role:string
}
const WarningModel: React.FC<warningModelProps> = ({role}) => {
    const {toggleWarningCall} = useOpenModals();
    const {logout} = useAuth();
    const toggleModalClosed = () =>{
        toggleWarningCall();
    }
    const deleteAccount = (role:string) =>{
        if(role != 'user'){
            logout()
        }
    }
    console.log(role)
    const content = (
        <div className="modal-box">
            <h1>Are you sure you want to delete your account?</h1>
            <p>Please note all your data will be deleted and there is no way to reverse this.</p>
            <div>
                <button className="button" onClick={() => deleteAccount(role)}>Yes</button>
                <button className="button" onClick={toggleModalClosed}>No</button>
            </div>
        </div>
    )
    return content
}

export default WarningModel