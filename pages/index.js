import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import Sidebar from '../components/sidebar';

export default function Home() {
    return (
        <Box sx={{
            marginLeft: { md: '250px' }, // Offset content for the sidebar
            marginTop: '4rem',
        }}>
            <Sidebar />
            <Container
                sx={{ padding: '10px' }}>
                <Box
                    component="main"
                    sx={{
                        boxShadow: '1px 2px 10px 0.5px lightblue',
                        margin: { xs: '1rem auto', md: '4rem auto' },
                        padding: { xs: '1rem !important', sm: '2rem !important' },
                        borderRadius: '.5rem',
                        backgroundColor: 'white',
                        height: 'max-content',
                        maxWidth: { xs: '95% !important', sm: '600px !important' }
                    }}
                >
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: { xs: 2, sm: 3 }
                    }}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 'bold',
                                textAlign: 'center',
                                fontSize: { xs: '1.5rem', sm: '2rem' }
                            }}
                        >
                            Welcome to Employee Management System
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                textAlign: 'center',
                                fontSize: { xs: '0.9rem', sm: '1rem' }
                            }}
                        >
                            This system helps you manage employee information efficiently.
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
