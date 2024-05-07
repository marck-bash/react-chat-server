import { Schema, model } from "mongoose";

const messagesSchema = new Schema({
    when: {
        type: Date,
        default: Date.now
    },
    user: String,
    room: String,
    body: String
});

export default model("Message", messagesSchema);