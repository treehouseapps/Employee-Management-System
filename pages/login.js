import React from 'react';
import { Box, TextField, Button, Typography, Paper, InputAdornment } from '@mui/material';
import { LockOutlined, PersonOutline } from '@mui/icons-material';
import Navbar from '../components/navbar';
import Link from 'next/link';

export default function Login() {
    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
            <Navbar />
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 'calc(100vh - 64px)', // Adjust for navbar height
                    px: 2,
                }}
            >
                <Paper
                    elevation={6}
                    sx={{
                        width: '100%',
                        maxWidth: 420,
                        p: 4,
                        borderRadius: 3,
                        boxShadow: '0px 8px 24px rgba(0,0,0,0.1)',
                    }}
                >
                    <Box textAlign="center" mb={3}>
                        <LockOutlined sx={{ fontSize: 40, color: '#7F00FF' }} />
                        <Typography variant="h5" fontWeight="bold" mt={1}>
                            Admin Login
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Please enter your credentials to access the dashboard
                        </Typography>
                    </Box>

                    <form>
                        <TextField
                            label="Username"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonOutline />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockOutlined />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Button
                            variant="contained"
                            fullWidth
                            sx={{
                                mt: 3,
                                py: 1.5,
                                backgroundColor: '#7F00FF',
                                '&:hover': {
                                    backgroundColor: '#5e00c9',
                                },
                                borderRadius: 2,
                                fontWeight: 'bold',
                            }}
                        >
                            Login
                        </Button>
                    </form>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        mt={3}
                        textAlign="center"
                    >
                        Forgot your password? <Link href='https://t.me/B_smile' >Contact the system administrator.</Link>
                    </Typography>
                </Paper>
            </Box>
        </Box>
    );
}
