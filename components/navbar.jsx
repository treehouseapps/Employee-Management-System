import React, { useState, useRef } from 'react';
import { AppBar, Toolbar, Paper, Popper, Typography, Button, Box } from '@mui/material';
import { Home, Logout, Person } from '@mui/icons-material';
import Link from 'next/link';
import { useUserData } from '../context/userContext'

function Navbar() {
    const { user, setUser } = useUserData()
    const [profile, setProfile] = useState(false)
    const anchorRef = useRef(null);
    return (
        <Box sx={{ margin: '0 auto', width: '100%' }}>
            <AppBar
                position="static"
                sx={{
                    backgroundColor: 'white',
                    borderRadius: '0.5rem',
                    boxShadow: '1px 2px 10px 0.5px lightgray',
                    color: 'black',
                }}
            >
                <Toolbar
                    sx={{
                        flexDirection: { xs: 'column', sm: 'row' },
                        padding: { xs: '0.5rem', sm: '0 1rem' },
                        gap: { xs: '0.5rem', sm: '0' },
                    }}
                >
                    <Typography
                        variant="h6"
                        fontFamily={'Quicksand'}
                        sx={{
                            flexGrow: 1,
                            color: 'black',
                            paddingLeft: { xs: '0', sm: '4rem' },
                            fontSize: { xs: '1rem', sm: '1.25rem' },
                            textAlign: { xs: 'center', sm: 'left' },
                        }}
                    >
                        Employee Management System
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: { xs: '0.5rem', sm: '1rem' },
                            alignItems: 'center',
                            mr: '2rem'
                        }}
                    >
                        <Link href="/" passHref>
                            <Button
                                color="inherit"
                                startIcon={<Home />}
                                sx={{
                                    fontFamily: 'Quicksand',
                                    color: 'black',
                                    fontSize: { xs: '0.8rem', sm: '1rem' },
                                }}
                            >
                                Home
                            </Button>
                        </Link>
                        <Box
                            ref={anchorRef}
                            display="flex"
                            alignItems="center"
                            p="0.5rem" gap={0.5}
                            sx={{
                                cursor: 'pointer', fontFamily: 'Quicksand',
                                '&:hover': {
                                    backgroundColor: 'lightgray',
                                },
                            }}
                            onMouseEnter={() => setProfile(true)}
                            onMouseLeave={() => setProfile(false)}
                        >
                            <Person /> Admin
                        </Box>

                        <Popper
                            open={profile}
                            anchorEl={anchorRef.current}
                            placement="bottom-end"
                            onMouseEnter={() => setProfile(true)}
                            onMouseLeave={() => setProfile(false)}
                            style={{ zIndex: 1300 }}
                        >
                            <Paper elevation={3} sx={{ p: 2, minWidth: 200 }}>
                                <Typography variant="subtitle1" gutterBottom>
                                    {user}
                                </Typography>
                                <Typography variant="body2">Email: admin@example.com</Typography>
                                <Link href="/logout" passHref>
                                    <Button
                                        color="inherit"
                                        startIcon={<Logout />}
                                        sx={{
                                            color: 'black',
                                            fontFamily: 'Quicksand',
                                            fontSize: { xs: '0.8rem', sm: '1rem' },
                                        }}
                                    >
                                        Logout
                                    </Button>
                                </Link>
                            </Paper>
                        </Popper>

                    </Box>
                </Toolbar >
            </AppBar >

        </Box >
    );
}

export default Navbar;
