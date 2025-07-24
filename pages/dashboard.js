import { Box, Typography, Backdrop, CircularProgress, Grid } from '@mui/material';
import {
    Groups as GroupsIcon,
    Man,
    Woman,
    GroupOutlined,
    AccountBalanceWalletOutlined,
    BuildOutlined,
    MemoryOutlined,
    TrendingUpOutlined
} from '@mui/icons-material';
import Navbar from '../components/navbar';
import Piechart from '../components/piechart';
import TopEmployeesList from '../components/TopEmployeeList';
import { useFetchedData } from '../components/DataContext';

const Dashboard = () => {
    const { fetchedData: employees = [], loading } = useFetchedData();

    const dashboardData = {
        totalEmployees: employees?.length || 0,
        totalDepartments: new Set(employees?.map(emp => emp?.department) || []).size,

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
        },
        genderDistribution: {
            male: employees?.filter(emp => emp?.gender === 'Male')?.length || 0,
            female: employees?.filter(emp => emp?.gender === 'Female')?.length || 0
        }

    };
    const statusData = [
        { name: 'Full Time', value: dashboardData.employmentStatus.fulltime },
        { name: 'Part Time', value: dashboardData.employmentStatus.parttime },
        { name: 'Contract', value: dashboardData.employmentStatus.contract },
        { name: 'Internship', value: dashboardData.employmentStatus.internship },
    ];

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
                    fontFamily: 'Quicksand',
                    marginLeft: { xs: '2rem', md: 0 },
                    fontSize: { xs: '1.5rem', md: '2rem' },
                }}>
                    Dashboard Overview
                </Typography>
                <Box display={'grid'} gridTemplateColumns={'2fr 1fr'}>
                    <Box >
                        <Box display='grid'
                            gridTemplateColumns={{
                                xs: '1fr',
                                sm: 'repeat(3, 1fr)',
                                md: 'repeat(5, 1fr)'
                            }}
                        >
                            <Box
                                display='inline-block'
                                boxShadow={'1px 1px 10px 1px lightgray'}
                                alignItems='center'
                                justifyContent='center'
                                margin={2}
                                height='max-content'
                                padding={'.5rem 1rem'}
                                pr={4}
                                backgroundColor='white'
                                borderRadius={4}
                                width='max-content'
                                minHeight='200px' >
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
                                boxShadow={'1px 1px 10px 1px lightgray'}
                                alignItems='center'
                                justifyContent='center'
                                margin={2}
                                height='max-content'
                                padding={'.5rem 1rem'}
                                pr={4}
                                backgroundColor='white'
                                borderRadius={4}
                                width='max-content'
                                minHeight='200px' >
                                <Box sx={{
                                    backgroundColor: '#0066FF',
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
                            <Box
                                display='inline-block'
                                boxShadow={'1px 1px 10px 1px lightgray'}
                                alignItems='center'
                                justifyContent='center'
                                margin={2}
                                height='max-content'
                                padding={'.5rem 1rem'}
                                pr={4}
                                backgroundColor='white'
                                borderRadius={4}
                                width='max-content'
                                minHeight='200px' >
                                <Box sx={{
                                    backgroundColor: '#7C3AED',
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
                                    }}>Gender Distribution</Typography>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item xs={6} display="flex" alignItems="center" gap={1}>
                                            <Man color="primary" />
                                            <Typography>{dashboardData.genderDistribution.male}</Typography>
                                        </Grid>
                                        <Grid item xs={6} display="flex" alignItems="center" gap={1}>
                                            <Woman color="secondary" />
                                            <Typography>{dashboardData.genderDistribution.female}</Typography>
                                        </Grid>
                                    </Grid>

                                </Box>
                            </Box>
                        </Box>
                        <Box p={2} fontFamily="Quicksand">
                            <Typography
                                variant="h6"
                                component="h2"
                                fontWeight="bold"
                                mb={2}
                                sx={{ color: '#333', fontSize: '1.1rem' }}
                            >
                                Employees by Department
                            </Typography>

                            <Box
                                display="grid"
                                gridTemplateColumns={{ xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
                                gap={3}
                            >
                                {[
                                    {
                                        title: 'Human Resources',
                                        icon: <GroupOutlined />,
                                        bg: '#E3F2FD',
                                        iconColor: '#1976D2',
                                        count: dashboardData.departmentDistribution.HR,
                                    },
                                    {
                                        title: 'Finance',
                                        icon: <AccountBalanceWalletOutlined />,
                                        bg: '#FFF3E0',
                                        iconColor: '#FB8C00',
                                        count: dashboardData.departmentDistribution.Finance,
                                    },
                                    {
                                        title: 'Operations',
                                        icon: <BuildOutlined />,
                                        bg: '#F1F8E9',
                                        iconColor: '#689F38',
                                        count: dashboardData.departmentDistribution.Operations,
                                    },
                                    {
                                        title: 'Engineering',
                                        icon: <MemoryOutlined />,
                                        bg: '#F3E5F5',
                                        iconColor: '#9C27B0',
                                        count: dashboardData.departmentDistribution.IT,
                                    },
                                    {
                                        title: 'Marketing',
                                        icon: <TrendingUpOutlined />,
                                        bg: '#FFFDE7',
                                        iconColor: '#FBC02D',
                                        count: dashboardData.departmentDistribution.Marketing,
                                    },
                                ].map((dept, i) => (
                                    <Box
                                        key={i}
                                        display="flex"
                                        alignItems="center"
                                        bgcolor="white"
                                        borderRadius={3}
                                        p={2}
                                        boxShadow="0 2px 10px rgba(0,0,0,0.05)"
                                        sx={{
                                            transition: 'transform 0.2s ease',
                                            '&:hover': {
                                                transform: 'translateY(-4px)',
                                                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                                            },
                                        }}
                                    >
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            width={50}
                                            height={50}
                                            borderRadius="12px"
                                            mr={2}
                                            sx={{ backgroundColor: dept.bg, color: dept.iconColor }}
                                        >
                                            {dept.icon}
                                        </Box>

                                        <Box>
                                            <Typography fontWeight={600} fontSize="1rem" color="#333">
                                                {dept.title}
                                            </Typography>
                                            <Typography fontSize="0.85rem" color="gray">
                                                {dept.count} Employees
                                            </Typography>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </Box>

                    </Box>
                    <Box>
                        <Box sx={{ marginTop: '-30px' }}>
                            <Piechart data={statusData} />
                        </Box>
                        <TopEmployeesList />
                    </Box>
                </Box>

            </Box>
        </Box >
    );
}

export default Dashboard;