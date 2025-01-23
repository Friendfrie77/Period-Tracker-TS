type  periodType = {
    startDate: string,
    endDate: string
};
type previodPeriodType = periodType[]

type reqBodyType = {email?: string, username?: string, password?: string, _id?: string, role?: string};

type localBodyType = periodType[]

export type {previodPeriodType, periodType, reqBodyType, localBodyType}