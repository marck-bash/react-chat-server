import { useState } from 'react'
import { Routes, Route} from 'react-router-dom'
import './App.css'
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import Room from './components/Room';
import Messages from './components/Messages';
import AddMessage from './components/AddMessage';
import AllMessages from './components/AllMessages';

function App() {
  const [token, setToken] = useState(localStorage.getItem("jwt-token"));
  
  return (
    <>
      <Routes>
        <Route path='/'  element={<SignUp setToken={setToken}/>}></Route>
        <Route path='/signin' element={<SignIn setToken={setToken}/>}></Route>
        <Route path='/room' element={<Room setToken={setToken}/>}></Route>
        <Route path="/room" element={<SignOut setToken={setToken}/>}></Route>
        <Route path="/message/:room" element={<Messages />}></Route>
      </Routes>
    </>
  )
}

export default App
