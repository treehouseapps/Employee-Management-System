import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Home, Logout } from '@mui/icons-material';
import Link from 'next/link';

function Navbar() {
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
                        }}
                    >
                        <Link href="/" passHref>
                            <Button
                                color="inherit"
                                startIcon={<Home />}
                                fontFamily='Quicksand'
                                sx={{
                                    color: 'black',
                                    fontSize: { xs: '0.8rem', sm: '1rem' },
                                }}
                            >
                                Home
                            </Button>
                        </Link>
                        <Link href="/logout" passHref>
                            <Button
                                color="inherit"
                                startIcon={<Logout />}
                                fontFamily='Quicksand'
                                sx={{
                                    color: 'black',
                                    fontSize: { xs: '0.8rem', sm: '1rem' },
                                }}
                            >
                                Logout
                            </Button>
                        </Link>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navbar;
