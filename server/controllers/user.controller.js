import validationMiddleware from "../middleware/validationMiddleware.js";
import User from "../models/user.models.js";
import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

//create user endpoint
router.post("/signup", async (request, response) => {
    try {
        //checks to see if user exist
        const doesUserExist = await User.exists({
            email: request.body.email
        });
        if (doesUserExist === null) {
            //has password
            //should be done on the client side not the server
                    // save user to database
                    const user = new User({
                        firstName: request.body.firstName,
                        lastName: request.body.lastName,
                        email: request.body.email,
                        password: request.body.password
                    });
                    await user.save();
                    //sign in user
                    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: 3 * 60 * 60 });

                    response.send({
                        message: "Success",
                        token
                    });
        } else {
            response.send("Username was already taken");
        }

    } catch (err) {
        response.status(500).send({
            message: err.message
        });
    }
});

//verify user token and allow them to sign in
router.post("/signin", async (request, response) => {

const user = await User.findOne({ email: request.body.email })
if(!user) {
    response.status(401).json({message: "The username or password is incorrect"});
}
if(user) {
    bcrypt.compare(request.body.password, user.password, (err, res) => {
        if(res) {
            const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
            response.status(200).json({
                message: "Success",
                token
            })
        } else {
            response.status(401).json({
                message:"The username or password is incorrect"
            })
        }
    })
}
})

//update a user in the database
router.put("/user/:_id", async (request, response) => {
    try {
        const userUpdate = await User.findOneAndUpdate({ _id: request.params._id }, request.body, {new: true} );
        response.send(userUpdate);
    } catch (error) {
        response.status(500).send({
            message: error.message
        });
    }
});

//delete a user from the database
router.delete("/user/:_id", async (request, response) => {
    try {
        const userDelete = await User.deleteOne({ _id: request.params._id });
        response.send(userDelete);
    } catch (error) {
        response.status(500).send({
            message: error.message
        });
    };
});

export default router;