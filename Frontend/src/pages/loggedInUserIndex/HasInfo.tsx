import HomePageCountdown from "../../components/countdown/HomePageCountdown";
import useUserInfo from "../../hooks/useUserInfo";
const HasInfo = () =>{
    const {periodStartDate, periodEndDate, canBleed, isBleeding, cycleStartDate, cycle} = useUserInfo();
    console.log(periodStartDate, cycle)
    const content = (
        <>
            {!canBleed && !isBleeding ?(
                <HomePageCountdown startDate={cycleStartDate} endDate={periodStartDate} headerMessage="Your next period is in" buttonLable="Has your period started?" />
            ) : isBleeding ?(
                <HomePageCountdown startDate={periodStartDate} endDate={periodEndDate} headerMessage="Your period should be over in" buttonLable="Has your period ended?" />
            ) : (
                <HomePageCountdown countdownMessage="Today" headerMessage="Your period might be here" buttonLable="Has your period started?" />
            )}
        </>
    )
    return content
}

export default HasInfo