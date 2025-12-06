import mongoose from "mongoose";
import User from "./models/user.js";
import { MONGO_URI } from "./config.js";

const test = async() => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("DB connected ");

        const users = await User.find().select("-password ");
        console.log("Users", users);
        
        process.exit();
        
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}
test();
