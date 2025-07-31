import React, { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadAndDecode = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const jwtDecodeModule = await import('jwt-decode');

                    // Use the jwtDecode function from the module
                    const decoded = jwtDecodeModule.jwtDecode(token);

                    setUser(decoded.username);
                } catch (err) {
                    console.error('Invalid token or import error:', err);
                    setUser(null);
                }
            } else {
                setUser(null);
            }
        };

        loadAndDecode();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUserData() {
    return useContext(UserContext);
}
