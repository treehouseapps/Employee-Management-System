import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Logout = () => {
    const router = useRouter();

    useEffect(() => {
        localStorage.removeItem('token');
        router.replace('/login');
    }, [router]);

    return null;
};

export default Logout;
