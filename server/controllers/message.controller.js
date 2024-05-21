import Message from "../models/message.models.js";
import { Router } from "express";
import validationMiddleware from "../middleware/validationMiddleware.js";

const router = Router();

//Added a route to post a new message
router.post("/message/:room", validationMiddleware, async (request, response) => {
    try {
        const message = new Message({
            ...request.body,
            user: request.user._id,
            room: request.params.room,
            body: request.body.body
        });
        console.log(request.body);
        await message.save();
        response.send({
            message: "Succesfully added new message"
        });
    } catch (error) {
        response.status(500).send({
            message: error.message
        });
    };
});

//Display all messages in database
router.get("/message/:room", async (request, response) => {
    try {
        const messageDisplay = await Message.find({});
        response.send(messageDisplay);
    } catch (error) {
        response.status(500).send({
            message: error.message
        });
    }
});

//Update a message in the database
router.put("/message/:_id", async (request, response) => {
    try {
        const messageUpdate = await Message.findOneAndUpdate({ _id: request.params._id }, request.body, {new: true} );
        response.send(messageUpdate);
    } catch (error) {
        response.status(500).send({
            message: error.message
        });
    }
});

//Delete a message in the database
router.delete("/message/:_id", async (request, response) => {
    try {
        const messageDelete = await Message.deleteOne({ _id: request.params._id });
        response.send(messageDelete);
    } catch (error) {
        response.status(500).send({
            message: error.message
        });
    };
});



export default router;