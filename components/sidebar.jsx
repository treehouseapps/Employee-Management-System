import { Box, Button } from '@mui/material';
import Link from 'next/link';

const Sidebar = () => {
    return (
        <Box sx={{
            position: 'fixed', // Fix the sidebar position
            top: 0,
            left: 0,
            width: { xs: '100%', md: '250px' },
            height: { xs: '100vh', md: '100vh' },
            backgroundColor: 'white',
            boxShadow: '1px 2px 10px 0.5px lightgray',
            p: { xs: 1, sm: 2 },
            marginTop: '4.5rem',
            borderRadius: '0.5rem'
        }}>
            <Box sx={{
                display: { xs: 'flex', md: 'block' },
                gap: { xs: 1, sm: 2 },
                flexWrap: 'wrap',
                justifyContent: 'center'
            }}>
                <Button
                    variant="contained"
                    color="info"
                    sx={{
                        width: { xs: 'auto', md: '100%' },
                        marginBottom: { xs: 0, md: '1rem' },
                        fontSize: { xs: '0.8rem', sm: '1rem' }
                    }}
                >
                    <Link href="/dashboard" passHref>Dashboard</Link>
                </Button>
                <Button
                    variant="contained"
                    color="info"
                    sx={{
                        width: { xs: 'auto', md: '100%' },
                        marginBottom: { xs: 0, md: '1rem' },
                        fontSize: { xs: '0.8rem', sm: '1rem' }
                    }}
                >
                    <Link href="/register" passHref>Register</Link>
                </Button>
                <Button
                    variant="contained"
                    color="info"
                    sx={{
                        width: { xs: 'auto', md: '100%' },
                        marginBottom: { xs: 0, md: '1rem' },
                        fontSize: { xs: '0.8rem', sm: '1rem' }
                    }}
                >
                    <Link href="/display" passHref>Display</Link>
                </Button>
            </Box>
        </Box>
    );
}

export default Sidebar;