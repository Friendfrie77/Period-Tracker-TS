import {Document, Schema, model, InferSchemaType} from "mongoose";
import dayjs from "dayjs";
const demoSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true
    },
    cycle: {
      type: Number,
      default: null
    },
    avgLength:{
      type: Number,
      default: null
    },
    periodStartDate: {
      type: Date,
      default: null,
    },
    periodEndDate: {
      type: Date,
      default: null,
    },
    daysTill: {
      type: Number,
      default: null,
    },
    canBleed: {
      type: Boolean,
      default: false,
    },
    isBleeding: {
      type: Boolean,
      default: false,
    },
    previousPeriod: {
      type: Array,
      default: [],
    },
});

interface DemoDocument extends Document {
  username: string;
  role: string;
  cycle: number;
  avgLength: number;
  periodStartDate: Date;
  periodEndDate: Date;
  daysTill: number;
  canBleed: boolean;
  isBleeding: boolean;
  previousPeriod: any[];
  calcAvgLength(): void;
  estimateDate(): void;
  daysTillBlood(): void;
  sendUserInfo(user: DemoDocument): userType;
  calcCycleInfo(user: DemoDocument): void;
}
type userType = InferSchemaType<typeof demoSchema>;

demoSchema.methods.sortPrevPeriod = function(this:userType){
  let sorted = true
  for(let i = 0; i < this.previousPeriod.length -1; i++){
    if(this.previousPeriod[i][0] > this.previousPeriod[i + 1 ][0]){
      sorted = false;
      break;
    }
  }
  if(!sorted){
     const sortedPeriod = this.previousPeriod.sort((a,b) => a[0] - b[0]);
     this.previousPeriod = sortedPeriod;
  }
}

demoSchema.methods.calcAvgLength = function (this:userType) {
  this.cycle = 0;
  this.avgLength = 0;
  if (this.previousPeriod.length <= 1) {
    return false;
  } else {
    let totalDays = 0;
    let totalCycle = 0;
    let oldStartDate = null;
    let cycleCount = 0;
    this.previousPeriod.forEach((date) => {
      totalDays += dayjs(date.endDate).diff(date.startDate, "days");
      if (oldStartDate != null) {
        const monthDif = dayjs(oldStartDate).diff(date.startDate, "month", true);
        if (Math.abs(monthDif) < 1.5) {
          totalCycle += Math.abs(dayjs(date.startDate).diff(oldStartDate, "days"));
          cycleCount += 1;
        }
      } else {
        oldStartDate = dayjs(date.startDate);
      }
    });
    const avgLength = Math.round(totalDays / this.previousPeriod.length);
    console.log(avgLength)
    if(cycleCount > 0 && totalCycle > 0){
      const cycle = Math.round(totalCycle / cycleCount);
      this.cycle = cycle;
      this.avgLength = avgLength;
    }else{
      this.avgLength = avgLength;
    }
  }
};

demoSchema.methods.estimateDate = function (this:userType) {
  if (this.previousPeriod.length > 0) {
    let lastPeriod, startDate, endDate;
    let todaysDate = new Date();
    if (!this.periodStartDate || !this.periodEndDate) {
      this.previousPeriod.forEach((date) => {
        if (lastPeriod === null) {
          lastPeriod = date.startDate;
        } else if (lastPeriod < date.startDate) {
          lastPeriod = date.startDate;
        }
      });
      const monthDif = dayjs(todaysDate).diff(lastPeriod, "month");
      if (monthDif > 1) {
        const estimateLastPeriod = dayjs(lastPeriod).add(monthDif, "months");
        startDate = dayjs(estimateLastPeriod).add(this.cycle, "days");
        endDate = dayjs(startDate).add(this.avgLength, "days");
      } else {
        lastPeriod = dayjs(lastPeriod);
        startDate = dayjs(lastPeriod).add(this.cycle, "days");
        endDate = dayjs(startDate).add(this.avgLength, "days");
      }
      this.periodStartDate = startDate.format('YYYY-MM-DD');
      this.periodEndDate = endDate.format('YYYY-MM-DD');
    }
  } else {
    return false;
  }
};

//checking if user period is less than x days from period
demoSchema.methods.daysTillBlood = function (this:userType) {
  if (this.periodStartDate) {
    let daysTill;
    const todaysDate = new Date();
    daysTill = dayjs(this.periodStartDate).diff(todaysDate, "days");
    this.daysTill = daysTill;
  } else {
    return false;
  }
};


//sending user infor after login
demoSchema.methods.sendUserInfo = function (user:DemoDocument) {
  if(user.avgLength || user.cycle || user.periodStartDate || user.daysTill === null){
    user.calcCycleInfo(user)
  }
  const userInfo:userType = {
    username: this.username,
    cycle: this.cycle,
    role: this.role,
    avgLength: this.avgLength,
    periodStartDate: this.periodStartDate,
    periodEndDate: this.periodEndDate,
    daysTill: this.daysTill,
    canBleed: this.canBleed,
    isBleeding: this.isBleeding,
    previousPeriod: this.previousPeriod,
  };
  return userInfo;
};
//Updates cycle info on change of info
demoSchema.methods.calcCycleInfo = function (user: DemoDocument){
  user.calcAvgLength();
  user.estimateDate();
  user.daysTillBlood();
  const periodInfo = {
    avgLength: this.avgLength,
    cycle: this.cycle,
    periodStartDate: this.periodStartDate,
    periodEndDate: this.periodEndDate,
    daysTill: this.daysTill
  }
  return periodInfo;
}


const demo = model<DemoDocument>("demo", demoSchema)
export default demo;
export {DemoDocument};