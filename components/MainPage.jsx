import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const MainPage = () => {
    return (
        <Container sx={{ padding: { xs: '0.5rem', sm: '1rem', md: '2rem' } }}>
            <Box
                component="main"
                sx={{
                    boxShadow: '1px 2px 10px 0.5px lightgray',
                    margin: { xs: '1rem auto', md: '4rem auto' },
                    padding: { xs: '1rem', sm: '2rem', md: '3rem' },
                    borderRadius: '.5rem',
                    backgroundColor: 'white',
                    height: 'max-content',
                    maxWidth: { xs: '100%', sm: '700px', md: '900px' },
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: { xs: 2, sm: 3, md: 4 },
                    }}
                >
                    <Typography
                        variant="h4"
                        fontFamily="Quicksand"
                        sx={{
                            fontWeight: 'bold',
                            textAlign: 'center',
                            fontSize: { xs: '1.5rem', sm: '2.2rem', md: '2.8rem' },
                            lineHeight: 1.3,
                        }}
                    >
                        Welcome to Employee Management System
                    </Typography>

                    <Typography
                        fontFamily="Quicksand"
                        variant="body1"
                        sx={{
                            textAlign: 'center',
                            fontSize: { xs: '0.95rem', sm: '1.2rem', md: '1.4rem' },
                            maxWidth: '600px',
                        }}
                    >
                        This system helps you manage employee information efficiently.
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default MainPage;
