import React, { createContext, useContext, useEffect, useState } from 'react';

const FetchedDataContext = createContext();

export function FetchedDataProvider({ children }) {
    const [fetchedData, setFetchedData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
    }, []);

    return (
        <FetchedDataContext.Provider value={{ fetchedData, setFetchedData, loading }}>
            {children}
        </FetchedDataContext.Provider>
    );
}

export function useFetchedData() {
    return useContext(FetchedDataContext);
}
