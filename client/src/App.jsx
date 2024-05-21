import { useState } from 'react'
import { Routes, Route} from 'react-router-dom'
import './App.css'
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Room from './components/Room';
import Messages from './components/Messages';

function App() {
  const [token, setToken] = useState(localStorage.getItem("jwt-token"));
  
  return (
    <>
      <Routes>
        <Route path='/'  element={<SignUp setToken={setToken}/>}></Route>
        <Route path='/signin' element={<SignIn setToken={setToken}/>}></Route>
        <Route path='/room' element={<Room setToken={setToken}/>}></Route>
        <Route path="/message/:room" element={<Messages token={token}/>}></Route>
      </Routes>
    </>
  )
}

export default App
