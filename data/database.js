import mongoose from "mongoose";

export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URL,{dbName:'backened_TODO'}).then(()=>{
    console.log("Database is connected")
}).catch((e)=>{
    console.log(e)
})
}
