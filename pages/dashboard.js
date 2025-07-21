import { Box, Typography, Divider, Backdrop, CircularProgress } from '@mui/material';
import {
    Apartment,
    BusinessCenter,
    AccountBalance,
    Engineering,
    Groups as GroupsIcon,
    Man as ManIcon,
    Memory,
    Woman as WomanIcon,
    Storefront
} from '@mui/icons-material';
import { useState, useEffect } from 'react';
import Navbar from '../components/navbar';

const Dashboard = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch('/api/service')
            .then((response) => response.json())
            .then(({ message, data }) => {
                if (Array.isArray(data)) {
                    setEmployees(data);
                } else {
                    console.error('Invalid data format:', data);
                }
            })
            .catch((error) => console.error('Error fetching employees:', error))
            .finally(() => setLoading(false));
    }, []);

    const dashboardData = {
        totalEmployees: employees?.length || 0,
        totalDepartments: new Set(employees?.map(emp => emp?.department) || []).size,
        genderDistribution: {
            male: employees?.filter(emp => emp?.gender === 'Male')?.length || 0,
            female: employees?.filter(emp => emp?.gender === 'Female')?.length || 0
        },
        departmentDistribution: {
            HR: employees?.filter(emp => emp?.department === 1)?.length || 0,
            Finance: employees?.filter(emp => emp?.department === 2)?.length || 0,
            Marketing: employees?.filter(emp => emp?.department === 3)?.length || 0,
            Operations: employees?.filter(emp => emp?.department === 4)?.length || 0,
            IT: employees?.filter(emp => emp?.department === 5)?.length || 0
        },
        employmentStatus: {
            fulltime: employees?.filter(emp => emp?.employmentStatus === 'Full Time')?.length || 0,
            parttime: employees?.filter(emp => emp?.employmentStatus === 'Part Time')?.length || 0,
            contract: employees?.filter(emp => emp?.employmentStatus === 'Contract')?.length || 0,
            internship: employees?.filter(emp => emp?.employmentStatus === 'Internship')?.length || 0
        }
    };

    return (
        <Box>
            <Navbar />
            <Box sx={{
                padding: { xs: '0.5rem 1rem', md: '1rem 2rem' },
                position: 'relative',
            }}>
                <Backdrop
                    sx={{
                        color: '#fff',
                        position: 'absolute',
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                        backgroundColor: 'rgba(255, 255, 255, 0.7)'
                    }}
                    open={loading}
                >
                    <CircularProgress color="primary" />
                </Backdrop>
                <Typography variant="h4" component="h1" sx={{
                    fontWeight: 'bold',
                    color: 'black',
                    marginLeft: { xs: '2rem', md: 0 },
                    fontSize: { xs: '1.5rem', md: '2rem' },
                }}>
                    Dashboard Overview
                </Typography>
                <Box display='grid'
                    gridTemplateColumns={{
                        xs: '1fr',
                        sm: 'repeat(2, 1fr)',
                        md: 'repeat(3, 1fr)'
                    }}
                    gap={2}>
                    <Box
                        display='inline-block'
                        alignItems='center'
                        justifyContent='center'
                        margin={2}
                        height='max-content'
                        padding={'.5rem 1rem'}
                        pr={4}
                        backgroundColor='white'
                        borderRadius={4}
                        width='max-content'>
                        <Box sx={{
                            backgroundColor: '#FFB343',
                            p: '0px 2px',
                            borderRadius: '20%',
                            width: 'max-content',
                            mt: '1rem'
                        }}>
                            <GroupsIcon sx={{ color: 'white', fontSize: '1.8rem' }} />
                        </Box>
                        <Box p={'.2rem'}>
                            <Typography sx={{
                                fontWeight: 'bold', margin: '.5rem 0rem',
                                fontSize: '.8rem',
                            }}>
                                Total Employees
                            </Typography>
                            <Typography fontSize={17} fontWeight={'bold'}>23{dashboardData.totalEmployees}0.5</Typography>
                            <Typography fontSize={'13px'} mb={'1rem'} mt={'.2rem'}>Task</Typography>
                            <Typography color='#0BDA51' fontSize={'13px'}>+35% This Month</Typography>
                        </Box>
                    </Box>
                    <Box
                        display='inline-block'
                        alignItems='center'
                        justifyContent='center'
                        margin={2}
                        height='max-content'
                        padding={'.5rem 1rem'}
                        pr={4}
                        backgroundColor='white'
                        borderRadius={4}
                        width='max-content'>
                        <Box sx={{
                            backgroundColor: '#FFB343',
                            p: '0px 2px',
                            borderRadius: '20%',
                            width: 'max-content',
                            mt: '1rem'
                        }}>
                            <GroupsIcon sx={{ color: 'white', fontSize: '1.8rem' }} />
                        </Box>
                        <Box p={'.2rem'}>
                            <Typography sx={{
                                fontWeight: 'bold', margin: '.5rem 0rem',
                                fontSize: '.8rem',
                            }}>
                                Total Departments
                            </Typography>
                            <Typography fontSize={17} fontWeight={'bold'}>1{dashboardData.totalDepartments}97</Typography>
                            <Typography fontSize={'13px'} mb={'1rem'} mt={'.2rem'}>Task</Typography>
                            <Typography color='#0BDA51' fontSize={'13px'}>5% This Month</Typography>
                        </Box>
                    </Box>
                </Box>
                <Divider sx={{ margin: '.5rem' }} />
                <Box p={1}>
                    <Typography mt={1} variant="h4" component="h1" sx={{
                        fontWeight: 'bold',
                        color: 'black',
                        fontSize: '0.9rem',
                    }}>
                        Employees Department
                    </Typography>
                    <Box display='grid'
                        gridTemplateColumns={{
                            xs: '1fr',              // Single column on mobile
                            sm: 'repeat(2, 1fr)',   // Two columns on tablet
                            md: 'repeat(3, 1fr)'    // Three columns on desktop
                        }}
                        gap={1}
                    >
                        <Box
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            margin={1.5}
                            height='max-content'
                            borderRadius={2}
                            width={{ xs: '100%', sm: 'max-content' }} // Full width on mobile
                        >
                            <Box sx={{
                                backgroundColor: 'skyblue',
                                padding: '0.7rem',
                                borderTopLeftRadius: '20%',
                                borderBottomLeftRadius: '20%',
                                height: '3rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <BusinessCenter
                                    sx={{ color: 'white', fontSize: '1.8rem' }} />
                            </Box>
                            <Box p={1.5} backgroundColor='white' sx={{
                                height: '3rem',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center'
                            }}>
                                <Typography variant="h6" component="h2" sx={{
                                    fontWeight: 'bold',
                                    fontSize: '0.9rem',
                                }}>
                                    Human Resources (HR)
                                </Typography>
                                <Typography sx={{ fontSize: '0.9rem' }}>{dashboardData.departmentDistribution.HR}</Typography>
                            </Box>
                        </Box>
                        <Box
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            margin={1.5}
                            height='max-content'
                            borderRadius={2}
                            width={{ xs: '100%', sm: 'max-content' }} // Full width on mobile
                        >
                            <Box sx={{
                                backgroundColor: 'skyblue',
                                padding: '0.7rem',
                                borderTopLeftRadius: '20%',
                                borderBottomLeftRadius: '20%',
                                height: '3rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <AccountBalance
                                    sx={{ color: 'white', fontSize: '1.8rem' }} />
                            </Box>
                            <Box p={1.5} backgroundColor='white' sx={{
                                height: '3rem',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center'
                            }}>
                                <Typography variant="h6" component="h2" sx={{
                                    fontWeight: 'bold',
                                    fontSize: '0.9rem',
                                }}>
                                    Finance & Accounting
                                </Typography>
                                <Typography sx={{ fontSize: '0.9rem' }}>{dashboardData.departmentDistribution.Finance}</Typography>
                            </Box>
                        </Box>
                        <Box
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            margin={1.5}
                            height='max-content'
                            borderRadius={2}
                            width={{ xs: '100%', sm: 'max-content' }} // Full width on mobile
                        >
                            <Box sx={{
                                backgroundColor: 'skyblue',
                                padding: '0.7rem',
                                borderTopLeftRadius: '20%',
                                borderBottomLeftRadius: '20%',
                                height: '3rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Engineering
                                    sx={{ color: 'white', fontSize: '1.8rem' }} />
                            </Box>
                            <Box p={1.5} backgroundColor='white' sx={{
                                height: '3rem',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center'
                            }}>
                                <Typography variant="h6" component="h2" sx={{
                                    fontWeight: 'bold',
                                    fontSize: '0.9rem',
                                }}>
                                    Operations
                                </Typography>
                                <Typography sx={{ fontSize: '0.9rem' }}>{dashboardData.departmentDistribution.Operations}</Typography>
                            </Box>
                        </Box>
                        <Box
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            margin={1.5}
                            height='max-content'
                            borderRadius={2}
                            width={{ xs: '100%', sm: 'max-content' }} // Full width on mobile
                        >
                            <Box sx={{
                                backgroundColor: 'skyblue',
                                padding: '0.7rem',
                                borderTopLeftRadius: '20%',
                                borderBottomLeftRadius: '20%',
                                height: '3rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Memory
                                    sx={{ color: 'white', fontSize: '1.8rem' }} />
                            </Box>
                            <Box p={1.5} backgroundColor='white' sx={{
                                height: '3rem',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center'
                            }}>
                                <Typography variant="h6" component="h2" sx={{
                                    fontWeight: 'bold',
                                    fontSize: '0.9rem',
                                }}>
                                    IT/Engineering
                                </Typography>
                                <Typography sx={{ fontSize: '0.9rem' }}>{dashboardData.departmentDistribution.IT}</Typography>
                            </Box>
                        </Box>
                        <Box
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            margin={1.5}
                            height='max-content'
                            borderRadius={2}
                            width={{ xs: '100%', sm: 'max-content' }} // Full width on mobile
                        >
                            <Box sx={{
                                backgroundColor: 'skyblue',
                                padding: '0.7rem',
                                borderTopLeftRadius: '20%',
                                borderBottomLeftRadius: '20%',
                                height: '3rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Storefront
                                    sx={{ color: 'white', fontSize: '1.8rem' }} />
                            </Box>
                            <Box p={1.5} backgroundColor='white' sx={{
                                height: '3rem',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center'
                            }}>
                                <Typography variant="h6" component="h2" sx={{
                                    fontWeight: 'bold',
                                    fontSize: '0.9rem',
                                }}>
                                    Marketing & Sales
                                </Typography>
                                <Typography sx={{ fontSize: '0.9rem' }}>{dashboardData.departmentDistribution.Marketing}</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Divider sx={{ margin: '.5rem' }} />

                <Box p={1}>
                    <Typography mt={1} variant="h4" component="h1" sx={{
                        fontWeight: 'bold',
                        color: 'black',
                        fontSize: { xs: '0.9rem', md: '1rem' },
                    }}>
                        Employment Status
                    </Typography>
                    <Box display='grid'
                        gridTemplateColumns={{
                            xs: '1fr',              // Single column on mobile
                            sm: 'repeat(2, 1fr)',   // Two columns on tablet
                            md: 'repeat(4, 1fr)'    // Four columns on desktop
                        }}
                        gap={2}>
                        <Box
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            margin={2}
                            height='max-content'
                            borderRadius={2}
                            width='max-content'>
                            <Box sx={{
                                backgroundColor: 'skyblue',
                                padding: '1rem',
                                borderTopLeftRadius: '20%',
                                borderBottomLeftRadius: '20%',
                                height: '4rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <GroupsIcon
                                    sx={{ color: 'white', fontSize: '2.2rem' }} />
                            </Box>
                            <Box p={2} backgroundColor='white' sx={{
                                height: '4rem',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center'
                            }}>
                                <Typography variant="h6" component="h2" sx={{
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                }}>
                                    Full Time
                                </Typography>
                                <Typography sx={{ fontSize: '1rem' }}>{dashboardData.employmentStatus.fulltime}</Typography>
                            </Box>
                        </Box>
                        <Box
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            margin={2}
                            height='max-content'
                            borderRadius={2}
                            width='max-content'>
                            <Box sx={{
                                backgroundColor: 'skyblue',
                                padding: '1rem',
                                borderTopLeftRadius: '20%',
                                borderBottomLeftRadius: '20%',
                                height: '4rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <GroupsIcon
                                    sx={{ color: 'white', fontSize: '2.2rem' }} />
                            </Box>
                            <Box p={2} backgroundColor='white' sx={{
                                height: '4rem',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center'
                            }}>
                                <Typography variant="h6" component="h2" sx={{
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                }}>
                                    Part Time
                                </Typography>
                                <Typography sx={{ fontSize: '1rem' }}>{dashboardData.employmentStatus.parttime}</Typography>
                            </Box>
                        </Box>
                        <Box
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            margin={2}
                            height='max-content'
                            borderRadius={2}
                            width='max-content'>
                            <Box sx={{
                                backgroundColor: 'skyblue',
                                padding: '1rem',
                                borderTopLeftRadius: '20%',
                                borderBottomLeftRadius: '20%',
                                height: '4rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <GroupsIcon
                                    sx={{ color: 'white', fontSize: '2.2rem' }} />
                            </Box>
                            <Box p={2} backgroundColor='white' sx={{
                                height: '4rem',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center'
                            }}>
                                <Typography variant="h6" component="h2" sx={{
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                }}>
                                    Internship
                                </Typography>
                                <Typography sx={{ fontSize: '1rem' }}>{dashboardData.employmentStatus.internship}</Typography>
                            </Box>
                        </Box>
                        <Box
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            margin={2}
                            height='max-content'
                            borderRadius={2}
                            width='max-content'>
                            <Box sx={{
                                backgroundColor: 'skyblue',
                                padding: '1rem',
                                borderTopLeftRadius: '20%',
                                borderBottomLeftRadius: '20%',
                                height: '4rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <GroupsIcon
                                    sx={{ color: 'white', fontSize: '2.2rem' }} />
                            </Box>
                            <Box p={2} backgroundColor='white' sx={{
                                height: '4rem',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center'
                            }}>
                                <Typography variant="h6" component="h2" sx={{
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                }}>
                                    Contract
                                </Typography>
                                <Typography sx={{ fontSize: '1rem' }}>{dashboardData.employmentStatus.contract}</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box >
    );
}

export default Dashboard;