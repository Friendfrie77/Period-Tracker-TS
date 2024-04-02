import { useEffect, useState } from "react";
import useUserInfo from "../../hooks/useUserInfo";
import useLoading from "../../hooks/useLoading";
import Spinner from "../../components/layout/Spinner";
import UserWelcomeBar from "../../components/userWelcomeBar/UserWelcomeBar";
import NeedInfo from "./NeedInfo";
const LoggedInUserIndex = () =>{
    const [needInfo, setInfo] = useState(true)
    const {isLoading} = useLoading();
    console.log(isLoading)
    const {username, periodStartDate, periodEndDate} = useUserInfo()
    console.log(username)
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
                <UserWelcomeBar userName={username} />
            ): <UserWelcomeBar userName={username}/>}
            {needInfo ? (
                <NeedInfo />
            ): (<h1>{periodStartDate}-{periodEndDate}</h1>)}
        </main>
    )
    return content
}
export default LoggedInUserIndex