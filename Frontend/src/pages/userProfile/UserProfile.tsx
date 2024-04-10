import UserWelcomeBar from "../../components/userWelcomeBar/UserWelcomeBar";
import {Events} from "../../classes/events";
import useUserInfo from "../../hooks/useUserInfo";
import EventCal from "../../components/eventCal/EventCal";
import PeriodStatsCard from "../../components/periodStatsCard/PeriodStatsCard";
const UserProfile:React.FC = () =>{
    const {periodStartDate, periodEndDate, previousPeriod} = useUserInfo();
    const checkUserInfo = () =>{
        const events = new Events();
        events.checkForEvents(previousPeriod, periodStartDate, periodEndDate)
        return events.allEvents
    }
    const events = checkUserInfo();
    const content = (
        <main className="content">
            <UserWelcomeBar showDateStrip={false} />
            <section className="profile-cal">
                <h2 className="subheader-text">Here is how your month looks.</h2>
                <EventCal
                event={events}
                />
            </section>
            <PeriodStatsCard />
        </main>
    )
    return content
}

export default UserProfile