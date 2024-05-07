import findUser from "../utils/checkUserRole"
import {previodPeriodType} from "./controllers.type"
import genAllPeriods from "../utils/genGuestPeriodInfo"
import demoModel, {DemoDocument}  from "../mongoose-schmea/Demo.js";
import jwt from 'jsonwebtoken'

const setupDemoAccount = async (req, res) =>{
    type reqBodyType= {username:string, loggedPeriods?:previodPeriodType}
    let {username, loggedPeriods}:reqBodyType = req.body;
    try{
        if(!loggedPeriods){
            loggedPeriods = [];
            loggedPeriods = genAllPeriods(loggedPeriods, 5)
        }
    
        const user:DemoDocument = new demoModel({
            username: username,
            role: "Guest",
            previousPeriod: loggedPeriods
        })
        let userData = user.sendUserInfo(user);
        user.save();
        const userID = {id: user._id}
        userData = {...userData, ...userID}
        const accessToken: string = jwt.sign(userID, process.env.ACCESS_TOKEN_SECRET);
        res.status(201).json({userData, accessToken})
    }catch(err){
        console.log(err)
    }
}

export default {setupDemoAccount}