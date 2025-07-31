import React, { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    const decodeToken = async (token) => {
        try {
            const jwtDecodeModule = await import('jwt-decode');
            const jwtDecode = jwtDecodeModule.jwtDecode;
            const decoded = jwtDecode(token);
            return decoded?.username || null;
        } catch (err) {
            console.error('Invalid token or import error:', err);
            return null;
        }
    };

    const loadUserFromToken = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            const username = await decodeToken(token);
            setUser(username);
        } else {
            setUser(null);
        }
    };

    useEffect(() => {
        loadUserFromToken();

        // Listen for token changes from other tabs
        const handleStorageChange = () => {
            loadUserFromToken();
        };

        window.addEventListener('storage', handleStorageChange);

        // Optional: Polling every 1s to catch changes in same tab
        const interval = setInterval(() => {
            loadUserFromToken();
        }, 1000);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(interval);
        };
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
