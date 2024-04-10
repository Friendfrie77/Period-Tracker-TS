import dayjs from "dayjs";
import type {previodPeriodType} from "../hooks/hooks.types"

export class Event{
    public title: string;
    public start: Date;
    public end: Date;
    public allday: boolean;
    constructor(title: string, start:Date, end:Date, allday:boolean){
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
    newEvent(title:string, start: Date, end:Date, allday:boolean){
        this.events.push(new Event(title, start, end, allday))
    }
    checkForEvents(previodPeriod?:previodPeriodType, periodStartDate?:string|null, periodEndDate?:string|null){
        if(this.events.length === 0){
            previodPeriod?.forEach((period) =>{
                const start = dayjs(period.startDate).toDate();
                const end = dayjs(period.endDate).toDate();
                this.newEvent('Period Was Active', start, end, true)
            })
        } if(periodStartDate && periodEndDate){
            const start = dayjs(periodStartDate).toDate();
            const end = dayjs(periodEndDate).toDate();
            this.newEvent('Period Active', start, end, true)
        }
    }
    get allEvents(){
        return this.events
    }
}