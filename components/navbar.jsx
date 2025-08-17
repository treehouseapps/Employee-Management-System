import React, { useState, useRef } from 'react';
import { AppBar, Toolbar, Paper, Popper, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { ArrowDropDown, Home, Logout, Person, Menu } from '@mui/icons-material';
import Link from 'next/link';
import { useUserData } from '../context/userContext'

function Navbar() {
    const { user, setUser } = useUserData()
    const [profile, setProfile] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const anchorRef = useRef(null);

    const toggleDrawer = () => {
        setMobileOpen(!mobileOpen)
    }

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
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: { xs: '0.5rem 1rem', sm: '0 2rem' },
                    }}
                >
                    <Typography
                        variant="h6"
                        fontFamily={'Quicksand'}
                        sx={{
                            flexGrow: { xs: 1, sm: 0 },
                            color: 'black',
                            fontSize: { xs: '1rem', sm: '1.25rem' },
                            textAlign: 'left',
                        }}
                    >
                        Employee Management System
                    </Typography>

                    <Box
                        sx={{
                            display: { xs: 'none', sm: 'flex' },
                            gap: '1rem',
                            alignItems: 'center',
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
                                cursor: 'pointer',
                                fontFamily: 'Quicksand',
                                '&:hover': { backgroundColor: 'lightgray' },
                            }}
                            onMouseEnter={() => setProfile(true)}
                            onMouseLeave={() => setProfile(false)}
                        >
                            <Person /><> Admin<ArrowDropDown /></>
                        </Box>

                        <Popper
                            open={profile}
                            anchorEl={anchorRef.current}
                            placement="bottom-end"
                            onMouseEnter={() => setProfile(true)}
                            onMouseLeave={() => setProfile(false)}
                            style={{ zIndex: 1300 }}
                        >
                            <Paper elevation={3} sx={{ p: '4px 8px', minWidth: 150, display: 'grid', placeItems: 'center' }} >
                                <Typography
                                    variant="subtitle1"
                                    fontFamily={'Quicksand'}
                                    fontWeight={900}
                                    fontSize={18}
                                    gutterBottom
                                >
                                    {user}
                                </Typography>
                                <Link href="/logout" passHref>
                                    <Button
                                        color="inherit"
                                        startIcon={<Logout />}
                                        sx={{
                                            color: 'black',
                                            fontFamily: 'Quicksand',
                                            fontSize: { xs: '0.75rem', sm: '0.9rem' },
                                        }}
                                    >
                                        Logout
                                    </Button>
                                </Link>
                            </Paper>
                        </Popper>
                    </Box>

                    <IconButton
                        edge="end"
                        color="inherit"
                        aria-label="menu"
                        sx={{ display: { xs: 'flex', sm: 'none' }, color: 'black' }}
                        onClick={toggleDrawer}
                    >
                        <Menu />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Drawer
                anchor="right"
                open={mobileOpen}
                onClose={toggleDrawer}
                sx={{ display: { xs: 'block', sm: 'none' } }}
            >
                <Box sx={{ width: 220 }} role="presentation" onClick={toggleDrawer}>
                    <List>
                        <ListItem>
                            <Link href="/" passHref>
                                <ListItemText primary="Home" />
                            </Link>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={user || 'Admin'} />
                        </ListItem>
                        <ListItem>
                            <Link href="/logout" passHref>
                                <ListItemText primary="Logout" />
                            </Link>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </Box>
    );
}

export default Navbar;
