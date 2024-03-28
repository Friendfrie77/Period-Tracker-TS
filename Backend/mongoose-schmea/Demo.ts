import {Document, Schema, model} from "mongoose";

const demoSchema = new Schema({
    username: {
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
    number: {
      type: String,
      default: null
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

const demo = model("demo", demoSchema)
export default demo;