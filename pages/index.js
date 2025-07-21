import React from 'react';
import Navbar from '../components/navbar';
import MainPage from '../components/MainPage';
import { Box } from '@mui/material';

export default function Home() {
    return (
        <Box>
            <Navbar />
            <MainPage />
        </Box>
    );
}
