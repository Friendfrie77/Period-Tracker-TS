import * as mongoose from 'mongoose';

const demoSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
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
});

export default demoSchema