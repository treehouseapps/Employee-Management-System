import { useState } from 'react';
import { Box, InputAdornment, TextField, Typography, Backdrop } from '@mui/material';
import Link from 'next/link';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
    House, Dashboard as DashboardIcon,
    Group as EmployeesIcon,
    PersonAdd as AddEmployeeIcon,
    Apartment as DepartmentsIcon,
    Settings as SettingsIcon,
    PersonAddAlt as RegisterIcon,
    ArrowRight, Search,
} from '@mui/icons-material';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => setIsOpen(prev => !prev);

    return (
        <>
            <Box
                sx={{
                    height: '100vh',
                    backgroundColor: '#7F00FF',
                    boxShadow: '1px 2px 10px 0.5px lightgray',
                    padding: '8px',
                    zIndex: 1300,
                    transition: 'all 0.3s ease-in-out',
                    position: 'fixed',
                    top: 0,
                    left: { xs: isOpen ? 0 : '-100%', md: 0 },
                    width: { xs: '70%', sm: '50%', md: '250px' },
                    overflowY: 'auto',
                    display: { xs: isOpen ? 'block' : 'none', md: 'block' },
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, margin: 2, color: 'white' }}>
                    <Box display="flex" gap={1} alignItems="center" mb={2}>
                        <House sx={{ fontSize: 36 }} />
                        <Link href="/" passHref>
                            <Box display="flex" flexDirection="column" sx={{ cursor: 'pointer' }}>
                                <Typography fontWeight="bold" fontSize={22}>TreeHouse</Typography>
                                <Typography fontSize={14}>apps</Typography>
                            </Box>
                        </Link>
                    </Box>

                    <TextField
                        size="small"
                        variant="outlined"
                        placeholder="Search"
                        sx={{ mb: 2, backgroundColor: 'white', borderRadius: '5px', width: '100%' }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Search sx={{ cursor: 'pointer' }} />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Typography sx={{ fontSize: '15px', fontWeight: 'bold', mt: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <ArrowRight /> Application
                        </Typography>
                        <Box display="flex" mb={1} gap={1} alignItems="center">
                            <DashboardIcon fontSize="small" /> <Link href="/dashboard" passHref>Dashboard</Link>
                        </Box>
                        <Box display="flex" mb={1} gap={1} alignItems="center">
                            <EmployeesIcon fontSize="small" /> <Link href="/display" passHref>Employees</Link>
                        </Box>
                        <Box display="flex" mb={1} gap={1} alignItems="center">
                            <AddEmployeeIcon fontSize="small" /> <Link href="/register" passHref>Add Employee</Link>
                        </Box>
                        <Box display="flex" mb={1} gap={1} alignItems="center">
                            <DepartmentsIcon fontSize="small" /> <Link href="/departments" passHref>Departments</Link>
                        </Box>

                        <Typography sx={{ fontSize: '15px', fontWeight: 'bold', mt: 2, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <ArrowRight /> Other
                        </Typography>

                        <Box display="flex" mb={1} gap={1} alignItems="center">
                            <RegisterIcon fontSize="small" /> <Link href="/login" passHref>Login</Link>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box
                onClick={toggleSidebar}
                sx={{
                    position: 'fixed',
                    top: 70,
                    left: 5,
                    display: { xs: 'flex', md: 'none' },
                    border: '2px solid black',
                    borderRadius: '50%',
                    width: 30,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    backgroundColor: 'white',
                    zIndex: 1400,
                }}
            >
                {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </Box>

            <Backdrop
                open={isOpen}
                onClick={toggleSidebar}
                sx={{ zIndex: 1200, backgroundColor: 'rgba(0,0,0,0.3)', display: { xs: 'block', md: 'none' } }}
            />
        </>
    );
};

export default Sidebar;
