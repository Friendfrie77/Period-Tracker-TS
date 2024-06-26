import { Calendar, dayjsLocalizer, Event } from 'react-big-calendar'
import dayjs from "dayjs";
type EventCalProps ={
    event?: Event[]
}
const EventCal:React.FC<EventCalProps> = ({event}) =>{
    const localizer = dayjsLocalizer(dayjs);

    const eventStyleGetter = (event) =>{
        const currentDate:Date = new Date();
        const backgroundColor = event.end < currentDate ? '#E1BEE7': 'red';
        const style ={
            backgroundColor: backgroundColor,
            opacity: .95,
            color: 'white',
            display: 'block',
            cursor: 'arrow',
        }
        return{
            style,
        }
    }
    return(
        <div className='calander flex-center'>
            <Calendar
                localizer={localizer}
                events={event}
                selectable = {false}
                eventPropGetter={eventStyleGetter}
            />
        </div>
    )
}
export default EventCal