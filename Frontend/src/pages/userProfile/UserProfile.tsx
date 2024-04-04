import UserWelcomeBar from "../../components/userWelcomeBar/UserWelcomeBar";
import {Events} from "../../classes/events";
import useUserInfo from "../../hooks/useUserInfo";
import EventCal from "../../components/eventCal/EventCal";
import useLoading from "../../hooks/useLoading";
import Spinner from "../../components/layout/Spinner";
import { useEffect } from "react";
const UserProfile:React.FC = () =>{
    const {periodStartDate, periodEndDate, previousPeriod} = useUserInfo();
    const checkUserInfo = () =>{
        const events = new Events();
        events.checkForEvents(previousPeriod, periodStartDate, periodEndDate)
        return events.allEvents
    }
    const event = checkUserInfo();
    console.log(event[0])
    const content = (
        <main className="content">
            <UserWelcomeBar showDateStrip={false} />
            <EventCal 
                event = {event}
            />
        </main>
    )
    return content
}

export default UserProfile