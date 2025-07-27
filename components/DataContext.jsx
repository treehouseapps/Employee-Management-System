import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const FetchedDataContext = createContext();

export function FetchedDataProvider({ children }) {
    const [fetchedData, setFetchedData] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            // this prevent/avoids multiple renders and re-navigation/infinite re-rendering
            if (router.pathname !== '/login') {
                router.replace('/login');
            }
        } else {
            fetch('/api/service')
                .then(res => res.json())
                .then(json => {
                    setFetchedData(json.data || []);
                })
                .catch(err => {
                    console.error("Failed to fetch data", err);
                    setFetchedData([]);
                })
                .finally(() => setLoading(false));
        }
    }, [router]);


    return (
        <FetchedDataContext.Provider value={{ fetchedData, setFetchedData, loading }}>
            {children}
        </FetchedDataContext.Provider>
    );
}

export function useFetchedData() {
    return useContext(FetchedDataContext);
}
