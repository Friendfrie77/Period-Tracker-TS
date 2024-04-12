import Countdown from "../../components/countdown/Countdown"
type HomePageCountdownProps = {
    startDate?: Date|null|undefined,
    endDate?: Date|null|undefined,
    countdownMessage?: string
    headerMessage: string,
    buttonLable: string,
    buttonFunction?: () => void;
}
const HomePageCountdown: React.FC<HomePageCountdownProps> = ({startDate, endDate, headerMessage, buttonLable, buttonFunction, countdownMessage}) =>{
    const content = (
        <div className="flex-center">
            <h2 className="header-text">{headerMessage}</h2>
            <Countdown startDate={startDate} endDate={endDate} message={countdownMessage} color1="40bf32" color2="e0e20c" color3="FA2C00"/>
            <div className="flex-center padding-bottom-1rem">
                <label className="body-text" htmlFor="check-period">{buttonLable}</label>
                <button className="button" name='check-period' onClick={buttonFunction}>Yes</button>
            </div>
        </div>
    )
    return content
}

export default HomePageCountdown