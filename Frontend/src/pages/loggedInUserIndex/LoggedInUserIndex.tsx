import { useEffect, useState } from "react";
import useUserInfo from "../../hooks/useUserInfo";
import useLoading from "../../hooks/useLoading";
import Spinner from "../../components/layout/Spinner";
import UserWelcomeBar from "../../components/userWelcomeBar/UserWelcomeBar";
import NeedInfo from "./NeedInfo";
import HasInfo from "./HasInfo";
import useData from "../../hooks/useData";
const LoggedInUserIndex:React.FC = () =>{
    const [needInfo, setInfo] = useState(true)
    const {isLoading} = useLoading();
    const {periodStartDate, periodEndDate, cycle, avgLength, previousPeriod} = useUserInfo()
    const {calcUserData} = useData();
    const checkInfo = () =>{
        // console.log(cycle, avgLength,previousPeriod, periodStartDate, periodEndDate)
        if(previousPeriod){
            calcUserData(previousPeriod)
        }
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