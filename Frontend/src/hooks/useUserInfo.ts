//hook for userInfo
import { useAppSelector, useAppDispatch } from "./useRedux";
import { setPrevPeriod} from "../state/features/users/userSlice";
import dayjs from "dayjs";
import type {previousPeriod} from '../types/types'
// import { useMessage } from "../context/MessageContext/MessageContext";
// import { redirect } from "react-router-dom";
// const APIURL = import.meta.env.VITE_APIURL


type datesType = {
    startDate?: Date;
    endDate?: Date;
    key?: string;
}

const useUserInfo = ()=>{
    const dispatch = useAppDispatch();
    //any userinfo needed for the app
    // console.log(useAppSelector((state) => state.user?.loginUser))
    const username:string|undefined = useAppSelector((state) => state.user?.loginUser?.username);
    const id:number|string|undefined|'localUser' = useAppSelector((state) => state.user?.loginUser?.id);
    const role:"User"|"Demo"|"Local"|undefined = useAppSelector((state) => state.user?.loginUser?.role);
    const email:string|undefined = useAppSelector((state) => state.user?.loginUser?.email);
    const token:string|undefined = useAppSelector((state) => state.user?.loginUser?.token);
    const cycle: number|undefined|null = useAppSelector((state) => state.user?.loginUser?.cycle);
    const avgLength: number|undefined|null = useAppSelector((state) => state.user?.loginUser?.avgLength);
    const periodStartDate: string|undefined|null = useAppSelector((state) => state.user?.loginUser?.periodStartDate);
    const periodEndDate: string|undefined|null = useAppSelector((state) => state.user?.loginUser?.periodEndDate);
    const daysTillPeriod: number|undefined|null = useAppSelector((state) => state.user?.loginUser?.daysTillPeriod);
    const daysLeftPeriod: number|undefined|null = useAppSelector((state) => state.user?.loginUser?.daysLeftPeriod);
    const canBleed: boolean|undefined = useAppSelector((state) => state.user?.loginUser?.canBleed);
    const isBleeding : boolean|undefined = useAppSelector((state) => state.user?.loginUser?.isBleeding);
    const previousPeriod: previousPeriod|undefined|null = useAppSelector((state) => state.user?.loginUser?.previousPeriod)
    const notifications: boolean = useAppSelector((state) => state.user?.loginUser?.notifications ?? false)
    const emailNotifications: boolean = useAppSelector((state) => state.user?.loginUser?.emailNotifications ?? false)
    let cycleStartDate: string | null = null
    if(typeof cycle === 'number'){
        cycleStartDate = dayjs(periodStartDate).subtract(cycle, 'days').format()
    }
    const todaysDate:string = dayjs().format()

    //helper functions
    //checks if a period date is in the current list of logged periods
    const checkIfDateIsPresent = (loggedPeriods:previousPeriod, period:previousPeriod) => {
        const result = loggedPeriods.some(dateSet => dateSet.startDate === period[0].startDate || dateSet.endDate === period[0].endDate);
        return result;
    }
    //functions needed to update/change user info
    const updateUserDates = (dates:datesType[]) =>{
        const period = [{
            startDate: dayjs(dates[0].startDate).format('YYYY-MM-DD'),
            endDate: dayjs(dates[0].endDate).format('YYYY-MM-DD')
        }]
        if(period[0].startDate !== period[0].endDate){
            if(previousPeriod === null || previousPeriod === undefined){
                dispatch(setPrevPeriod(period))
            }else{
                if(!checkIfDateIsPresent(previousPeriod, period)){
                    dispatch(
                        setPrevPeriod([...previousPeriod, ...period])
                    )
                }
            }
        }
    }
    //checks is user is authed
    const isAuth = ():boolean => !!token
    
    return{username, id, role, email, token, cycle, avgLength, periodStartDate, periodEndDate, daysTillPeriod, daysLeftPeriod, canBleed, isBleeding, previousPeriod, notifications, emailNotifications, isAuth, cycleStartDate, todaysDate, updateUserDates, checkIfDateIsPresent}
}

export default useUserInfo