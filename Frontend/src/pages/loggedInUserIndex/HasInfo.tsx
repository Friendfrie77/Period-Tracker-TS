import HomePageCountdown from "../../components/countdown/HomePageCountdown";
import useUserInfo from "../../hooks/useUserInfo";
import dayjs from "dayjs";
const HasInfo = () =>{
    const {periodStartDate, periodEndDate, canBleed, isBleeding, cycleStartDate} = useUserInfo();
    const content = (
        <>
            {!canBleed && !isBleeding ?(
                <HomePageCountdown startDate={dayjs(cycleStartDate).toDate()} endDate={dayjs(periodStartDate).toDate()} headerMessage="Your next period is in" buttonLable="Has your period started?" />
            ) : isBleeding ?(
                <HomePageCountdown startDate={dayjs(periodStartDate).toDate()} endDate={dayjs(periodEndDate).toDate()} headerMessage="Your period should be over in" buttonLable="Has your period ended?" />
            ) : (
                <HomePageCountdown countdownMessage="Today" headerMessage="Your period might be here" buttonLable="Has your period started?" />
            )}
        </>
    )
    return content
}

export default HasInfo