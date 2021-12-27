import mongoose from "mongoose";
import { ENV } from "./utils";


const mongohandler = () : void => {

    mongoose.connect(ENV("MONGO_URI"));
    mongoose.connection.once("open", () => {
        console.log("Connected to DB");
    });
    mongoose.connection.on("error", () => {
        console.log("Error connecting to DB");
    });

};

export default mongohandler;