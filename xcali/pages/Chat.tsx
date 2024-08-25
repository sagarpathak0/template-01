import React from 'react'
import SideChat from '../components/SideChat'
import ChatWindow from '@/components/ChatWindow'

const Chat = () => {
  return (
    <div className='flex max-h-3/4 h-screen'>
        <SideChat />
        <ChatWindow />
    </div>
  )
}

export default Chat
