import useAuth from "../../hooks/useAuth"
import useUserInfo from "../../hooks/useUserInfo"
const DeleteAccount: React.FC = () =>{
    //if local account clear out memory
    //
    const {deleteAccount} = useAuth()
    const {role} = useUserInfo();
    console.log(role)
    const content = (
        <>
        {role == "user" ?(
            test
        ): (
        <>

        </>    
        )}
        </>
    )
    return content
}

export default DeleteAccount