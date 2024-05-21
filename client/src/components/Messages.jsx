import React from 'react'
import AllMessages from './AllMessages'
import MessageInput from './MessageInput'
import './styles/Room.css'

export default function Messages({ token }) {
  return (
    <div className='Room'>
        <MessageInput token={ token }></MessageInput>
        <AllMessages></AllMessages>
    </div>
  )
}
