import React from 'react'
import AllMessages from './AllMessages'
import MessageInput from './MessageInput'
import './styles/Room.css'

export default function Messages() {
  return (
    <div className='Room'>
        <MessageInput></MessageInput>
        <AllMessages></AllMessages>
    </div>
  )
}
