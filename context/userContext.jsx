import React, { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext()

export function UserProvider({ children }) {
    const [user, setUser] = useState('')
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            setUser('User exist')
        }
        else {
            setUser('!User exist')
        }
    }, [user])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}
export function useUserData() {
    return useContext(UserContext);
}
