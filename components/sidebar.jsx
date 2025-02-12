import { useState } from 'react';
import { Box, Button } from '@mui/material';
import Link from 'next/link';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Sidebar = () => {
    const [sidechar, setSideChar] = useState('none');
    const [iconHeight, setIconHeight] = useState('max-content');
    const [isOpen, setIsOpen] = useState(false);

    const onsubmit = () => {
        setSideChar(prev => (prev === 'grid' ? 'none' : 'grid'));
        setIconHeight(prev => (prev === '100vh' ? 'max-content' : '100vh'));
        setIsOpen(prev => !prev);
    };

    return (
        <Box sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: { xs: isOpen ? '200px' : 'max-content', md: '250px' },
            height: { xs: iconHeight, md: '100vh' },
            backgroundColor: 'white',
            boxShadow: '1px 2px 10px 0.5px lightgray',
            display: 'block',
            marginTop: { xs: '5rem', md: '4.5rem' },
            borderRadius: '0.5rem',
            zIndex: 1200,
            transition: 'width 0.3s ease-in-out'
        }}>

            <Box
                onClick={onsubmit}
                sx={{
                    float: 'right',
                    display: { xs: 'flex', md: 'none' },
                    border: '2px solid black',
                    borderRadius: '50%',
                    width: 'max-content',
                    height: 'max-content'
                }}
            >
                {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </Box>

            <Box sx={{
                display: { xs: sidechar, md: 'block' },
                gap: 2,
                flexWrap: 'wrap',
                margin: { xs: 3, md: 2 },
                justifyContent: 'center',
            }}>
                <Button
                    variant="contained"
                    color="info"
                    sx={{
                        width: '100%',
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
                        width: '100%',
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
                        width: '100%',
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
