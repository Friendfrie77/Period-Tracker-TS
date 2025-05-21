import dayjs from "dayjs";
import type {Dayjs} from 'dayjs';
import useUserInfo from "./useUserInfo";
import { useAppDispatch} from "./useRedux"
import {setPeriodCycleLength, setCurrentPeriod} from "../state/features/users/userSlice";
import type {perviousPeriodType, isActiveReturn} from "./hooks.types";
import { useMessage } from "../context/MessageContext/MessageContext";
import isBetween from 'dayjs/plugin/isBetween' 
import * as XLSX from "@e965/xlsx";

/* 
Edge Cases:
Active Period is passed in data set
*/
const useData = () =>{
    const { setMessageState } = useMessage();
    dayjs.extend(isBetween)
    const dispatch = useAppDispatch()
    const {periodStartDate, periodEndDate, previousPeriod} = useUserInfo();
    type userDataReturn = {
        periodStartDate?: string|Date|undefined,
        periodEndDate?: string|Date|undefined, 
        cycle: number,
        avgLength: number
    }
    const calcNumberPeriods = (data:perviousPeriodType):number =>{
        if(Array.isArray(data)){
            return data.length
        }
        return 1
    }

    const todaysDate = ():Dayjs =>{
        return dayjs()
    }

    const sortaArrayData = (data:perviousPeriodType):perviousPeriodType =>{
        if(data){
            return !Array.isArray(data) ? data : data.map(e =>({
                ...e, startDate: dayjs(e.startDate).format('YYYY/MM/DD'),endDate: dayjs(e.endDate).format('YYYY/MM/DD')
            })).sort((a,b)=>{
                const startDateA = dayjs(a.startDate).isValid() ? dayjs(a.startDate).toDate().getTime() : new Date(a.startDate as string ).getTime()
                const startDateB = dayjs(b.startDate).isValid() ? dayjs(b.startDate).toDate().getTime() : new Date(b.startDate as string).getTime()
                const compareResult = startDateA - startDateB
                a.startDate = dayjs(startDateA).format('YYYY/MM/DD');
                b.startDate = dayjs(startDateB).format('YYYY/MM/DD');
                a.endDate = dayjs(a.endDate).format('YYYY/MM/DD');
                b.endDate = dayjs(b.endDate).format('YYYY/MM/DD');
                return compareResult
            })
        }
    }

    const calcCycle = (data:perviousPeriodType) =>{
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

    const calcAvgLength = (data:perviousPeriodType):number =>{
        const count = calcNumberPeriods(data)
        if(data){
            if(count !== 1 && Array.isArray(data) ){
                let numDays:number = 0;
                data.forEach(e => {
                    numDays += (dayjs(e.endDate).diff(dayjs(e.startDate), 'day') + 1)
                });
                return numDays/count
            }else if(!Array.isArray(data)){
                return dayjs(data.endDate).diff(dayjs(data.startDate), 'day') + 1
            }
        }
        return 0
    }

    const calcUserData = (data:perviousPeriodType):userDataReturn|boolean =>{
        if(data && (Array.isArray(data) ? data.length > 0 : data.startDate && data.endDate)){
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
        }
        //if statement if if not array
        return false
    }

    const isPeriodActive = (data:perviousPeriodType):isActiveReturn|boolean =>{
        if(data){
            const currentDate = todaysDate()
            if(Array.isArray(data)){
                const lastIndex = calcNumberPeriods(data) - 1
                if(currentDate.isBetween(data[lastIndex].startDate, data[lastIndex].endDate, null, "[]")){
                    return {startDate: data[lastIndex].startDate.toString(), endDate: data[lastIndex].endDate.toString(), canBleed: true, isBleeding: false}
                }
                return false
            }else if(currentDate.isBetween(data.startDate, data.endDate, null, "[]")){
                return{startDate: data.startDate.toString(), endDate: data.endDate.toString(), canBleed: true, isBleeding: false}
            }
            return false
        }
        return false
    }

    const estimatePeriodDates = (data:perviousPeriodType, cycle:number, avgLength:number):isActiveReturn|boolean =>{
        if(Array.isArray(data)){
           let nextPeriodStartDate:Dayjs;
           if((!periodStartDate || !periodEndDate)){
                const lastIndex = calcNumberPeriods(data) - 1;
                const currentDate = todaysDate();
                const lastPeriodStartDate = dayjs(data[lastIndex].startDate);
                const cyclePassed = Math.floor(currentDate.diff(lastPeriodStartDate, 'day') / cycle);
                // console.log("Last Period Start Date: ", lastPeriodStartDate.format('YYYY-MM-DD'))
                // console.log("Last Period End Date: ", lastPeriodStartDate.format('YYYY-MM-DD'))
                console.log("Cycle Passed: ", cyclePassed)
                // console.log("Cycle Passed in days: ", cyclePassed * cycle)
                // console.log("Cycle: ", cycle)
                // console.log("avg length: ", avgLength)
                // console.log("Is Active: ", nextPeriodStartDate.isBetween(lastPeriodEndDate, currentDate, null, "[]"))
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
    return {calcUserData, exportData}
}

export default useData