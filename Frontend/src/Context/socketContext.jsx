import {createContext, useEffect, useState, useContext} from 'react'
import { useAuthContext } from './authContext'
import {io} from 'socket.io-client'



export const SocketContext = createContext()

export const useSocketContext = () => {
    return useContext(SocketContext)
}

export const SocketContextProvider = ({children}) =>{

    
    const [socket, setSocket] = useState()
    const [online, setOnline] = useState([])
    const {authUser} = useAuthContext()
    const backend_url = import.meta.env.VITE_BACKEND_URL

    useEffect(()=>{
        // console.log();
        if (authUser) {
            const socket = io(`${backend_url}`,{
                query:{ userId: authUser.user.id},
                transports: ['websocket'],
            })

            console.log("This is auth user backend ", authUser.user.id);

            setSocket(socket)
            
            socket.on('OnlineUser', (users)=>{
                setOnline(users)
            })
        
            return ()=> socket.close();
        }else{
            if (socket) {
                socket.close()
                setSocket(null)
        }    
            
        }
    },[authUser])


    return <SocketContext.Provider value={{socket, online}}>{children}</SocketContext.Provider>
} 

