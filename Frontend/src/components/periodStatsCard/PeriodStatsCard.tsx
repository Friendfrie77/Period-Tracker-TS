import useUserInfo from "../../hooks/useUserInfo"
import dayjs from "dayjs";

const PeriodStatsCard:React.FC = () =>{
    const {previousPeriod, cycle, avgLength, periodStartDate} = useUserInfo();
    const content = (
        <>
        {previousPeriod && cycle && avgLength ?(
            <section className="flex-center stat-card">
                <h3 className="subheader-text">Your period stats:</h3>
                <span>Avarage cycle length: {cycle} days</span>
                <span>Average Length: {Math.floor(avgLength)} days</span>
                <span>Period Logged: {previousPeriod?.length}</span>
                <span>Next Period Start Date: {dayjs(periodStartDate).format('MMMM D')}</span>
            </section>
        ): null}
        </>
    )
    return content; 
}
export default PeriodStatsCard