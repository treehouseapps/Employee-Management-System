import React from 'react';
import {
    Box,
    Typography,
    Grid,
    Paper,
    Avatar,
    Button,
    Chip,
    Divider,
    IconButton,
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Navbar from '../components/navbar';

const departments = [
    { id: 1, name: 'Human Resources', employees: 14, status: 'Active' },
    { id: 2, name: 'Engineering', employees: 30, status: 'Active' },
    { id: 3, name: 'Sales', employees: 10, status: 'Inactive' },
    { id: 4, name: 'Marketing', employees: 8, status: 'Active' },
    { id: 5, name: 'IT Support', employees: 6, status: 'Inactive' },
];

const Departments = () => {
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

                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        sx={{
                            backgroundColor: '#7F00FF',
                            fontWeight: 500,
                            '&:hover': { backgroundColor: '#6900d1' },
                        }}
                    >
                        Add Department
                    </Button>
                </Box>

                {/* Summary Cards */}
                <Grid container spacing={3} sx={{ mb: 2 }}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper
                            elevation={2}
                            sx={{ p: '5px 10px', backgroundColor: '#fff', borderRadius: 3 }}
                        >
                            <Typography variant="subtitle2" sx={{ color: '#999' }}>
                                Total Departments
                            </Typography>
                            <Typography variant="h5" sx={{ fontWeight: 600 }}>
                                {departments.length}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper
                            elevation={2}
                            sx={{ p: '5px 10px', backgroundColor: '#fff', borderRadius: 3 }}
                        >
                            <Typography variant="subtitle2" sx={{ color: '#999' }}>
                                Active Departments
                            </Typography>
                            <Typography variant="h5" sx={{ fontWeight: 600 }}>
                                {
                                    departments.filter((dept) => dept.status === 'Active').length
                                }
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Department List */}
                <Box>
                    <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, mb: 2, color: '#333' }}
                    >
                        Department List
                    </Typography>

                    <Grid container spacing={3}>
                        {departments.map((dept, index) => (
                            <Grid item xs={12} sm={6} md={4} key={dept.id}>
                                <Paper
                                    elevation={1}
                                    sx={{
                                        p: 3,
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
                                        <Avatar sx={{ bgcolor: '#7F00FF' }}>
                                            <BusinessIcon />
                                        </Avatar>
                                        <IconButton>
                                            <MoreVertIcon />
                                        </IconButton>
                                    </Box>

                                    <Box>
                                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                            {dept.name}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{ color: '#777', fontSize: '14px' }}
                                        >
                                            {dept.employees} Employees
                                        </Typography>
                                    </Box>

                                    <Divider />

                                    <Chip
                                        label={dept.status}
                                        color={
                                            dept.status === 'Active' ? 'success' : 'default'
                                        }
                                        variant="outlined"
                                        sx={{ width: 'fit-content' }}
                                    />
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
};

export default Departments;
