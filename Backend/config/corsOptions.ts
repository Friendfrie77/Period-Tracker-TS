import allowedOrigins from "./allowedOrigins.js";

interface corsOptions {
    origin: (origin: string, callback: (err: Error | null, allow?:boolean) =>void) =>void;
    optionsSuccessStatus: number;
}

const corsOptions :corsOptions = {
    origin: (origin, callback) =>{
        if(allowedOrigins.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        }else{
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus : 200
}
export default corsOptions;