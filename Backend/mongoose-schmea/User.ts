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

userSchema.methods.authPassword = function(password:string, callback){
  bcrypt.compare(password, this.password, function(err, same){
    if(err){
      callback(err)
    }else{
      callback(err, same)
    }
  })
}

userSchema.methods.hashNewPass = function(password:string){
  const newPassword = bcrypt.hash(password, salt);
  return newPassword;
}

// userSchema.methods.sortPrevPeriod = function(user){
//   let sorted = true;
//   for(let i = 0; i < user.previodPeriod.length - 1; i++){
//     if(user.previodPeriod[i][0] > user.previodPeriod)
//   }
// }

const user = model("user", userSchema)
export default user;