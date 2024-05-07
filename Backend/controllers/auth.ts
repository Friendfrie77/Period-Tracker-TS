import user from "../mongoose-schmea/User.js";
import demoSchema from "../mongoose-schmea/Demo.js";
import jwt from 'jsonwebtoken'
import findUser from "../utils/checkUserRole.js";
import {reqBodyType} from "./controllers.type.js"
//types for mongoose 
type User = typeof user;
type demo = typeof demoSchema

//Checks user role, returns the mongoose-schmea name needed for that role. 

const login = async (req, res) =>{
    // type reqBodyType = {email: string, password: string}
    const {email, password}: reqBodyType = req.body
    res.status(201).json({message: 'test'})
}

const register = async (req, res) =>{
    // type reqBodyType = {email : string, username: string, password: string};
    const {email, username, password} : reqBodyType = req.body;
    const results = await user.exists({email: email})
    const isNewUser = true
    try{
        if(results){
            res.status(401).json({error: "User already exists"})
        }else{
            const newUser = new user({
                email,
                username,
                password,
                role: "User",
            });
            const userID = {id: newUser._id};
            const accessToken:string = jwt.sign(userID, process.env.ACCESS_TOKEN_SECRET)
            console.log(accessToken)
            newUser.save();
            res.status(201).json({newUser, accessToken, isNewUser})
        }
    }catch(err){
        console.log(err)
    }
}
const deleteAccount = async(req, res) =>{
    const {_id, email, role} : reqBodyType = req.body;
    const foundUser = await findUser(role, _id)
    
}

export default {login, register, deleteAccount}
