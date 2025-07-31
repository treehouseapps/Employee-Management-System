import React, { createContext, useContext, useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
const UserContext = createContext()

export function UserProvider({ children }) {
    const [user, setUser] = useState('')
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const decoded = jwt_decode(token);
            console.log(decoded)
            setUser(`User exist`)
        }
        else {
            setUser('!User exist')
        }
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}
export function useUserData() {
    return useContext(UserContext);
}
