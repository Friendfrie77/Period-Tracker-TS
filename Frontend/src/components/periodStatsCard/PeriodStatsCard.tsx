import useUserInfo from "../../hooks/useUserInfo"

const PeriodStatsCard:React.FC = () =>{
    const {previousPeriod, cycle, avgLength} = useUserInfo();
    const content = (
        <>
        {previousPeriod && cycle && avgLength ?(
            <section className="flex-center stat-card">
                <h3 className="subheader-text">Your period stats:</h3>
                <span>Avarage cycle length: {cycle} days</span>
                <span>Average Length: {avgLength} days</span>
                <span>Period Logged: {previousPeriod?.length}</span>
            </section>
        ): null}
        </>
    )
    return content; 
}
export default PeriodStatsCard