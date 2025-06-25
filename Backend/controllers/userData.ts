import user from "../mongoose-schmea/User.js";
import demoSchema from "../mongoose-schmea/Demo.js";
import dayjs from "dayjs";
import checkUserRole from "../utils/checkUserRole.js";
import type {previousPeriod} from "../types/types.js";

const updatePeriod = async(req, res) =>{
    const {id, periodArray} = req.body;
    console.log(id, periodArray)
    const user = await checkUserRole.findUser('User', id)
    if(!user){
        res.status(500).json({message:"Server has encountered an error"})
    }else{
        user.previousPeriod = [prev =>[...prev, ...periodArray]]
        await user.save()
        const userSavedPeriods = user.previousPeriod
        return res.status(201).json({message:"Periods saved!", periods: userSavedPeriods })
    }
}

export default {updatePeriod}