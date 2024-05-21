import React, { useState } from 'react'
import "./styles/AddRoom.css"

export default function AddRoom({ setToken }) {
    const [name, setName] = useState();
    const [description, setDesciption] = useState();
    
    async function submitRoom(event) {
        //stops page from refreshing when new room is added
        event.preventDefault();
        
        //fetching from /room to make a post
        const response = await fetch("http://localhost:3000/room", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                name,
                description
            })
        });
        
    const responseBody = await response.json();
    
    if (response.status === 200) {
        console.log(responseBody);
    } else {
        console.log(responseBody.message);
    };
}
    
  return (
    <form onSubmit={submitRoom} className='AddRoom'>
        <h3>Add a Room</h3>
        <label>
            <div>Room Name</div>
            <input placeholder='Room Name' onChange={(e) => setName(e.target.value)}></input>
        </label>
        <label>
            <div>Room Description</div>
            <input placeholder='Description' onChange={(e) => setDesciption(e.target.value)}></input>
        </label>
        <button type="submit">Submit</button>
    </form>
  )
}
