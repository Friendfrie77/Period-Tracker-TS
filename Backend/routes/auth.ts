import auth from "../controllers/auth.js"
import express from "express"

const authRouter = express.Router();

authRouter.post('/login', auth.login);
authRouter.post('/register', auth.register);

export default authRouter