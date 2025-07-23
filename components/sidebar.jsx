import { useState } from 'react';
import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { House, Person, Search } from '@mui/icons-material';

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
            height: { xs: iconHeight, md: '100vh' },
            backgroundColor: '#7F00FF',
            boxShadow: '1px 2px 10px 0.5px lightgray',
            display: 'block',
            padding: '1px',
            zIndex: 1200,
            transition: 'width 0.3s ease-in-out',
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
                color: 'white'
            }}>
                <Box display={'flex'} gap={1} alignItems={'center'}>
                    <House sx={{ fontSize: 40 }} />
                    <Link href="/" passHref><Typography fontWeight={'bold'} fontSize={25}>TreeHouse</Typography></Link>
                </Box>
                <TextField
                    size="small"
                    variant="outlined"
                    placeholder="Search"
                    sx={{
                        margin: '10px 0px',
                        backgroundColor: 'white', borderRadius: '5px',
                        width: '100%', border: 'none',
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <Search sx={{ cursor: 'pointer' }} />
                            </InputAdornment>
                        ),
                    }}
                />
                <Box
                    sx={{
                        display: 'flex', flexDirection: 'column',
                        alignItems: 'flex-start', gap: 1, p: 1,
                    }}
                >
                    <Typography sx={{ fontSize: '15px', margin: '.2rem' }}>Application</Typography>

                    <Box display="flex" mb={1} gap={1} alignItems="center" fontWeight={'light'} >
                        <Person /> <Link href="/dashboard" passHref>Dashboard</Link>
                    </Box>
                    <Box display="flex" mb={1} gap={1} alignItems="center" fontWeight={'light'} >
                        <Person /> <Link href="/register" passHref>Register</Link>
                    </Box>
                    <Typography sx={{ fontSize: '15px', margin: '.2rem' }}>Other</Typography>
                    <Box display="flex" mb={1} gap={1} alignItems="center" fontWeight={'light'} >
                        <Person /> <Link href="/register" passHref>Register</Link>
                    </Box>
                </Box>

            </Box>
        </Box>
    );
}

export default Sidebar;
