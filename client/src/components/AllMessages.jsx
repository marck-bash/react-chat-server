import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './styles/AllMessages.css';

export default function AllMessages() {
  const [records, setRecords] = useState([]);
  let { room } = useParams();
  
  //useEffect being used to fetch all the data from backend url parameter
  //converting the fetch response into JSON utilizing .then notation
  //storing the data variable as the parameter for our useState "setRecords"
  //catching any errors
  useEffect(() => {
    fetch(`http://localhost:3000/message/${room}`)
    .then(response => response.json())
    .then(data => setRecords( data ))
    .catch(err => console.log(err))
  }, [records]) //adding the last parameter to UseEffect to allow us to re render the page every time records changes
  
  //checks for message elements whose .room field in the DB matches the current room parameter
  const match = (element) => element.room == room;
  
  return (
    <div className='AllMessages'>
      <h1 className='Header1'>
        All Messages
      </h1>
      <div className='messageData'>
        {/* below we are filtering the results from our match variable we created above, then utilizing .map to create an array with only the records that match our parameter */}
        {records.filter(match).map((list, index) => (
          <p key={index}> 
            Date: {list.when}
            <h2>Message: {list.body}</h2>
            <div className='buttonArea'>
              <button className='button'>EDIT</button>
              <button className='button'>DELETE</button>
            </div>
          </p>

        ))}
      </div>

    </div>
  )
}
