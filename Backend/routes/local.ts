import express from "express";
import localAccount from "../controllers/localAccount.js";

const localRouter = express.Router();

localRouter.post('/localAccountSetup', localAccount.localAccount)

export default localRouter