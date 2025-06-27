// const APIURL = import.meta.env.VITE_APIURL
// import useLoading from "./useLoading";
import * as XLSX from "@e965/xlsx";
import { localUserFile, returnType} from "../types/hooks.types";
import { useMessage } from "../context/MessageContext/MessageContext";
import dayjs from "dayjs";
import type { valuesTypes } from "../components/modal/modals.types";
//https://www.npmjs.com/package/@e965/xlsx
//https://docs.sheetjs.com/docs/api/


const useLocalAccount = () =>{
    // const {loading} = useLoading();
    const {setMessageState} = useMessage()
    const createLocalAccount = async (values:valuesTypes):Promise<returnType> =>{
        let userFile = values.file as FileList|File|null
        if(userFile instanceof FileList){
            userFile = userFile[0] 
            const isVaild = validateFile(userFile)
            if(isVaild){
                const isVaildFormat = await parseUserFile(userFile)
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
        const vaildatedUserInfo = validateUserInfo(userInfo)
        return vaildatedUserInfo
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
            const start = data["Start Date"] || data['startDate']
            const end = data["End Date"] || data['endDate']
            if(start && end){
                validatedUserInfo.push({startDate: dayjs(start).format('YYYY-MM-DD').toString(), endDate: dayjs(end).format('YYYY-MM-DD').toString()})
            } 
        })
        if(validatedUserInfo.length === 0){
            return false
        }
        return validatedUserInfo
    }

    
    return {createLocalAccount, parseUserFile, validateFile}
}

export default useLocalAccount
