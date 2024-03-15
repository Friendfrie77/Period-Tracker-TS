import { Datepicker} from "@meinefinsternis/react-horizontal-date-picker";

type DateStripProps ={
    startDate: string,
    endDate: string,
}
const DateStrip: React.FC<DateStripProps> = ({startDate, endDate}) =>{
    const date : {
        startDate:Date;
        endDate: Date;
        } = {
        startDate : new Date(startDate),
        endDate : new Date(endDate),
    };
    const blankOnchange = () =>{
        
    }
    const datePicker = (
        <div className="horizontal-date-picker">
            <Datepicker
                startValue={date.startDate}
                endValue={date.endDate}
                locale={undefined}
                onChange={blankOnchange}
            />
        </div>
    )
    return datePicker
}
export default DateStrip