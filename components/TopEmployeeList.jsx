import { Box, Typography, Avatar, CircularProgress } from '@mui/material';
import { useFetchedData } from '../context/DataContext';

const EMPLOYMENT_DEPARTEMENT = {
    1: 'Human Resources (HR)',
    2: 'Finance & Accounting',
    3: 'Marketing & Sales',
    4: 'Operations',
    5: 'IT/Engineering',
};

const TopEmployeesList = () => {
    const { fetchedData: employees = [], loading } = useFetchedData();

    if (loading) {
        return (
            <Box
                p={3}
                bgcolor="white"
                borderRadius={3}
                boxShadow="0 4px 16px rgba(0,0,0,0.08)"
                fontFamily="Quicksand"
                maxWidth={500}
                textAlign="center"
            >
                <CircularProgress />
                <Typography mt={2} fontWeight="bold">Loading Top Employees...</Typography>
            </Box>
        );
    }

    if (employees.length === 0) {
        return (
            <Box
                p={3}
                bgcolor="white"
                borderRadius={3}
                boxShadow="0 4px 16px rgba(0,0,0,0.08)"
                fontFamily="Quicksand"
                maxWidth={500}
                textAlign="center"
            >
                <Typography fontWeight="bold" color="text.secondary">
                    No employees found.
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            p={3}
            pt={0}
            bgcolor="white"
            borderRadius={3}
            boxShadow="0 4px 16px rgba(0,0,0,0.08)"
            fontFamily="Quicksand"
            maxWidth={600}
            sx={{ userSelect: 'none' }}
        >
            <Typography fontWeight="bold" mb={1} color="#222">
                🌟 Top Employees
            </Typography>

            {/* Header Row */}
            <Box
                display="grid"
                gridTemplateColumns="40px 2fr 2fr 1.5fr"
                fontWeight="bold"
                color="#1976d2"
                borderBottom="2px solid #1976d2"
                pb={1}
                mb={1}
                fontSize="0.8rem"
            >
                <Box>No</Box>
                <Box>Name</Box>
                <Box>Department</Box>
                <Box>Status</Box>
            </Box>

            {/* Data Rows */}
            {employees.slice(0, 4).map(({ _id, name, department, employmentStatus }, index) => (
                <Box
                    key={_id || index}
                    display="grid"
                    gridTemplateColumns="40px 2fr 2fr 1.5fr"
                    alignItems="center"
                    py={1}
                    px={0.5}
                    borderRadius={1}
                    sx={{
                        bgcolor: index % 2 === 0 ? '#f5f7fa' : 'transparent',
                        transition: 'background-color 0.25s ease',
                        '&:hover': { bgcolor: '#e3f2fd' },
                        cursor: 'default',
                    }}
                    fontSize="0.8rem"
                    color="#333"
                >
                    <Box textAlign="center" fontWeight="600">{index + 1}</Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 600 }}>

                        <Avatar
                            sx={{ width: 28, height: 28, fontSize: '0.75rem', bgcolor: '#1976d2' }}
                            alt={name}
                            src=""
                        >
                            {name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                        </Avatar>
                        {name}
                    </Box>

                    <Box sx={{ textTransform: 'capitalize' }}>
                        {EMPLOYMENT_DEPARTEMENT[department] || 'Unknown'}
                    </Box>

                    <Box
                        sx={{
                            fontWeight: 600,
                            textTransform: 'capitalize',
                            color: employmentStatus === 'Full Time' ? '#388e3c' : '#f57c00',
                        }}
                    >
                        {employmentStatus || 'N/A'}
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default TopEmployeesList;
