type localUserFile = periodType | periodType[] | null | undefined

type localAccountInputValues = {
    username: string,
    file?: FileList|null
}

interface periodUserDataReturnType{
    cycle: number,
    avgLength: number|undefined
}

interface isActiveReturn{
    startDate: string, 
    endDate: string,
    canBleed: boolean,
    isBleeding: boolean
}
export type {localUserFile, localAccountInputValues, periodUserDataReturnType, isActiveReturn}