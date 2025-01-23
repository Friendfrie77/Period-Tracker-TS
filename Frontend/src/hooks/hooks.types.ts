import { Dayjs } from "dayjs"

type  periodType = {
    startDate: string|Date|Dayjs,
    endDate: string|Date|Dayjs
}
type perviousPeriodType = periodType | periodType[] | null | undefined

type previodPeriodType = periodType[] | undefined | null



// type localUserFile = {
//     startDate: Date,
//     endDate: Date  
// }[];
type localUserFile = periodType | periodType[] | null | undefined

type localAccountInputValues = {
    username: string,
    file?: FileList|null
}

interface periodUserDataReturnType{
    cycle: number,
    avgLength: number|undefined
}
export type {previodPeriodType, periodType, localUserFile, localAccountInputValues, perviousPeriodType, periodUserDataReturnType}