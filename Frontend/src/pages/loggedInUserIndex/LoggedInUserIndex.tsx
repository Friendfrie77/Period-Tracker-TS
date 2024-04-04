import { useEffect, useState } from "react";
import useUserInfo from "../../hooks/useUserInfo";
import useLoading from "../../hooks/useLoading";
import Spinner from "../../components/layout/Spinner";
import UserWelcomeBar from "../../components/userWelcomeBar/UserWelcomeBar";
import NeedInfo from "./NeedInfo";
import HasInfo from "./HasInfo";
const LoggedInUserIndex:React.FC = () =>{
    const [needInfo, setInfo] = useState(true)
    const {isLoading} = useLoading();
    const {periodStartDate, periodEndDate} = useUserInfo()
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
                <UserWelcomeBar showDateStrip ={true} />
            {needInfo ? (
                <NeedInfo />
            ): (<HasInfo />)}
        </main>
    )
    return content
}
export default LoggedInUserIndex