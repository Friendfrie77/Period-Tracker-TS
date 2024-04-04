import dayjs from "dayjs";
import type {previodPeriodType} from "../hooks/hooks.types"

export class Event{
    public title: string;
    public start: string;
    public end: string;
    public allday: boolean;
    constructor(title: string, start:string, end:string, allday:boolean){
        this.title = title
        this.start = start
        this.end = end
        this.allday = allday
    }
}

export class Events{
    public events: Event[]
    constructor(){
        this.events = []
    }
    newEvent(title:string, start: string, end:string, allday:boolean){
        this.events.push(new Event(title, start, end, allday))
    }
    checkForEvents(previodPeriod?:previodPeriodType, periodStartDate?:string|null, periodEndDate?:string|null){
        if(this.events.length === 0){
            previodPeriod?.forEach((period) =>{
                const start = dayjs(period.startDate).format('YYYY-MM-DD');
                const end = dayjs(period.endDate).format('YYYY-MM-DD');
                this.newEvent('Period Was Active', start, end, true)
            })
        } if(periodStartDate && periodEndDate){
            const start = dayjs(periodStartDate).format('YYYY-MM-DD');
            const end = dayjs(periodEndDate).format('YYYY-MM-DD');
            this.newEvent('Period Active', start, end, true)
        }
    }
    get allEvents(){
        let test =[]
        this.events.forEach(event =>{
            test.push(event)
        })
        return test
    }
}