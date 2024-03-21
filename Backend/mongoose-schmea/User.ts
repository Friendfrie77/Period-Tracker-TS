import {Document, Schema, model} from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
const salt = bcrypt.genSaltSync(parseInt(process.env.BCRPTY_SALT));

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
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
})

userSchema.pre("save", function(next){
  if(this.isNew || this.isModified("password")){
    const document = this;
    bcrypt.hash(this.password, salt, function(err, hashedPassword){
      if (err){
        next(err);
      }else{
        document.password = hashedPassword;
        next()
      }
    })
  }else{
    next();
  }
})

const user = model("user", userSchema)
export default user;