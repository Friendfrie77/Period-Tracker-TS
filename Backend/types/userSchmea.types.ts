import { Document } from "mongoose";
import {previousPeriod} from "./types.js"
export interface userInterface extends Document {
    email: string;
    username: string;
    password: string;
    role: string;
    notification: boolean;
    number: string | null;
    cycle: number | null;
    avgLength: number | null;
    periodStartDate: Date | null;
    periodEndDate: Date | null;
    daysTill: number | null;
    canBleed: boolean;
    isBleeding: boolean;
    previousPeriod: previousPeriod|[];

    authPassword(password: string, callback: (err: any, same?: boolean) => void): void;
    hashNewPass(password: string): Promise<string>;
}