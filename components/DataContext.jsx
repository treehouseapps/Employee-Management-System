import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const FetchedDataContext = createContext();

export function FetchedDataProvider({ children }) {
    const [fetchedData, setFetchedData] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            router.replace('/login');
            return;
        }

        fetch('/api/service')
            .then(res => res.json())
            .then(json => {
                setFetchedData(json.data || []);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch data", err);
                setFetchedData([]);
                setLoading(false);
            });
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
