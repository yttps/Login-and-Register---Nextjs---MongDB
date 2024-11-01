import mongoose from "mongoose";

export const connectMongoDB = async () => {

    try {
        
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB success");
    
    } catch (error) {
        console.log(error);
    }

}