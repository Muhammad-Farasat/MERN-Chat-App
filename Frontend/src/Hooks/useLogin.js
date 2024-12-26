import React, { useState } from 'react'
import { useAuthContext } from '../Context/authContext'
import toast from 'react-hot-toast'

const useLogin = () => {
 
    const [loading, setLoading] = useState(false)
    const {authUser, setAuthUser} = useAuthContext()
    const backend_url = import.meta.env.VITE_BACKEND_URL


    const login = async(username, password) => {

        setLoading(true)
        
        try {
            
            const res = await fetch(`/auth/login`, {
                method: "POST",
                headers: { "content-type": "application/json"},
                body: JSON.stringify({username, password}),
            });

            const data = await res.json();
            console.log(data)

            if (data.error) {
                throw new Error(data.error)
            }

            localStorage.setItem("auth-token",data.token)
            setAuthUser(data);


        } catch (error) {
            toast.error(error.message || "An error occurred during login");
        }finally{
            setLoading(false)
        }

    }

    return {loading, login  }

}

export default useLogin