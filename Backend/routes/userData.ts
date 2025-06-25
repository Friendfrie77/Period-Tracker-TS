import userData from "../controllers/userData.js"
import express from "express"
import veriftyToken from "../middleware/auth.js";

const userDataRouter = express.Router()

userDataRouter.post('/updatePeriod', veriftyToken, userData.updatePeriod)

export default userDataRouter