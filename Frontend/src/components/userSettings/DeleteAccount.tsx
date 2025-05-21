import useAuth from "../../hooks/useAuth";
import useUserInfo from "../../hooks/useUserInfo";
import { useOpenModals } from "../../hooks/useOpenModals";
import WarningModel from "../modal/WarningModal";
import PageFade from "../layout/PageFade";
const DeleteAccount: React.FC = () =>{
    //if local account clear out memory
    //
    const {toggleWarningCall, warningModal} = useOpenModals();
    const {deleteAccount} = useAuth()
    const {role} = useUserInfo();
    console.log(role)
    const deleteAccountButton = (role:string) =>{
        //pop up a warning box with yes or no
        toggleWarningCall();
    }
    const content = (
        <>
        {role == "user" ?(
            test
        ): (
        <>
            <div className="flex-center box-padding">
                <button className="button-large" onClick={() => deleteAccountButton(role)}>Delete Account</button>
            </div>
        </>
        )}
        {warningModal &&
            <PageFade>
                <WarningModel role={role} />
            </PageFade>
        }
        </>
    )
    return content
}

export default DeleteAccount