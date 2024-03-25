import { useEffect } from "react";
import { CountdownCircleTimer} from "react-countdown-circle-timer";
import useTimerData from "../../hooks/useTimerData";
type CountdownProps = {
    startDate?: Date,
    endDate?: Date,
    color1?: string,
    color2?: string,
    color3?: string,
    message?: string
}

const renderTime = (dimension?:string, time?:number, message?:string) =>{
    if(dimension && time)
    return(
        <div className="countdown-wrapper">
            <div className="days-left"><span>{time}&nbsp;{dimension}</span></div>
        </div> 
    );
    else{
        return(
            <div className='countdown-wrapper'>
                <div className='days-left'><span>{message}</span></div>
            </div>
        )
    }
}
const Countdown: React.FC<CountdownProps> = ({startDate, endDate, color1, color2, color3, message}) =>{
    const {calcNeededInfo, timerKey, setTimerKey, getTime} = useTimerData();

    const neededInfo = () =>{
        if(startDate && endDate){
            const {duration, remainingTime, half, quarter} = calcNeededInfo(startDate, endDate)
            return{duration, remainingTime, half, quarter}
        }else{
            return {duration : 0 , remainingTime : 0, half: 0, quarter: 0 }
        }
    }
    const {duration, remainingTime, half, quarter} = neededInfo();
    console.log(remainingTime, duration)
    const timerProps: {
        isPlaying: boolean,
        size: number,
        strokeWidth: number,
        }={
        isPlaying: true,
        size: 500,
        strokeWidth: 10,
    }
    useEffect(() =>{
        setTimerKey(prev => prev + 1)
    },[endDate])
    const content = (
        <div className="countdown-timer">
            <CountdownCircleTimer
            {...timerProps}
            key = {timerKey}
            colors={                
            "#9000ff"}
            duration={duration}
            initialRemainingTime={remainingTime}
            >
                {({color}) =>(
                    <span style={{color}}>
                        {duration ? (
                            renderTime('days', getTime(duration-(duration - remainingTime)))
                        ):(
                            renderTime(message)
                        )}
                    </span>
                )}
            </CountdownCircleTimer>
        </div>
    )
    return content
}

export default Countdown