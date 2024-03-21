import mongoose from 'mongoose';

async function dbCon() {
    try{
        await mongoose.connect(process.env.dburi),{
            useUnifiedTopology: true,
            useNewUrlParser: true
        }
        console.log('Connected to db')
    }catch (error){
      console.error(error);
    }
}

export default dbCon