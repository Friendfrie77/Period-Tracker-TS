//hook for userInfo
import { useAppSelector, useAppDispatch } from "./useRedux";
import { setPrevPeriod } from "../state/features/users/userSlice";
import dayjs from "dayjs";
import useLoading from "./useLoading";
const APIURL = import.meta.env.VITE_APIURL
type  periodType = {
    startDate: string,
    endDate: string
}
export type previodPeriodType = periodType[] | undefined | null

type datesType = {
    startDate?: Date;
    endDate?: Date;
    key?: string;
}
const useUserInfo = ()=>{
    const dispatch = useAppDispatch();
    const {loading} = useLoading();
    //any userinfo needed for the app
    const username:string|undefined = useAppSelector((state) => state.user?.loginUser?.username);
    const _id:number|undefined = useAppSelector((state) => state.user?.loginUser?._id);
    const role:string|undefined = useAppSelector((state) => state.user?.loginUser?.role);
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
    const previodPeriod: previodPeriodType|undefined|null = useAppSelector((state) => state.user?.loginUser?.previodPeriod)
    const notifications: boolean|undefined = useAppSelector((state) => state.user?.loginUser?.notifications)
    const isAuth: boolean = !!token
    let cycleStartDate: string | null = null
    if(typeof cycle === 'number'){
        cycleStartDate = dayjs(periodStartDate).subtract(cycle, 'days').format()
    }
    const todaysDate:string = dayjs().format()
    //helper functions
    //checks if a period date is in the current list of logged periods
    const checkIfDateIsPresent = (loggedPeriods:previodPeriodType, period:previodPeriodType) => {
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
            if(previodPeriod === null || previodPeriod === undefined){
                dispatch(setPrevPeriod(period))
            }else{
                if(!checkIfDateIsPresent(previodPeriod, period)){
                    dispatch(
                        setPrevPeriod([...previodPeriod, ...period])
                    )
                }
            }
        }
    }

    //sending periods from account setup to server
    const sendUserPrevPeriods = async (previodPeriod:previodPeriodType) =>{
        loading();
        const data = {_id, role, previodPeriod}
        const prevPeriodAPICall = await fetch(`${APIURL}/data/addNewPrevPeriods`,{
            method: 'Post',
            mode: "cors",
            headers:{Authorization: `Bearer ${token}`,
            "Content-Type": 'application/json'},
            body: JSON.stringify(data)
        })
    }

    
    return{username, _id, role, email, token, cycle, avgLength, periodStartDate, periodEndDate, daysTillPeriod, daysLeftPeriod, canBleed, isBleeding, previodPeriod, notifications, isAuth, cycleStartDate, todaysDate, updateUserDates, sendUserPrevPeriods}
}


export default useUserInfo