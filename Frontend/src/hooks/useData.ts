import dayjs from "dayjs";
import type {Dayjs} from 'dayjs';
import useUserInfo from "./useUserInfo";
import { useAppDispatch} from "./useRedux"
import {setPeriodCycleLength, setCurrentPeriod, setPrevPeriod} from "../state/features/users/userSlice";
import type {previousPeriod, periodType} from "../types/types";
import type {updateAction, isActiveReturn} from "../types/hooks.types"
import { useMessage } from "../context/MessageContext/MessageContext";
import isBetween from 'dayjs/plugin/isBetween' 
import * as XLSX from "@e965/xlsx";

/* 
Edge Cases:
Active Period is passed in data set
*/
const useData = () =>{
    const APIURL = import.meta.env.VITE_APIURL
    const { setMessageState } = useMessage();
    dayjs.extend(isBetween)
    const dispatch = useAppDispatch()
    const {periodStartDate, periodEndDate, previousPeriod, role, id, token} = useUserInfo();
    type userDataReturn = {
        periodStartDate?: string|Date|undefined,
        periodEndDate?: string|Date|undefined, 
        cycle: number,
        avgLength: number
    }
    const calcNumberPeriods = (data:previousPeriod):number =>{
        if(Array.isArray(data)){
            return data.length
        }
        return 1
    }

    const todaysDate = ():Dayjs =>{
        return dayjs()
    }

    const sortaArrayData = (data:previousPeriod):previousPeriod =>{
        return !Array.isArray(data) ? data : data.map((e:periodType) =>({
            ...e, startDate: dayjs(e.startDate).format('YYYY-MM-DD').toString() ,endDate: dayjs(e.endDate).format('YYYY-MM-DD').toString()
        })).sort((a,b)=>{
            const startDateA = dayjs(a.startDate).isValid() ? dayjs(a.startDate).toDate().getTime() : new Date(a.startDate as string ).getTime()
            const startDateB = dayjs(b.startDate).isValid() ? dayjs(b.startDate).toDate().getTime() : new Date(b.startDate as string).getTime()
            const compareResult = startDateA - startDateB
            a.startDate = dayjs(startDateA).format('YYYY-MM-DD').toString();
            b.startDate = dayjs(startDateB).format('YYYY-MM-DD').toString();
            a.endDate = dayjs(a.endDate).format('YYYY-MM-DD').toString();
            b.endDate = dayjs(b.endDate).format('YYYY-MM-DD').toString();
            return compareResult
        })
    }

    const calcCycle = (data:previousPeriod) =>{
        let cycleCount:number = 0;
        let totalCycle:number = 0;
        let oldStartDate:null|Dayjs = null; 
        if((calcNumberPeriods(data) > 1) && Array.isArray(data)){
            data.forEach(e=>{
                if(oldStartDate == null){
                    oldStartDate = dayjs(e.startDate)
                }else if(Math.abs(dayjs(oldStartDate).diff(e.startDate, 'month', true)) < 1.5){
                    totalCycle += Math.abs(dayjs(e.startDate).diff(oldStartDate, 'day'))
                    cycleCount ++;
                    oldStartDate = dayjs(e.startDate)
                }
            })
        }
        return (Math.round(totalCycle/cycleCount))
    }

    const calcAvgLength = (data:previousPeriod):number =>{
        const count = calcNumberPeriods(data)
        if(data){
            if(count !== 1 && Array.isArray(data) ){
                let numDays:number = 0;
                data.forEach(e => {
                    numDays += (dayjs(e.endDate).diff(dayjs(e.startDate), 'day') + 1)
                });
                return numDays/count
            }
        }
        return 0
    }

    const calcUserData = (data:previousPeriod):userDataReturn|boolean =>{
        if(data.length){
            const sortedData = sortaArrayData(data)
            const cycle = calcCycle(sortedData);
            const avgLength = calcAvgLength(sortedData)
            dispatch(setPeriodCycleLength({cycle: cycle, avgLength: avgLength}))
            const isActive = isPeriodActive(data);
            if(isActive && (typeof isActive !== 'boolean')){
                dispatch(setCurrentPeriod(isActive))
                return true
            }else{
                const estimatedLastPeriod = estimatePeriodDates(sortedData, cycle, avgLength)
                if(typeof estimatedLastPeriod !== 'boolean'){
                    dispatch(setCurrentPeriod(estimatedLastPeriod))
                }
                console.log(estimatedLastPeriod)
            }
            return true
        }else{
            return false
        }
    }

    const isPeriodActive = (data:previousPeriod):isActiveReturn|boolean =>{
        if(data){
            const currentDate = todaysDate()
            if(Array.isArray(data)){
                const lastIndex = calcNumberPeriods(data) - 1
                if(currentDate.isBetween(data[lastIndex].startDate, data[lastIndex].endDate, null, "[]")){
                    return {startDate: data[lastIndex].startDate.toString(), endDate: data[lastIndex].endDate.toString(), canBleed: true, isBleeding: false}
                }
                return false
            }
            return false
        }
        return false
    }

    const estimatePeriodDates = (data:previousPeriod, cycle:number, avgLength:number):isActiveReturn|boolean =>{
        if(Array.isArray(data)){
           let nextPeriodStartDate:Dayjs;
           if((!periodStartDate || !periodEndDate)){
                const lastIndex = calcNumberPeriods(data) - 1;
                const currentDate = todaysDate();
                const lastPeriodStartDate = dayjs(data[lastIndex].startDate);
                const cyclePassed = Math.floor(currentDate.diff(lastPeriodStartDate, 'day') / cycle);
                if(cyclePassed === 0){
                    nextPeriodStartDate = lastPeriodStartDate.add((cycle * (cyclePassed + 1)), 'day')
                    if(nextPeriodStartDate.diff(currentDate, 'day') <= 2){
                        return {startDate: nextPeriodStartDate.format('YYYY-MM-DD'), endDate: nextPeriodStartDate.add(Math.floor(avgLength), 'days').format('YYYY-MM-DD'), canBleed: true, isBleeding: false}
                    }
                    return {startDate: nextPeriodStartDate.format('YYYY-MM-DD'), endDate: nextPeriodStartDate.add(Math.floor(avgLength), 'days').format('YYYY-MM-DD'), canBleed: false, isBleeding: false}
                }else if(cyclePassed > 0){
                    nextPeriodStartDate = lastPeriodStartDate.add((cycle * (cyclePassed + 1)), 'day')
                    return {startDate:nextPeriodStartDate.format('YYYY-MM-DD'), endDate: nextPeriodStartDate.add(Math.floor(avgLength), 'days').format('YYYY-MM-DD'), canBleed: false, isBleeding: false}
                }
                return false
           }
        }
        return false
    }

    const exportData = () =>{
        if(previousPeriod){
            const obs = XLSX.utils.json_to_sheet(previousPeriod)
            const file = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(file, obs, "UserDataExport")
            XLSX.writeFile(file, "UserDataExport.ods")
        }else{
            setMessageState('No previous periods to export', 'error')
            return false
        }
    }

    const updateUsersPeriods = async (newPeriod:previousPeriod, action:updateAction) =>{
        console.log(newPeriod)
        console.log(newPeriod.length)
        if(newPeriod.length === 0 && action == 'update'){
            setMessageState('No new periods to save', 'error')
            return
        }
        if(role != 'User'){
            dispatch(setPrevPeriod(newPeriod))
            setMessageState('Periods saved!', 'success' )
            calcUserData(newPeriod)
            return
        }else{
            const body = {id: id, periodArray: newPeriod}
            const res = await fetch(`${APIURL}/data/updatePeriod`,{
                method:'POST',
                mode: 'cors',
                headers:{
                    Authorization: `Bearer ${token}`,
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(body)
            })
            if(res.status === 201){
                const resData = await res.json()
                dispatch(setPrevPeriod(resData.periods))
                setMessageState(`${resData.message}`, 'success')
                calcUserData(resData.periods)
                return
            }
        }
    }

    const checkForDuplicates = (data:previousPeriod):previousPeriod =>{
        if(previousPeriod){
            const previousPeriodSet = new Set(previousPeriod.map(e => JSON.stringify(e)))
            const filteredUserData = data.filter(dates => !previousPeriodSet.has(JSON.stringify(dates)))
            return filteredUserData
        }
        return data
    }
    return {calcUserData, exportData, updateUsersPeriods, checkForDuplicates, sortaArrayData}
}

export default useData