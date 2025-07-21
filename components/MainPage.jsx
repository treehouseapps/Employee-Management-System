import React from 'react';
import { Container, Typography, Box } from '@mui/material';
const MainPage = () => {
    return (
        <Container
            sx={{ padding: '10px' }}>
            <Box
                component="main"
                sx={{
                    boxShadow: '1px 2px 10px 0.5px lightgray',
                    margin: { xs: '1rem auto', md: '4rem auto' },
                    padding: { xs: '1rem !important', sm: '1rem !important' },
                    borderRadius: '.5rem',
                    backgroundColor: 'white',
                    height: 'max-content',
                    maxWidth: { xs: '95% !important', sm: '700px !important' }
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
                        fontFamily='Quicksand'
                        sx={{
                            fontWeight: 'bold',
                            textAlign: 'center',
                            fontSize: { xs: '1.5rem', sm: '2.5rem' }
                        }}
                    >
                        Welcome to Employee Management System
                    </Typography>

                    <Typography
                        fontFamily='Quicksand'
                        variant="body1"
                        sx={{
                            textAlign: 'center',
                            fontSize: { xs: '0.9rem', sm: '1.5rem' }
                        }}
                    >
                        This system helps you manage employee information efficiently.
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
}

export default MainPage;