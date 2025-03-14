import EventCal from "../../components/eventCal/EventCal";
import {Events} from "../../classes/events";
import useUserInfo from "../../hooks/useUserInfo";
import PeriodStatsCard from "../../components/periodStatsCard/PeriodStatsCard";

const AccountOverview : React.FC = () =>{
    const {periodStartDate, periodEndDate, previousPeriod} = useUserInfo();
        const checkUserInfo = () =>{
            console.log('test')
            const events = new Events();
            events.checkForEvents(previousPeriod, periodStartDate, periodEndDate)
            return events.allEvents
        }
        const events = checkUserInfo();
    console.log(events)
    const content = (
        <>
            <h2 className="subheader-text">Here is how your month looks</h2>
            <div className="flex-center test-div">
                <EventCal event={events} />
                <PeriodStatsCard />
            </div>
        </>
    )
    return content
}
export default AccountOverview