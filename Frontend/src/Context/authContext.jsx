import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";


export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {
    const token = localStorage.getItem("auth-token");
    const [authUser, setAuthUser] = useState(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode(token);  // Decode the JWT
                return { token, user: {...decodedToken} };  // Return the decoded user info
            } catch (error) {
                console.error("Failed to decode token", error);
                return null;
            }
        }
        return null
    })
    return <AuthContext.Provider value={{authUser, setAuthUser}} > {children} </AuthContext.Provider>

}