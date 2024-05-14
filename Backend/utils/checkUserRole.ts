import user from "../mongoose-schmea/User.js";
import demoSchema from "../mongoose-schmea/Demo.js";
type User = typeof user;
type Demo = typeof demoSchema

const findUser = async (role: string, id:string) =>{    
    if(role === "User"){
        const foundUser = await user.findById(id)
        return foundUser
    }else{
        const foundUser = await demoSchema.findById(id)
        return foundUser
    }
}

const setRole = (role: string) =>{
    let roleIs;
    if(role === "User"){
        roleIs = user;
    }else{
        roleIs = demoSchema
    }
    return roleIs
}

export default {findUser, setRole}