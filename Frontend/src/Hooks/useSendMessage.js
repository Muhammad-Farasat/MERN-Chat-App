import React, { useState } from 'react'
import useConversation from '../Zustand/useConversation'

export const useSendMessage = () => {

    const [loading, setLoading] = useState(false)
    const {messages, setMessages, selectedConversation} = useConversation()
    const backend_url = import.meta.env.VITE_BACKEND_URL
    

    const sendMessage = async(message) =>{
        setLoading(true)
        try {
            const token = localStorage.getItem('auth-token')
            const res = await fetch(`/message/send/${selectedConversation._id}`,{
                method: 'POST',
                headers:{
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({message})
            })
    
            const data = await res.json()
            if(data.error ){ throw new Error(data.error)}
            console.log(messages);
            setMessages([...messages, data])
        } catch (error) {
            console.error("Error in sending message hook", error);
        }finally{
            setLoading(false)
        }

    }

  return {sendMessage, loading}
}
