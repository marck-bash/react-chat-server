import { Schema, model } from "mongoose";

const roomsSchema = new Schema({
    name: String,
    description: String,
    addedUsers: Array
});

export default model("Room", roomsSchema);