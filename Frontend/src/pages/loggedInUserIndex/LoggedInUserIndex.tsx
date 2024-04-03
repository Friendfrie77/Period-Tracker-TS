import { useEffect, useState } from "react";
import useUserInfo from "../../hooks/useUserInfo";
import useLoading from "../../hooks/useLoading";
import Spinner from "../../components/layout/Spinner";
import UserWelcomeBar from "../../components/userWelcomeBar/UserWelcomeBar";
import NeedInfo from "./NeedInfo";
import HasInfo from "./HasInfo";
const LoggedInUserIndex = () =>{
    const [needInfo, setInfo] = useState(true)
    const {isLoading} = useLoading();
    const {username, periodStartDate, periodEndDate} = useUserInfo()
    const checkInfo = () =>{
        if(periodStartDate && periodEndDate){
            setInfo(false)
        }
    }
    useEffect(()=>{
        checkInfo()
    })
    const content = isLoading ? <Spinner /> : (
        <main className="content">
            {periodStartDate && periodEndDate?(
                <UserWelcomeBar userName={username} periodStartDate={periodStartDate} periodEndDate={periodEndDate} />
            ): <UserWelcomeBar userName={username}/>}
            {needInfo ? (
                <NeedInfo />
            ): (<HasInfo />)}
        </main>
    )
    return content
}
export default LoggedInUserIndex