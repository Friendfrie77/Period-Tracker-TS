// const APIURL = import.meta.env.VITE_APIURL
import useLoading from "./useLoading";
// import { useAppSelector, useAppDispatch} from "./useRedux"
// import useUserInfo from "./useUserInfo";
// import { useMessage } from "../context/MessageContext/MessageContext";
// import { redirect } from "react-router-dom";
import * as XLSX from "@e965/xlsx";
import { localUserFile } from "./hooks.types";
import { useMessage } from "../context/MessageContext/MessageContext";
import type { valuesTypes } from "../components/modal/modals.types";
//https://www.npmjs.com/package/@e965/xlsx
//https://docs.sheetjs.com/docs/api/


const useLocalAccount = () =>{
    const {loading} = useLoading();
    type returnType = {
        isVaild: boolean|undefined,
        hasData: boolean|null|undefined,
        data: localUserFile|null|undefined
    }

    const {setMessageState} = useMessage()

    const createLocalAccount = async (values:valuesTypes):Promise<returnType> =>{
        let userFile = values.file as FileList|File|null
        if(userFile instanceof FileList){
            userFile = userFile[0] 
            const isVaild = validateFile(userFile)
            if(isVaild){
                const userInfo = await parseUserFile(userFile)
                const isVaildFormat = validateUserInfo(userInfo)
                if(!isVaildFormat){
                    setMessageState('Invaild File Format', 'error')
                    return {isVaild: false, hasData: null, data: null}
                }else{
                    setMessageState(null, null)
                    return {isVaild: true, hasData: true ,data: isVaildFormat}
                }
            }else{
                setMessageState('Invalid File', 'error')
                return {isVaild: false, hasData: null, data: null}
            }
        }else{
            return {isVaild: true, hasData: false, data: null}
        }
    }

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

    const validateUserInfo = (userInfo) =>{
        const validatedUserInfo:localUserFile = []; 
        userInfo.forEach((data) =>{
            if(data["Start Date"] && data["End Date"]){
                validatedUserInfo.push({startDate: data["Start Date"], endDate: data["End Date"]})
            } 
        })
        if(validatedUserInfo.length === 0){
            return false
        }
        return validatedUserInfo
    }

    
    return {createLocalAccount}
}

export default useLocalAccount
