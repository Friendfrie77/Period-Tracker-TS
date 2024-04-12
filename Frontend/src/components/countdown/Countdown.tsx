import { useEffect } from "react";
import { CountdownCircleTimer} from "react-countdown-circle-timer";
import useTimerData from "../../hooks/useTimerData";
type CountdownProps = {
    startDate?: Date | null,
    endDate?: Date | null,
    color1: string,
    color2?: string,
    color3?: string,
    message?: string
}

const renderTime = (dimension?:string|null , time?:number|null, message?:string) =>{
    if(dimension && time){
        return(
            <div className="countdown-wrapper">
                <div className="days-left"><span>{time}&nbsp;{dimension}</span></div>
            </div> 
        );
    }else if(message){
        console.log('taaaest')
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
    console.log((getTime(duration-(duration - remainingTime))))
    console.log(`#${color1}`, `#${color2}`, `#${color3}`)
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
        // eslint-disable-next-line
    },[endDate])
    const content = (
        <div className="countdown-timer">
            <CountdownCircleTimer
            {...timerProps}
            key = {timerKey}
            colors = {[`#${color1}`, `#${color2}`, `#${color3}`]}
            colorsTime={[duration, half, quarter]}
            duration={duration}
            initialRemainingTime={remainingTime}
            >
                {({color}) =>(
                    <span style={{color}}>
                        {duration ? (
                            renderTime('days', getTime(duration-(duration - remainingTime)))
                        ):(
                            renderTime(null, null, message)
                        )}
                    </span>
                )}
            </CountdownCircleTimer>
        </div>
    )
    return content
}

export default Countdown