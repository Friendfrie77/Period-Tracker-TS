import dayjs from "dayjs";
import type {Dayjs} from 'dayjs';
// import useUserInfo from "./useUserInfo";
import { useAppDispatch} from "./useRedux"
import {setPeriodCycleLength} from "../state/features/users/userSlice";
import type {perviousPeriodType} from "./hooks.types";
import isBetween from 'dayjs/plugin/isBetween' 

export const useData = () =>{
    dayjs.extend(isBetween)
    const dispatch = useAppDispatch()
    // const {periodStartDate, periodEndDate} = useUserInfo();
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
            return !Array.isArray(data) ? data : data.sort((a,b)=>{
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
            // console.log(estimatePeriodDates(sortedData, cycle, avgLength))
            const estimatedLastPeriod = estimatePeriodDates(sortedData, cycle, avgLength)
            console.log(sortedData, cycle, avgLength, estimatedLastPeriod)
            // const returnVal:userDataReturn = {...estimatedLastPeriod, cycle, avgLength}
            return true
            // return returnVal
        }
        return false
    }

    // const estimatePeriodDates = (data:perviousPeriodType, cycle:number, avgLength:number) =>{
    //     if(Array.isArray(data)){
    //         //for jest testing atm
    //         const periodStartDate = null
    //         const periodEndDate = null
    //         if((!periodStartDate || !periodEndDate)){
    //             const lastIndex = (calcNumberPeriods(data) - 1)
    //             const currentDate = todaysDate();
    //             const lastPeriodStartDate = dayjs(data[lastIndex].startDate)
    //             const cyclePassed = Math.floor(currentDate.diff(lastPeriodStartDate, 'day') / cycle)
    //             let estimatedLastPeriod = lastPeriodStartDate.add((cycle * cyclePassed), 'day')
    //             console.log("Estimated Last Period: ", estimatedLastPeriod.format('YYYY-MM-DD'))
    //             console.log("Last Period Start Date: ", lastPeriodStartDate.format('YYYY-MM-DD'))
    //             console.log("Cycle Passed: ", cyclePassed)
    //             console.log("Cycle: ", cycle)
    //             console.log("Cycle Passed in days: ", cyclePassed * cycle)
    //             console.log("Is Active: ", estimatedLastPeriod.isBetween(currentDate.subtract(avgLength, 'day') ,currentDate.add(avgLength, 'day')))
    //             console.log("Cycle calc test: ", currentDate.diff(lastPeriodStartDate, 'day'))
    //             console.log("Estimated Date test: ", lastPeriodStartDate.add(Math.floor(cyclePassed), 'month'))
    //             if(estimatedLastPeriod.isBetween(currentDate.subtract(avgLength, 'day'), currentDate.add(avgLength, 'day'))){
    //                 const periodDates =  {periodStartDate: estimatedLastPeriod.format('YYYY-MM-DD'), periodEndDate: estimatedLastPeriod.add(avgLength, 'day').format('YYYY-MM-DD')}
    //                 return periodDates
    //             }else{
    //                 estimatedLastPeriod = lastPeriodStartDate.add(cycle * (cyclePassed + 1), 'day')
    //                 const periodDates =  {periodStartDate: estimatedLastPeriod.format('YYYY-MM-DD'), periodEndDate: estimatedLastPeriod.add(avgLength, 'day').format('YYYY-MM-DD')}
    //                 return periodDates
    //             }
    //             // const test = lastPeriodStartDate.add(cycle * (cyclePassed + 1), 'day')
    //             // console.log(lastPeriodStartDate.add(cycle * (cyclePassed + 1), 'day').format('YYYY-MM-DD'))
    //             // console.log(lastPeriodStartDate.add(cycle * (cyclePassed), 'day').format('YYYY-MM-DD'))
    //             // console.log(estimatedLastPeriod.isBetween(currentDate.subtract(avgLength, 'day'), currentDate.add(avgLength, 'day')))
    //             // console.log(test.isBetween(currentDate.subtract(avgLength, 'day'), currentDate.add(avgLength, 'day')))
    //         }
    //     }
    // }
    const estimatePeriodDates = (data:perviousPeriodType, cycle:number, avgLength:number) =>{
        if(Array.isArray(data)){
            //for jest testing atm
            const periodStartDate = null
            const periodEndDate = null
            if((!periodStartDate || !periodEndDate)){
                const lastIndex = (calcNumberPeriods(data) - 1);
                const currentDate = todaysDate();
                const lastPeriodEndDate = dayjs(data[lastIndex].endDate);
                const cyclePassed = Math.floor(currentDate.diff(lastPeriodEndDate, 'day') / cycle);
                let nextPeriodStartDate = lastPeriodEndDate.add((cycle * (cyclePassed + 1)), 'day')
                //if nextperiodStartDate 
                if(currentDate.isBetween(lastPeriodEndDate, nextPeriodStartDate, null, "[]")){
                    //figure out where in the cycle the date is
                    //from there figure out 1st day of bleeding and last day

                    console.log('test')
                }
                console.log("Estimated Last Period: ", nextPeriodStartDate.format('YYYY-MM-DD'))
                console.log("Last Period End Date: ", lastPeriodEndDate.format('YYYY-MM-DD'))
                console.log("Cycle Passed: ", cyclePassed)
                console.log("Cycle: ", cycle)
                console.log("avg length: ", avgLength)
                console.log("Cycle Passed in days: ", cyclePassed * cycle)
                console.log("Is Active: ", currentDate.isBetween(lastPeriodEndDate, nextPeriodStartDate, null, "[]"))
                // console.log("Cycle calc test: ", currentDate.diff(lastPeriodStartDate, 'day'))
                // console.log("Estimated Date test: ", lastPeriodStartDate.add(Math.floor(cyclePassed), 'month'))
            }
        }
    }

    return {calcUserData}
}
