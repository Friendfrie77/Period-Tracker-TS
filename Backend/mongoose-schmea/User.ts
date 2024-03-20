import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true
    },
    notification:{
        type: Boolean,
        default: false
    },
    number: String,
    cycle: Number,
    avgLength: Number,
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
})

export default userSchema