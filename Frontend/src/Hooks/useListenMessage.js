import React, {useEffect} from 'react'
import useConversation from '../Zustand/useConversation'
import {useSocketContext} from '../Context/socketContext'

const useListenMessage = () => {
  const {messages, setMessages} = useConversation()
  const {socket} = useSocketContext()

  useEffect(() => {
    socket?.on("newMessage", (newMessage)=>{
        setMessages([...messages, newMessage])
    })

    return () => socket?.off("newMessage")
  }, [socket, messages, setMessages])
  


}

export default useListenMessage