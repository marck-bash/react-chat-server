import "./styles/SignUp.css";
import React, { useState } from 'react';
import { hash } from "bcryptjs";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp({ setToken }) {
    // set up a useState event that will allow us to collect the user input and change hold our variable based off what is typed in
    const [email, setEmailName] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const navigate = useNavigate();
    
    function submitSignUp(event) {
        //this stops the page from reloading when a user has signed up
        event.preventDefault();
        
        //hash takes in the password from our useState, adds 10 salt rounds, and then the function to hash the password
        hash(password, 10, async (err, passwordHash) => {
            if (err) {
                console.log(err);
            } else {
                const response = await fetch("http://localhost:3000/signup", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        firstName,
                        lastName,
                        email,
                        password: passwordHash
                    })
                })
                console.log(response);
                //create a variable called body to hold the responses we get from the back end converts the response to json so we can read it
                const body = await response.json();
                if (response.status === 200) {
                    //save jwt to local storage using setItem method
                    localStorage.setItem("jwt-token", body.token);
                    setToken(body.token);
                    navigate('/room');
                } else {
                    console.log(body.message);
                }
            }
        })
    }
    
  return (
    <form onSubmit={submitSignUp} className="SignUp">
        <h1>Sign Up</h1>
        <label>
            <div>Email:</div>
            <input placeholder="Email" onChange={(e) => setEmailName(e.target.value)}></input>
        </label>
        <label>
            <div>First Name:</div>
            <input placeholder="First Name" onChange={(e) => setFirstName(e.target.value)}></input>
        </label>
        <label>
            <div>Last Name:</div>
            <input placeholder="Last Name" onChange={(e) => setLastName(e.target.value)}></input>
        </label>
        <label>
            <div>Password:</div>
            <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)}></input>
        </label>
        <button type="submit" className="Submit">Sign Up</button>
        <p>Already have an Account?</p>
        <Link to="/signin" className="Login">Login</Link>
    </form>
  )
}
