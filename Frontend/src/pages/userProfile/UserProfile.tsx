import { useState } from "react";
import UserWelcomeBar from "../../components/userWelcomeBar/UserWelcomeBar";
import {Events} from "../../classes/events";
import useUserInfo from "../../hooks/useUserInfo";
import EventCal from "../../components/eventCal/EventCal";
import PeriodStatsCard from "../../components/periodStatsCard/PeriodStatsCard";
import SettingsModal from "../../components/modal/settingsModals/Settings";
import PageFade from "../../components/layout/PageFade";
const UserProfile:React.FC = () =>{
    const [settingOpen, setSettingOpen] = useState(false);
    const openSetting = () =>{
        setSettingOpen(!settingOpen)
    }
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
                <h2 className="subheader-text">Here is how your month looks:</h2>
                <EventCal
                event={events}
                />
            </section>
            <PeriodStatsCard />
            <div className="flex-center box-padding flex-row-gap-1rem">
                <button className="button-large">Period Information</button>
                <button onClick={openSetting} className="button-large">Account Settings</button>
            </div>
            {settingOpen &&
                <PageFade> <SettingsModal setSettingOpen={openSetting}/> </PageFade>
            }
        </main>
    )
    return content
}

export default UserProfile