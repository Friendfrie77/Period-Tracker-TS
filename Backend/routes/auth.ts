import auth from "../controllers/auth.js";
import express from "express";
import veriftyToken from "../middleware/auth.js";

const authRouter = express.Router();

authRouter.post('/login', auth.login);
authRouter.post('/register', auth.register);
authRouter.post('/deleteAccount', veriftyToken, auth.deleteAccount)
authRouter.post('/changePassword',veriftyToken, auth.changePassword)
export default authRouter