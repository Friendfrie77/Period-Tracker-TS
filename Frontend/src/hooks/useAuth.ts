//Hook to handle login/logout/reg
import useLoading from "./useLoading";
const APIURL = import.meta.env.VITE_APIURL
import { useAppSelector, useAppDispatch} from "./useRedux"
import { setLogin, setLogout, setToken } from "../state/features/users/userSlice";
import useUserInfo from "./useUserInfo";
import { useMessage } from "../context/MessageContext/MessageContext";
import { redirect } from "react-router-dom";
const useAuth =() =>{
    const dispatch = useAppDispatch()
    const {loading} = useLoading();
    const {token, _id} = useUserInfo();
    const {setMessageState} = useMessage();
    interface loginValuesTypes{
        email?: string, 
        password?: string
    }
    interface registerValuesTypes{
        email?: string,
        username?: string,
        password?: string
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
            console.log(newUser)
            dispatch(setLogin(newUser.newUser))
            dispatch(setToken(newUser.accessToken))
        }
    }
    const logout = () =>{
        dispatch(setLogout())
    }

    const deleteAccount = async(role:string, email?:string) =>{
        loading();
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
    return {login, register, logout, deleteAccount}
}

export default useAuth;