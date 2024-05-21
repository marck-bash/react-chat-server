import React from 'react'
import AddMessage from './AddMessage'
import SignOut from './SignOut'

export default function MessageInput({ token }) {
  return (
    <div>
        <AddMessage token={ token }></AddMessage>
        <SignOut></SignOut>
    </div>
  )
}
