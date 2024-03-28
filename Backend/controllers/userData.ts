import user from "../mongoose-schmea/User.js";
import demoSchema from "../mongoose-schmea/Demo.js";
import dayjs from "dayjs";
import findUser from "../utils/checkUserRole.js"

// type User = typeof user;
// type demo = typeof demoSchema
type  periodType = {
    startDate: string,
    endDate: string
}
type previodPeriodType = periodType[]

//adds new periods to the list of users previous periods.
const addNewPrevPeriods = async(req, res) =>{
    type reqBodyType = {_id:string, role:string, previousPeriods: previodPeriodType}
    const {_id, role, previousPeriods}:reqBodyType = req.body;
    const user = await findUser(role, _id)
    try{
        if(user){
            if(user.previousPeriod.length === 0){
                user.previousPeriod = previousPeriods
            }
        }else{
            res.status(500).json({error: 'Internal error please try again'})
        }
    }catch(err){
        res.status(500).json({error: 'Internal error please try again'})
    }
}

export default {addNewPrevPeriods}