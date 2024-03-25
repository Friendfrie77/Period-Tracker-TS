//hook for userInfo
import { useAppSelector } from "./useRedux";
import type { user } from "../state/features/users/userSlice";

const useUserInfo = (info?: keyof user):user | (user[keyof user])=>{

    const userInfo: user ={
        username: useAppSelector((state) => state.user?.loginUser?.username),
        _id: useAppSelector((state) => state.user?.loginUser?._id),
        role: useAppSelector((state) => state.user?.loginUser?.role),
        email: useAppSelector((state) => state.user?.loginUser?.email),
        token: useAppSelector((state) => state.user?.loginUser?.token),
        cycle: useAppSelector((state) => state.user?.loginUser?.cycle),
        avgLength: useAppSelector((state) => state.user?.loginUser?.avgLength),
        periodStartDate: useAppSelector((state) => state.user?.loginUser?.periodStartDate),
        periodEndDate: useAppSelector((state) => state.user?.loginUser?.periodEndDate),
        daysTillPeriod: useAppSelector((state) => state.user?.loginUser?.daysTillPeriod),
        daysLeftPeriod:  useAppSelector((state) => state.user?.loginUser?.daysLeftPeriod),
        canBleed: useAppSelector((state) => state.user?.loginUser?.canBleed),
        isBleeding : useAppSelector((state) => state.user?.loginUser?.isBleeding),
        previodPeriod: useAppSelector((state) => state.user?.loginUser?.previodPeriod),
        notifications: useAppSelector((state) => state.user?.loginUser?.notifications)
    }

    if(info){
        return userInfo[info]
    }

    return userInfo;
}

export default useUserInfo