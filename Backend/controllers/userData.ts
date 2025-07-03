import user from "../mongoose-schmea/User.js";
import demoSchema from "../mongoose-schmea/Demo.js";
import dayjs from "dayjs";
import checkUserRole from "../utils/checkUserRole.js";
import type {previousPeriod} from "../types/types.js";

const updatePeriod = async(req, res) =>{
    const {id, periodArray} = req.body;
    const user = await checkUserRole.findUser('User', id)
    if(!user){
        res.status(500).json({message:"Server has encountered an error"})
    }else{
        user.previousPeriod = periodArray
        await user.save()
        const userSavedPeriods = user.previousPeriod
        return res.status(201).json({message:"Periods saved!", periods: userSavedPeriods })
    }
}

const emailNotification = async(req, res) =>{
    const {id, emailNotifications} = req.body;
    const selectedUser = await user.findById(id)
    if(!selectedUser){
        res.status(500).json({error: 'Server has encountered an error'})
    }else{
        selectedUser.emailNotification = !emailNotifications;
        await selectedUser.save();
        const message = emailNotification ? 'You will now get an email when your period is near.' : 'You are no longer getting emails when your period is near.'
        res.status(201).json({message: message, emailNotifications})
    }
}

const textNotification = async(req, res) =>{
    const {id, userNumber, notifications} = req.body;
    const selectedUser = await user.findById(id);
    if(!selectedUser){
        res.status(500).json({error: 'Server has encountered an error'})
    }else{
        selectedUser.textNotification = !notifications
        if(notifications){
            selectedUser.number = userNumber
        }else{
            selectedUser.number = null;
        }
        await selectedUser.save();
        const message = notifications ? 'You will now get text notifications when your period is near.' : 'You are no longer getting text notifications when your period is near.'
        res.status(201).json({message: message, notifications})
    }
}

export default {updatePeriod, emailNotification, textNotification}