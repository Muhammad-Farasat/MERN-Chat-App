import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuthContext } from '../Context/authContext';

const useSignup = () =>{

    const [loading, setLoading] = useState(false)
    const {setAuthUser} = useAuthContext()


    const signup = async ({fullName,username,gender,password,confirmPassword}) => {

        const success = handleError({fullName,username,gender,password,confirmPassword});
        if(!success) return;

        setLoading(true)

        try {
            const res = await fetch("http://localhost:5000/api/auth/signup", {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({fullName,username,gender,password,confirmPassword}),
                })

                const data = await res.json();
                console.log(data)

                if(data.error){
                    throw new Error("Here in try catch of usesignup" + error.message)
                }

                localStorage.getItem("auth-token", data.token)
                setAuthUser(data)

            } catch (error) {
                toast.error(error.message);
            }finally{
                setLoading(false)
            }

    }

    return {loading, signup}


};

export default useSignup



function handleError({fullName,username,gender,password,confirmPassword,}) {

    if (!fullName || !username || !gender || !password || !confirmPassword ) {
        toast.error("Fill all feilds")
        return false
    }

    if(password !== confirmPassword ){
        toast.error("Passwords don't match!");
        return false
    }

    if(password.length < 6){
        toast.error("Password should be atleast 6 digits")
        return false
    }

    return true

}