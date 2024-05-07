import Room from "../models/room.models.js";
import { Router } from "express";

const router = Router();

//create a room
router.post("/room", async (request, response) => {
    try {
        const room = new Room({
            name: request.body.name,
            description: request.body.description,
            addedUsers: request.body.addedUsers
        });
        await room.save();
        response.send({
            message: "Succesfully added new room."
        })
    } catch (error) {
        response.status(500).send({
            message: error.message
        });
    }
});

//display all documents in the Rooms collection
router.get("/room", async (request, response) => {
    try {
        const allRooms = await Room.find({});
        response.send(allRooms)
    } catch (error) {
        response.status(500).send({
            message: error.message
        })
    }
});

//update room in the database
router.put("/room/:_id", async (request, response) => {
    try {
        const roomUpdate = await Room.findOneAndUpdate({ _id: request.params._id }, request.body, {new: true} );
        response.send(roomUpdate);
    } catch (error) {
        response.status(500).send({
            message: error.message
        });
    }
});

//delete a room from the database
router.delete("/room/:_id", async (request, response) => {
    try {
        const roomDelete = await Room.deleteOne({ _id: request.params._id });
        response.send(roomDelete);
    } catch (error) {
        response.status(500).send({
            message: error.message
        });
    };
});

export default router;