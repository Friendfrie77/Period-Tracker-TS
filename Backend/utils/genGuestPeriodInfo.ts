import dayjs from "dayjs"

type  periodType = {
    startDate: string,
    endDate: string
}
type guestPeriodInfo = periodType[];
const todaysDate:Date = new Date();
let [cycle, avgLength] = [25, 5];
const addRandomDays = (dayToAdd:number, num:number) =>{
    const numToAdd = Math.floor(Math.random() * num);
    return dayToAdd + numToAdd
}

const genPrevPeriod = (guestPeriodInfo:guestPeriodInfo) =>{
    let lastPeriodStartDate:string, lastPeriodEndDate:string;
    let daysAway = addRandomDays(14, 3);
    daysAway = cycle - daysAway;
    const randomLength = addRandomDays(avgLength, 4);
    const randomCylce = addRandomDays(cycle, 5);
    if(guestPeriodInfo.length === 0){
        lastPeriodStartDate = dayjs(todaysDate).subtract(daysAway, 'days').format('YYYY-MM-DD')
        lastPeriodEndDate = dayjs(lastPeriodStartDate).add(randomLength, 'days').format('YYYY-MM-DD')
    }else{
        const lastArr = guestPeriodInfo[guestPeriodInfo.length - 1]
        lastPeriodStartDate = dayjs(lastArr.endDate).subtract(randomCylce, 'days').format('YYYY-MM-DD')
        lastPeriodEndDate = dayjs(lastPeriodStartDate).add(randomLength, 'days').format('YYYY-MM-DD')
    }
    return {startDate: lastPeriodStartDate, endDate: lastPeriodEndDate}
}

const genAllPeriods = (guestPeriodInfo:guestPeriodInfo, numPeriodsToGen:number) =>{
    if(numPeriodsToGen < 0){
        return guestPeriodInfo;
    }else{
        const periodInfo = genPrevPeriod(guestPeriodInfo);
        guestPeriodInfo.push(periodInfo)
        return genAllPeriods(guestPeriodInfo, numPeriodsToGen - 1)
    }
}

export default genAllPeriods