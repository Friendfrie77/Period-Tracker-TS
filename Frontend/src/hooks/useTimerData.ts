import { useState } from "react";

const useTimerData = () =>{
    const [timerKey, setTimerKey] = useState(0)
    const daySeconds:number = 86400;
    const todaysDate:number = Date.now() / 1000;

    const getTime = (time:number) => {
        return Math.ceil((time / daySeconds))
    }
    const calStartTime = (startDate:Date) =>{
        const startTime: number = new Date(startDate).getTime() / 1000;
        return startTime;
    }
    const calEndTime = (endDate:Date) =>{
        const endTime: number = new Date(endDate).getTime() / 1000;
        return endTime;
    }

    const calcNeededInfo = (startDate:Date, endDate:Date) =>{
        const startTime = calStartTime(startDate);
        const endTime = calEndTime(endDate);
        const duration = endTime - startTime;
        const remainingTime = Math.ceil(endTime - todaysDate);
        const half = duration / 2;
        const quarter = duration/4
        return {duration, remainingTime, half, quarter}
    }
    return{getTime, calStartTime, timerKey, setTimerKey, todaysDate, calcNeededInfo}
}

export default useTimerData; 