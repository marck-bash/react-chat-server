import React, { useState, useEffect } from 'react'
import './styles/AllRoom.css'
import { Link } from 'react-router-dom'

export default function AllRooms() {
    const [records, setRecords] = useState([])
    
    //utilizing useEffect to make a fetch request, then .then notation to change our response to json
    //storing data as a parameter into our setRecords useState, so that we may reference it in our records variable
    useEffect(() => {
      fetch("http://localhost:3000/room")
      .then(response => response.json())
      .then(data => setRecords( data ))
      .catch(err => console.log(err))
    }, [records]) //adding records to our second argument of useEffect to prevent this hook from re-rendering unless records variable changes

  
  return (
    <div className='AllRoom'>
      <h1 className='Header1'>
        All Rooms 
      </h1>
      <div className='fetchData'>
        {/* using .map to create a new array that contains only the records we recovered from our fetch request above */}
          {records.map((list, index) => (
            <h2 key={index}>
              {list.name}
              <p>Description: {list.description}</p>
              <Link to={`/message/${list._id}`} className='joinLink'>Join</Link>
            </h2>
          ))}
      </div>
    </div>
  )
}
