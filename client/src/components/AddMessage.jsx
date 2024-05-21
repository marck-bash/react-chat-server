import React, { useState } from 'react'
import "./styles/AddRoom.css"
import { useParams } from 'react-router-dom';

export default function AddMessage({ token }) {
    const [body, setBody] = useState();
    //using useParams hook to collect the params that are getting in our fetch request
    let { room } = useParams();
    
    async function submitMessage(event) {
        //stops page from refreshing when submitting a message
        event.preventDefault();
        
        //fetch request, /${room} is being stored as a variable for useParams hook, it is the ID number of the particular room we are inside of
        const response = await fetch(`http://localhost:3000/message/${room}`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "authorization": token
            },
            body: JSON.stringify({
                room,
                body
            })
        })
        
        const responseBody = await response.json();

        if (response.status === 200) {
            console.log(responseBody);
        } else {
            console.log(responseBody.message);
        };
    }
    
  return (
    <form onSubmit={submitMessage} className='AddRoom'>
        <h3>Add a Message</h3>
        <textarea placeholder='Body' onChange={(e) => setBody(e.target.value)}></textarea>
        <button type="submit">Send</button>
    </form>
  )
}
