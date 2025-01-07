const APIURL = import.meta.env.VITE_APIURL
import useLoading from "./useLoading";
import { useAppSelector, useAppDispatch} from "./useRedux"
import { setLogin, setLogout, setToken } from "../state/features/users/userSlice";
import useUserInfo from "./useUserInfo";
import { useMessage } from "../context/MessageContext/MessageContext";
import { redirect } from "react-router-dom";
import * as XLSX from "@e965/xlsx";


//https://www.npmjs.com/package/@e965/xlsx
//https://docs.sheetjs.com/docs/api/
const useLocalAccount = () =>{
    
}