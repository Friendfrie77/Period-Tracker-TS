import express from "express"
import dotenv from "dotenv";
import authRouter from "../routes/auth.js"
import userDataRouter from "../routes/userData.js"
import demoRouter from "../routes/demo.js"
import cors from "cors";
import bodyParser from "body-parser"
import corsOptions from "../config/corsOptions.js"
import dbCon from "../config/dbCon.js"
import genAllPeriods from "../utils/genGuestPeriodInfo.js"

const app = express();
dotenv.config();
const port = process.env.PORT
dbCon();
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use('/auth', authRouter);
app.use('/data', userDataRouter)
app.use('/demo', demoRouter)

app.listen(port, ()=>{
    console.log(`Listening at http://localhost:${port}`)
})
