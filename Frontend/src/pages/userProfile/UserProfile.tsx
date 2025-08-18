import { useEffect, useState } from "react";
import UserWelcomeBar from "../../components/userWelcomeBar/UserWelcomeBar";
import {Events} from "../../classes/events";
import useUserInfo from "../../hooks/useUserInfo";
import AccountOverview from "./UserOverView";
import AccountMangment from "./AccountMangment";
import DataMangment from "./DataMangment";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import useAuth from "../../hooks/useAuth";
// import EventCal from "../../components/eventCal/EventCal";
// import PeriodStatsCard from "../../components/periodStatsCard/PeriodStatsCard";
// import SettingsModal from "../../components/modal/settingsModals/Settings";
// import LocalAccountSettings from "../../components/modal/settingsModals/LocalAccountSettings";
// import PageFade from "../../components/layout/PageFade";

const UserProfile:React.FC = () =>{
    const [settingOpen, setSettingOpen] = useState(false);
    const [mobileChecked, setMobileChecked] = useState(false)
    const [displaySection, setDisplaySection] = useState("accountOverview")
    const [localSettingsOpen, setLocalSettingsOpen] = useState(false);
    // const {logout} = useAuth()
    // logout()
    const openSetting = () =>{
        setSettingOpen(!settingOpen)
    }
    const openLocalSettings = () =>{
        setLocalSettingsOpen(!localSettingsOpen)
    }
    const changeDisplayContent = (section:string) =>{
        if(mobileChecked){
            setMobileChecked(false)
        }
        setDisplaySection(section)
    }
    const {periodStartDate, periodEndDate, previousPeriod, id} = useUserInfo();
    const checkUserInfo = () =>{
        const events = new Events();
        events.checkForEvents(previousPeriod, periodStartDate, periodEndDate)
        return events.allEvents
    }
    useEffect(() =>{
        const checkbox = document.getElementById("profile-mobile-checkbox") as HTMLInputElement
        const test = () =>{
            console.log(checkbox.checked)
        }
        checkbox.addEventListener("change", test)
    })
    console.log(periodStartDate)
    const events = checkUserInfo();
    const content = (
        <>
        <title>Account Overview</title>
        <main className="content-flex-row position-rel">
            <section className={`profile-nav-container ${mobileChecked ? `profile-nav-container-active` : ''}`}>
                <div className="profile-mobile-check">
                    <input id = 'profile-mobile-checkbox' type='checkbox' checked={mobileChecked} onChange={(e) => setMobileChecked(e.target.checked)} />
                    <label className="profile-checkbox-lable" htmlFor="profile-mobile-checkbox">
                        <FaArrowRightFromBracket/>
                    </label>
                </div>
                <div className="profile-nav">
                    <button className="button button-profile" onClick={() => changeDisplayContent("accountOverview")}> Account Overview</button>
                    <div className="flex-center flex-row-gap-1rem">
                        <h1 className="center-align">Settings</h1>
                        <button className="button button-profile" onClick={() => changeDisplayContent("accountMangment")}>Account Mangment</button>
                        <button className="button button-profile" onClick={() => changeDisplayContent("dataMangment")}>Data Mangment</button>
                    </div>
                </div>
            </section>
            <section className={`profile-page-content`}>
                {/* <UserWelcomeBar showDateStrip={false} /> */}
                {displaySection === "accountOverview" && <AccountOverview/>}
                {displaySection === "accountMangment" && <AccountMangment/>}
                {displaySection === "dataMangment" && <DataMangment/>}
            </section>
        </main>
        </>
    )
    return content
}

export default UserProfile