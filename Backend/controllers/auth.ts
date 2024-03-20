import userSchema from "../mongoose-schmea/User";
import demoSchema from "../mongoose-schmea/Demo";
//types for mongoose 
type user = typeof userSchema;
type demo = typeof demoSchema

//Checks user role, returns the mongoose-schmea name needed for that role. 
const checkUserRole = (role: string): user|demo =>{
    let roleType: user | demo;
    if(role === "User"){
        roleType = userSchema
    }else{
        roleType = demoSchema;
    }
    return roleType;
}