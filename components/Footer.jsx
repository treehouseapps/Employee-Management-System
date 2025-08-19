import React from 'react';
import { Box, Container, Typography, Link, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: '#2C3E50',
                color: '#ECF0F1',
                py: { xs: 2, sm: 3 },
                mt: { xs: 4, md: 6 },
                width: '100%',
            }}
        >
            <Container maxWidth="lg">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        justifyContent: 'space-between',
                        alignItems: { xs: 'flex-start', md: 'center' },
                        textAlign: { xs: 'center', md: 'left' },
                        gap: { xs: 2, md: 0 },
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{ fontFamily: 'Quicksand', fontSize: { xs: '0.8rem', md: '0.9rem' } }}
                    >
                        © {new Date().getFullYear()} TreeHouseApps. All rights reserved.
                    </Typography>

                    <Box sx={{ display: 'flex', gap: { xs: 1.5, md: 2 }, justifyContent: { xs: 'center', md: 'flex-end' }, width: { xs: '100%', md: 'auto' } }}>
                        <IconButton
                            component={Link}
                            href="https://github.com/treehouseapps"
                            target="_blank"
                            sx={{ color: '#ECF0F1', '&:hover': { color: '#3498DB' } }}
                        >
                            <GitHubIcon />
                        </IconButton>
                        <IconButton
                            component={Link}
                            href="https://www.linkedin.com/in/bereket-tsegaye-60a603202/"
                            target="_blank"
                            sx={{ color: '#ECF0F1', '&:hover': { color: '#3498DB' } }}
                        >
                            <LinkedInIcon />
                        </IconButton>
                        <IconButton
                            component={Link}
                            href="mailto:bbekijunior@gmail.com"
                            sx={{ color: '#ECF0F1', '&:hover': { color: '#3498DB' } }}
                        >
                            <EmailIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
