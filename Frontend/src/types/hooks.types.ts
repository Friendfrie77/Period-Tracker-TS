import type {periodType} from "./types";

export type localUserFile = periodType | periodType[] | null | undefined;

export type updateAction = 'update'| 'delete' | 'file';

export type isActiveReturn = {
    startDate: string, 
    endDate: string,
    canBleed: boolean,
    isBleeding: boolean
}

export type returnType = {
        isVaild: boolean|undefined,
        hasData: boolean|null|undefined,
        data: localUserFile|null|undefined
    }