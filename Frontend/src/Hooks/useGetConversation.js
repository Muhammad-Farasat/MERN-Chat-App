import React, { useEffect, useId, useState } from 'react'    
import toast from 'react-hot-toast'

export const useGetConversation = () => {    
    const [loading, setLoading] = useState(false)
    const [conversations, setConversations] = useState([])
    const backend_url = import.meta.env.VITE_BACKEND_URL
    
    useEffect(() => {
        const getConversation = async() => {
            setLoading(true)
            try {
                const token = localStorage.getItem('auth-token')
                const res = await fetch(`/users/sidebar`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }, // Include the token in the Authorization header
                });
                console.log("Get conversation", res);
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error)
                }
                setConversations(data);
            } catch (error) {
                toast.error(error.message || "An error occurred during login");
            }finally{
                setLoading(false)
            }
        }

        
             getConversation()
      

    }, [])

    
    return {loading, conversations}
    

    
}
