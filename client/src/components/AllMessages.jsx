import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './styles/AllMessages.css'

export default function AllMessages() {
  const [records, setRecords] = useState([]);
  let { room } = useParams();
  
  useEffect(() => {
    fetch(`http://localhost:3000/message/${room}`)
    .then(response => response.json())
    .then(data => setRecords( data ))
    .catch(err => console.log(err))
  }, [])
  
  const match = (element) => element.room == room;
  
  console.log(records.filter(match))
  
  return (
    <div className='AllMessages'>
      <h1 className='Header1'>
        All Messages
      </h1>
      <div className='messageData'>
        {records.filter(match).map((list, index) => (
          <h2 key={index}>
            Date: {list.when}
            <p>Message: {list.body}</p>
          </h2>
        ))}
      </div>
    </div>
  )
}
