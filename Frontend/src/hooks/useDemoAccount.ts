import useLoading from "./useLoading";
import type {previousPeriod} from "../types/types"
const APIURL = import.meta.env.VITE_APIURL
import { setEmailNotifications, setLogin, setToken } from "../state/features/users/userSlice";
import { useAppDispatch} from "./useRedux"
import { useNavigate } from "react-router-dom";
import { useOpenModals } from "./useOpenModals";

type setupDemoAccountValTypes = {
    username: string
}

const useDemoAccount = () =>{
    const navigate = useNavigate();
    const {loading} = useLoading();
    const dispatch = useAppDispatch()
    const {toggleNavCall} = useOpenModals();
    const setupDemoAccount = async(val:setupDemoAccountValTypes, previodPeriod?:previousPeriod) =>{
        loading();
        const username = val.username
        const data = {username, previodPeriod}
        const testAPICall = await fetch((`${APIURL}/demo/setupDemoAccount`),{
            method: 'POST',
            mode: 'cors',
            headers:{
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(data)
        });
        if(testAPICall.ok){
            const userData = await testAPICall.json()
            console.log(userData.accessToken)
            console.log(userData.userData)
            dispatch(setLogin(userData.userData))
            dispatch(setToken(userData.accessToken))
            dispatch(setEmailNotifications({emailNotifications:false}))
            loading();
            toggleNavCall();
            navigate('/')
        }
    }
    return {setupDemoAccount}
}

export default useDemoAccount