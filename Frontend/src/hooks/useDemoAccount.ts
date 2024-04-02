import useLoading from "./useLoading";
import { previodPeriodType } from "./hooks.types";
const APIURL = import.meta.env.VITE_APIURL
import { setLogin, setToken } from "../state/features/users/userSlice";
import { useAppDispatch} from "./useRedux"
import { useNavigate } from "react-router-dom";

type setupDemoAccountValTypes = {
    username: string
}

const useDemoAccount = () =>{
    const navigate = useNavigate();
    const {loading} = useLoading();
    const dispatch = useAppDispatch()
    const setupDemoAccount = async(val:setupDemoAccountValTypes, previodPeriod?:previodPeriodType) =>{
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
            dispatch(setLogin(userData.userData))
            dispatch(setToken(userData.accessToken))
            loading();
            navigate('/')
        }
    }
    return {setupDemoAccount}
}

export default useDemoAccount