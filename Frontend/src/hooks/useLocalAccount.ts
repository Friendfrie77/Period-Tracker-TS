// const APIURL = import.meta.env.VITE_APIURL
// import useLoading from "./useLoading";
// import { useAppSelector, useAppDispatch} from "./useRedux"
// import { setLogin, setLogout, setToken } from "../state/features/users/userSlice";
// import useUserInfo from "./useUserInfo";
// import { useMessage } from "../context/MessageContext/MessageContext";
// import { redirect } from "react-router-dom";
import * as XLSX from "@e965/xlsx";
import { localUserFile } from "./hooks.types";

//https://www.npmjs.com/package/@e965/xlsx
//https://docs.sheetjs.com/docs/api/

type allowedFileTypes = {

}
const useLocalAccount = () =>{
    //handle errors if file isnt formated right, save info, rederect 
    const createLocalAccount = async (userFile:File|null) =>{
        if(userFile){
            const isVaild = validateFile(userFile)
            if(isVaild){
                const userInfo = await parseUserFile(userFile)
                console.log(userInfo)
            }else{
                //return error message
            }
        }
    }
    //need to check if file is formated right
    const parseUserFile = async(userFile:File) =>{
        const userBuffer =  await userFile.arrayBuffer()
        let userInfo = XLSX.read(userBuffer)
        userInfo = userInfo.Sheets[userInfo.SheetNames[0]]
        userInfo = XLSX.utils.sheet_to_json(userInfo)
        return userInfo
    }

    const validateFile = (userFile:File) =>{
        const allowedFiles: string [] =[
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "application/vnd.oasis.opendocument.spreadsheet",
            "application/vnd.ms-excel"
        ]
        if(allowedFiles.includes(userFile.type)){
            return true
        }else{
            return false
        }
    }

    const validateUserInfo = (userInfo:Array<any>) =>{
        if(
            
        )
    }

    return {createLocalAccount}
}

export default useLocalAccount
