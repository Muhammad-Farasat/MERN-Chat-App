import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuthContext } from '../Context/authContext';

const uselogout = () =>{

    const [loading, setLoading] = useState(false)
    const {setAuthUser} = useAuthContext()


    const logout = async () => {
        setLoading(true)

        try {
            const res = await fetch("http://localhost:5000/api/auth/logout", {
                method: "POST",
                headers: {"Content-type": "application/json"},
                })

                const data = await res.json();
                console.log(data)

                if(data.error){
                    throw new Error(error.message)
                }

                localStorage.removeItem("auth-token")
                setAuthUser(null)

            } catch (error) {
                toast.error(error.message);
            }finally{
                setLoading(false)
            }

    }

    return {loading, logout}


};

export default uselogout