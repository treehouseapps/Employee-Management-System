import { useEffect } from 'react';

const Logout = () => {

    useEffect(() => {
        localStorage.removeItem('token');
    }, []);

    return null; // no UI needed
};

export default Logout;
