import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();

const veriftyToken = async (req, res, next) =>{
    try{
        let token:string = req.header('Authorization');
        if(!token){
            return res.status(403).json({message:'Access Denied'});
        }
        if(token.startsWith("Bearer ")){
            token = token.slice(7, token.length).trimStart()
        }
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = verified;
        next();
    }catch(error){
        res.status(500).json({error : error.message})
    }
}

export default veriftyToken