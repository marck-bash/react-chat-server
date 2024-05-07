import express from "express";
import "dotenv/config"
import mongoose from "mongoose";
import router from "./controllers/room.controller.js";
import messageRouter from "./controllers/message.controller.js";
import userRouter from "./controllers/user.controller.js";
import cors from "cors";

//initialize express server
const app = express();
app.use(express.json());
app.use(cors());
app.listen(process.env.SERVER_PORT, () => {
    console.log(`App is now listening on port ${process.env.SERVER_PORT}`)
});

//routes being used
app.use("/", router);
app.use("/", messageRouter);
app.use("/", userRouter);

//create mongoose connection
mongoose.connect(process.env.ATLAS_CONNECTION);
const db = mongoose.connection;

db.once("open", () => {
    console.log("Connected to database.");
});

db.on("error", console.error.bind(console, "connector error:"));

