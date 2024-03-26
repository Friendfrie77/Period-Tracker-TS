import Countdown from "../../components/countdown/Countdown";
const NeedInfo = () =>{
    const content = (
        <section className="period-countdown">
            <h2>Error: 2 or more sequential periods needed to track</h2>
            <Countdown message="More logs are required" />
        </section>
    )
    return content;
}

export default NeedInfo