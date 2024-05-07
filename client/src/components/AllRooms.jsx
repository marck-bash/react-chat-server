import React, { useState, useEffect } from 'react'
import './styles/AllRoom.css'
import { Link } from 'react-router-dom'

export default function AllRooms() {
    const [records, setRecords] = useState([])
    
    useEffect(() => {
      fetch("http://localhost:3000/room")
      .then(response => response.json())
      .then(data => setRecords( data ))
      .catch(err => console.log(err))
    }, [])

  
  return (
    <div className='AllRoom'>
      <h1 className='Header1'>
        All Rooms
      </h1>
      <div className='fetchData'>
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
