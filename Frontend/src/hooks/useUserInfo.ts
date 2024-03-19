//hook for userInfo
import { useAppSelector } from "./useRedux";
const useUserInfo = () =>{
    type  periodType = {
        startDate: string,
        endDate: string
    }
    type previodPeriodType = periodType[]

    const userName:string|undefined = useAppSelector((state) => state.user?.loginUser?.userName);
    const userId: number|undefined = useAppSelector((state) => state.user?.loginUser?.userId);
    const role: string|undefined = useAppSelector((state) => state.user?.loginUser?.role);
    const email: string|undefined = useAppSelector((state) => state.user?.loginUser?.email);
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

    return{userName, userId, role, email, token, cycle, avgLength, periodStartDate, periodEndDate, daysTillPeriod, daysLeftPeriod, canBleed, isBleeding, previodPeriod, notifications}
}

export{useUserInfo}