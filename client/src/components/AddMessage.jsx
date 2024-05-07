import React, { useState } from 'react'
import "./styles/AddRoom.css"
import { useParams } from 'react-router-dom';

export default function AddMessage() {
    const [body, setBody] = useState();
    let { room } = useParams();
    
    async function submitMessage(event) {
        //stops page from refreshing when submitting a message
        event.preventDefault();
        
        
        const response = await fetch(`http://localhost:3000/message/${room}`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
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
