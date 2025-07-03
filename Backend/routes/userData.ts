import userData from "../controllers/userData.js"
import express from "express"
import veriftyToken from "../middleware/auth.js";
import user from "../mongoose-schmea/User.js";

const userDataRouter = express.Router()

userDataRouter.post('/updatePeriod', veriftyToken, userData.updatePeriod);
userDataRouter.post('/emailNotification', veriftyToken, userData.emailNotification);
userDataRouter.post('/textNotification', veriftyToken, userData.textNotification);

export default userDataRouter