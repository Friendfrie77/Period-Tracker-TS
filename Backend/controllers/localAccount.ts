import type {localBodyType} from "./controllers.type.js"
import jwt from 'jsonwebtoken';
import { Response, Request } from "express";

const localAccount = async (req:Request, res:Response):Promise<void> => {
    try{
        // res.status(500).json({message:"Server has encountered an error"})
        res.status(200).json({token:jwt.sign((Math.random()), process.env.ACCESS_TOKEN_SECRET)})
    }catch(err){
        res.status(500).json({message:"Server has encountered an error"})
    }
}

export default {localAccount}