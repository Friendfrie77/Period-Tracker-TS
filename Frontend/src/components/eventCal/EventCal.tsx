import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import dayjs from "dayjs";
type EventCalProps ={
    event: []
}
const EventCal:React.FC<EventCalProps> = ({event}) =>{
    const localizer = dayjsLocalizer(dayjs);
    // const views:string = 'month';
    // console.log(test)
    // console.log(events.event)
    return(
        <div className='profile-cal'>
            <Calendar
                localizer={localizer}
                events={event}
                selectable = {false}
            />
        </div>
    )
}
export default EventCal