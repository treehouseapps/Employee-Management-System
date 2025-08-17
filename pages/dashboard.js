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
import { useFetchedData } from '../context/DataContext';

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
            <Box sx={{ padding: { xs: '1rem', md: '1rem 2rem' }, position: 'relative' }}>
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

                <Typography
                    variant="h4"
                    component="h1"
                    sx={{
                        fontWeight: 'bold',
                        color: 'black',
                        fontFamily: 'Quicksand',
                        marginBottom: 3,
                        fontSize: { xs: '1.5rem', md: '2rem' }
                    }}
                >
                    Dashboard Overview
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                        <Grid container spacing={2}>
                            {[
                                {
                                    title: 'Total Employees',
                                    value: dashboardData.totalEmployees,
                                    icon: <GroupsIcon sx={{ color: 'white', fontSize: '1.8rem' }} />,
                                    color: '#FFB343'
                                },
                                {
                                    title: 'Total Departments',
                                    value: dashboardData.totalDepartments,
                                    icon: <GroupsIcon sx={{ color: 'white', fontSize: '1.8rem' }} />,
                                    color: '#0066FF'
                                },
                                {
                                    title: 'Gender Distribution',
                                    value: null,
                                    icon: null,
                                    color: '#7C3AED'
                                }
                            ].map((card, i) => (
                                <Grid item xs={6} sm={6} md={4} key={i}>
                                    <Box
                                        display='flex'
                                        flexDirection='column'
                                        alignItems='center'
                                        boxShadow='1px 1px 10px 1px lightgray'
                                        padding='1rem'
                                        borderRadius={2}
                                        bgcolor='white'
                                        minHeight='200px'
                                    >
                                        {card.icon && (
                                            <Box sx={{ backgroundColor: card.color, p: 1, borderRadius: '20%', mb: 1 }}>
                                                {card.icon}
                                            </Box>
                                        )}
                                        {card.title === 'Gender Distribution' ? (
                                            <>
                                                <Typography fontWeight='bold' fontSize='.8rem' mb={1}>Gender Distribution</Typography>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={6} display='flex' alignItems='center' justifyContent='center' gap={1}>
                                                        <Man color='primary' /> <Typography>{dashboardData.genderDistribution.male}</Typography>
                                                    </Grid>
                                                    <Grid item xs={6} display='flex' alignItems='center' justifyContent='center' gap={1}>
                                                        <Woman color='secondary' /> <Typography>{dashboardData.genderDistribution.female}</Typography>
                                                    </Grid>
                                                </Grid>
                                            </>
                                        ) : (
                                            <>
                                                <Typography fontWeight='bold' fontSize='.8rem'>{card.title}</Typography>
                                                <Typography fontSize={17} fontWeight='bold'>{card.value}</Typography>
                                                <Typography fontSize='13px' mt={0.5} mb={1}>Task</Typography>
                                                <Typography color='#0BDA51' fontSize='13px'>+35% This Month</Typography>
                                            </>
                                        )}
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>

                        <Box mt={4}>
                            <Typography variant='h6' fontWeight='bold' mb={2}>Employees by Department</Typography>
                            <Grid container spacing={2}>
                                {[
                                    { title: 'Human Resources', icon: <GroupOutlined />, bg: '#E3F2FD', iconColor: '#1976D2', count: dashboardData.departmentDistribution.HR },
                                    { title: 'Finance', icon: <AccountBalanceWalletOutlined />, bg: '#FFF3E0', iconColor: '#FB8C00', count: dashboardData.departmentDistribution.Finance },
                                    { title: 'Operations', icon: <BuildOutlined />, bg: '#F1F8E9', iconColor: '#689F38', count: dashboardData.departmentDistribution.Operations },
                                    { title: 'Engineering', icon: <MemoryOutlined />, bg: '#F3E5F5', iconColor: '#9C27B0', count: dashboardData.departmentDistribution.IT },
                                    { title: 'Marketing', icon: <TrendingUpOutlined />, bg: '#FFFDE7', iconColor: '#FBC02D', count: dashboardData.departmentDistribution.Marketing }
                                ].map((dept, i) => (
                                    <Grid item xs={12} sm={6} md={4} key={i}>
                                        <Box display='flex' alignItems='center' bgcolor='white' borderRadius={3} p={2} boxShadow='0 2px 10px rgba(0,0,0,0.05)'>
                                            <Box display='flex' alignItems='center' justifyContent='center' width={50} height={50} borderRadius='12px' mr={2} sx={{ backgroundColor: dept.bg, color: dept.iconColor }}>
                                                {dept.icon}
                                            </Box>
                                            <Box>
                                                <Typography fontWeight={600} fontSize='1rem' color='#333'>{dept.title}</Typography>
                                                <Typography fontSize='0.85rem' color='gray'>{dept.count} Employees</Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Piechart data={statusData} />
                        <TopEmployeesList />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default Dashboard;
