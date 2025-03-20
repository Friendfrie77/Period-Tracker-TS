//Hook to handle login/logout/reg
import useLoading from "./useLoading";
const APIURL = import.meta.env.VITE_APIURL
import {useAppDispatch} from "./useRedux"
import { setEmailNotifications, setLogin, setLogout, setToken} from "../state/features/users/userSlice";
import type { user } from "../state/features/users/userSlice";
import useUserInfo from "./useUserInfo";
import { useMessage } from "../context/MessageContext/MessageContext";
import { redirect } from "react-router-dom";
import type { valuesTypes } from "../components/modal/modals.types";
import { perviousPeriodType } from "./hooks.types";

const useAuth =() =>{
    const dispatch = useAppDispatch()
    const {loading} = useLoading();
    const {token, _id} = useUserInfo();
    const {setMessageState, message} = useMessage();
    interface loginValuesTypes{
        email?: string, 
        password?: string
    }
    interface registerValuesTypes{
        email?: string,
        username?: string,
        password?: string
    }

    const isAuth = () =>{
        if(token){
            return true
        }
        return false
    }
    const login = async (values:loginValuesTypes) =>{
        loading()
        const {email, password} = values;
        const data = {email, password}
        const test = await fetch('http://localhost:8080/auth/login',{
            method: 'POST',
            mode: "cors",
            headers:{
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(data)
        });
        const res = await test;
        if(res.status == 201){
            loading();
        }
    }
    //need to handle if not ok
    const register = async (values:registerValuesTypes) =>{
        loading()
        const {email, username, password} = values;
        const data = {email, username, password};
        const regAPICall = await fetch(`${APIURL}/auth/register`,{
            method: 'Post',
            mode: "cors",
            headers:{
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(data)
        })
        if(regAPICall.ok){
            const newUser = await regAPICall.json();
            dispatch(setLogin(newUser.newUser))
            dispatch(setToken(newUser.accessToken))
        }
    }
    
    const localAccount = async (values:valuesTypes) =>{
        loading()
        if(values.username){
            const localUser:user = {
                username: values.username,
                token: 'isLocalUser',
                role: 'local',
                email: 'localUser',
                id: 'localUser'
            }
            dispatch(setLogin(localUser))
            loading()
            return localUser.token
        }else{
            setMessageState('An Error Has Occurred', 'error')
            loading();
            return false
        }
    }
    const updateUsersPeriods = (previousPeriod:perviousPeriodType) =>{
        console.log(previousPeriod)
    }

    const logout = () =>{
        if(_id === 'localUser'){
            /* set modal to warn user that data will be deleted.
            
            */
            dispatch(setLogout())
        }else{
            dispatch(setLogout())
        }
    }
    const userPhoneNotfication = async () =>{
        setMessageState('test', 'success');
    }

    const userEmailNotfications = async (emailNotifications:boolean|undefined) =>{
        console.log(emailNotifications)
        dispatch(setEmailNotifications({emailNotifications: !emailNotifications}))
    }
    const deleteAccount = async(role:string, email?:string) =>{
        loading();
        if(role == 'localAccount'){
            dispatch(setLogout())
        }else{
            const data={_id, role, email}
            const deleteAccountAPICall = await fetch(`${APIURL}/auth/deleteAccount`,{
                method: 'Post',
                mode: 'cors',
                headers:{Authorization: `Bearer ${token}`,
                "Content-Type": 'application/json'},
                body: JSON.stringify(data)
            });
            const res = await deleteAccountAPICall.json();
            if(deleteAccountAPICall.ok){
                setMessageState(res.message, 'success')
                dispatch(setLogout())
                redirect('/')
                loading();
            }else{
                setMessageState(res.message, 'error')
                loading();
            }
        }
    }
    return {login, register, logout, deleteAccount, userPhoneNotfication, localAccount, isAuth, updateUsersPeriods, userEmailNotfications}
}

export default useAuth;