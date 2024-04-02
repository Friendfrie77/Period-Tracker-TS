import demoData from "../controllers/demoData";
import express from "express"

const demoRouter = express.Router();

demoRouter.post('/setupDemoAccount', demoData.setupDemoAccount);

export default demoRouter