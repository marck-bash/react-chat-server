import { useNavigate, Link } from "react-router-dom";
import "./styles/SignUp.css";
import React, { useState } from 'react'

export default function SignIn({ setToken }) {
    const [email, setEmailName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    async function submitSignIn(event) {
        event.preventDefault();
        
        //send username and passwordHash to the backend to be compared
        const response = await fetch("http://localhost:3000/signin", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        
        const body = await response.json();
        if (response.status === 200) {
            //save JWT to Local Storage
            localStorage.setItem("jwt-token", body.token);
            setToken(body.token);
            navigate('/room')
        } else {
            console.log(body.message);
        }
    }
    
  return (
    <form onSubmit={submitSignIn} className="SignUp">
    <h1>Sign In</h1>
    <label>
        <div>Email:</div>
        <input placeholder="Email" onChange={(e) => setEmailName(e.target.value)}></input>
    </label>
    <label>
        <div>Password:</div>
        <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)}></input>
    </label>
    <button type="submit" className="Submit">Log In</button>
    <p>Don't have an account?</p>
    <Link to="/" className="Login">Sign Up</Link>
    </form>
  )
}
