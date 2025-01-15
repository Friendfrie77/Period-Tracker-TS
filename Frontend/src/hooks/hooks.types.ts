type  periodType = {
    startDate: string,
    endDate: string
}
type previodPeriodType = periodType[] | undefined | null

type localUserFile = [
    {
        startDate: Date,
        endDate: Date
    }
]
export type {previodPeriodType, periodType, localUserFile}