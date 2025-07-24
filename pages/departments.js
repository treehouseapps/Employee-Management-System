import React, { useState } from 'react';
import { useFetchedData } from '../components/DataContext';

import {
    Box, Typography, Grid, Paper, Avatar, Button,
    Chip, Divider, IconButton, Menu, MenuItem,
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Navbar from '../components/navbar';
import Link from 'next/link';

const Departments = () => {
    const { fetchedData: employees = [], loading } = useFetchedData();
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedDeptId, setSelectedDeptId] = useState(null);

    // Group employees by department
    const departmentMap = {};
    employees.forEach((emp) => {
        const deptName = emp?.department || 'Unknown';
        console.log(emp)
        if (!departmentMap[deptName]) {
            departmentMap[deptName] = {
                id: Object.keys(departmentMap).length + 1,
                name: deptName,
                employees: 0,
                status: 'Active',
            };
        }
        departmentMap[deptName].employees += 1;
    });

    const departments = Object.values(departmentMap);

    const handleMenuOpen = (event, id) => {
        setAnchorEl(event.currentTarget);
        setSelectedDeptId(id);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedDeptId(null);
    };

    const handleStatusChange = (newStatus) => {
        const index = departments.findIndex((dept) => dept.id === selectedDeptId);
        if (index !== -1) {
            departments[index].status = newStatus;
        }
        handleMenuClose();
    };

    return (
        <Box>
            <Navbar />
            <Box
                sx={{
                    backgroundColor: '#f8f9fb',
                    minHeight: '100vh',
                    px: { xs: 2, sm: 4, md: 6 },
                    py: 1,
                }}
            >
                {/* Top Section */}
                <Box
                    sx={{
                        mb: 2,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 2,
                    }}
                >
                    <Box>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 600,
                                color: '#7F00FF',
                                fontFamily: 'Quicksand',
                            }}
                        >
                            Department Overview
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#555' }}>
                            A central view of all existing departments and their status. This helps you organize your workforce better and keep track of department-specific staffing.
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ width: '100%' }}>
                    <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                        {/* Add Department Button */}
                        <Grid item xs={12} md={3}>
                            <Link href='/login'>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    startIcon={<AddIcon />}
                                    sx={{
                                        backgroundColor: '#7F00FF',
                                        fontWeight: 500,
                                        textTransform: 'none',
                                        '&:hover': { backgroundColor: '#6900d1' },
                                    }}
                                >
                                    Add Department
                                </Button>
                            </Link>
                        </Grid>

                        {/* Summary Cards */}
                        <Grid item xs={12} md={9}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Paper
                                        elevation={2}
                                        sx={{
                                            p: 2,
                                            backgroundColor: '#fff',
                                            borderRadius: 3,
                                            textAlign: 'center',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.5rem'
                                        }}
                                    >
                                        <Typography variant="subtitle2" sx={{ color: '#999' }}>
                                            Total Departments
                                        </Typography>
                                        <Typography variant="h6">
                                            {departments.length}
                                        </Typography>
                                    </Paper>
                                </Grid>

                                <Grid item xs={12} sm={6} md={4}>
                                    <Paper
                                        elevation={2}
                                        sx={{
                                            p: 2,
                                            backgroundColor: '#fff',
                                            borderRadius: 3,
                                            textAlign: 'center',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.5rem'
                                        }}
                                    >
                                        <Typography variant="subtitle2" sx={{ color: '#999' }}>
                                            Active Departments
                                        </Typography>
                                        <Typography variant="h6">
                                            {departments.filter((dept) => dept.status === 'Active').length}
                                        </Typography>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>

                {/* Department List */}
                <Box>
                    <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, mb: 2, color: '#333' }}
                    >
                        Department List
                    </Typography>

                    <Grid container spacing={3}>
                        {departments.map((dept) => (
                            <Grid item xs={12} sm={6} md={3} key={dept.id}>
                                <Paper
                                    elevation={1}
                                    sx={{
                                        p: '8px 15px',
                                        borderRadius: 3,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 2,
                                        backgroundColor: '#fff',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <Avatar sx={{ bgcolor: '#7F00FF', width: 32, height: 32, p: 1 }}>
                                            <BusinessIcon />
                                        </Avatar>
                                        <IconButton
                                            onClick={(e) => handleMenuOpen(e, dept.id)}
                                            aria-controls={selectedDeptId === dept.id ? 'status-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={selectedDeptId === dept.id ? 'true' : undefined}
                                        >
                                            <MoreVertIcon />
                                        </IconButton>
                                    </Box>

                                    <Box>
                                        <Typography fontSize={15} sx={{ fontWeight: 600 }}>
                                            {dept.name}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{ color: '#777', fontSize: '13px' }}
                                        >
                                            {dept.employees} Employees
                                        </Typography>
                                    </Box>

                                    <Divider />

                                    <Chip
                                        label={dept.status}
                                        color={dept.status === 'Active' ? 'success' : 'default'}
                                        variant="outlined"
                                        sx={{ width: 'fit-content' }}
                                    />
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>

            <Menu
                id="status-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <MenuItem onClick={() => handleStatusChange('Active')}>Active</MenuItem>
                <MenuItem onClick={() => handleStatusChange('Inactive')}>Inactive</MenuItem>
            </Menu>
        </Box>
    );
};

export default Departments;