import user from "../mongoose-schmea/User.js";
import demoSchema from "../mongoose-schmea/Demo.js";
import jwt from 'jsonwebtoken';
import checkUserRole from '../utils/checkUserRole.js';
import type {reqBodyType} from "./controllers.type.js";
import type {changePasswordReq} from "../types/auth.types.js";
// import demo from "../mongoose-schmea/Demo.js";
//types for mongoose 
type User = typeof user;
type demo = typeof demoSchema

//Checks user role, returns the mongoose-schmea name needed for that role. 

const login = async (req, res) =>{
    // type reqBodyType = {email: string, password: string}
    const {email, password}: reqBodyType = req.body;
    const loginUser = await user.findOne({email: email})
    if(!loginUser){
        //send error
    }else{
        loginUser.authPassword(password, (err, same) =>{
            if (err){
                return res.status(500).json({error: "Authentication error"});
            }if (same){
                 const accessToken:string = jwt.sign({ id: loginUser._id}, process.env.ACCESS_TOKEN_SECRET)
                 return res.status(201).json({accessToken, user: loginUser})
            }
        })
        
    }
    // return res.status(201).json({message: 'test'})
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
            newUser.save();
            res.status(201).json({newUser, accessToken, isNewUser})
        }
    }catch(err){
        console.log(err)
    }
}

const deleteAccount = async(req, res) =>{
    const {_id, email, role} : reqBodyType = req.body;
    const userRole = checkUserRole.setRole(role)
    // if(userRole === user){
        
    // }
    // userRole.deleteOne({_id: _id}).exec();
    res.status(200).json({message: "User Deleted"})
}

const changePassword = async(req, res) =>{
    const {id, oldPassword, newPassword} : changePasswordReq = req.body;
    const selectedUser = await user.findById(id)
    if(!selectedUser){
        res.status(500)
    }else{
        selectedUser.authPassword(oldPassword, (err,same)=>{
            if(err){
                res.status(500)
            }else if(same){
                const newHash = selectedUser.hashNewPass(newPassword)
                newHash.then((val) =>{
                    selectedUser.password = val
                    selectedUser.save()
                    return res.status(201).json({message: 'Password Changed!'})
                })
            }
        })
    }

}
export default {login, register, deleteAccount, changePassword}
