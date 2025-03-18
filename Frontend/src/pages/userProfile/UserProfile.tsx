import { useState } from "react";
import UserWelcomeBar from "../../components/userWelcomeBar/UserWelcomeBar";
import {Events} from "../../classes/events";
import useUserInfo from "../../hooks/useUserInfo";
import AccountOverview from "./UserOverView";
import AccountMangment from "./AccountMangment";
import DataMangment from "./DataMangment";
// import EventCal from "../../components/eventCal/EventCal";
// import PeriodStatsCard from "../../components/periodStatsCard/PeriodStatsCard";
// import SettingsModal from "../../components/modal/settingsModals/Settings";
// import LocalAccountSettings from "../../components/modal/settingsModals/LocalAccountSettings";
// import PageFade from "../../components/layout/PageFade";

const UserProfile:React.FC = () =>{
    const [settingOpen, setSettingOpen] = useState(false);
    const [displaySection, setDisplaySection] = useState("accountOverview")
    const [localSettingsOpen, setLocalSettingsOpen] = useState(false);
    const openSetting = () =>{
        setSettingOpen(!settingOpen)
    }
    const openLocalSettings = () =>{
        setLocalSettingsOpen(!localSettingsOpen)
    }
    const changeDisplayContent = (section:string) =>{
        setDisplaySection(section)
    }
    const {periodStartDate, periodEndDate, previousPeriod, _id} = useUserInfo();
    console.log(_id)
    const checkUserInfo = () =>{
        console.log('test')
        const events = new Events();
        events.checkForEvents(previousPeriod, periodStartDate, periodEndDate)
        return events.allEvents
    }
    const events = checkUserInfo();
    const content = (
        <main className="content-flex-row">
            <section className="profile-nav-container">
                {/* <button className={` open-symbol ${!settingOpen ? "symbol-closed" : "symbol-open"}`} onClick={openSetting}>&rsaquo;</button> */}
                <div className={` profile-nav ${settingOpen ? "profile-nav-is-open": null}`}>
                    <button onClick={() => changeDisplayContent("accountOverview")}>Overview</button>
                    <h1 className="center-align">Settings</h1>
                    <button onClick={() => changeDisplayContent("accountMangment")}>Account Mangment</button>
                    <button onClick={() => changeDisplayContent("dataMangment")}>Data Mangment</button>
                </div>
            </section>
            <section className={`profile-page-content`}>
                {/* <UserWelcomeBar showDateStrip={false} /> */}
                {displaySection === "accountOverview" && <AccountOverview/>}
                {displaySection === "accountMangment" && <AccountMangment/>}
                {displaySection === "dataMangment" && <DataMangment/>}
            </section>
        </main>
    )
    return content
}

export default UserProfile