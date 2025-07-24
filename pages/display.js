import {
    Box, Typography, Container, Grid, Divider, Button,
    Modal, TextField, CircularProgress, FormControl, InputLabel, Select,
    MenuItem, FormHelperText, InputAdornment,
} from '@mui/material';
import { useFetchedData } from '../components/DataContext';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { Email as EmailIcon, LocalPhone, InboxOutlined, Fingerprint, Wc, CalendarToday, BusinessCenter, WorkHistory } from '@mui/icons-material';
import Navbar from '../components/navbar';
import { useMessage } from '../components/MessageContext';

const EMPLOYMENT_DEPARTEMENT = {
    1: 'Human Resources (HR)',
    2: 'Finance & Accounting',
    3: 'Marketing & Sales',
    4: 'Operations',
    5: 'IT/Engineering'
};

export default function DisplayEmployee() {
    const { fetchedData: employees = [], loading } = useFetchedData();
    const [tempEmpData, setTempEmpData] = useState(null);
    const { showMessage } = useMessage();
    const [deleteConfirmation, setDeleteConfirmation] = useState({
        open: false,
        employeeId: null,
        employeeName: ''
    });

    const [editErrors, setEditErrors] = useState({});

    const handleEditClick = (employee) => {
        setTempEmpData(employee);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setTempEmpData(prev => ({ ...prev, [name]: value }));
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
    };

    const validateEditForm = () => {
        const newErrors = {};

        if (!tempEmpData) {
            return false;
        }

        if (!tempEmpData.name || tempEmpData.name.trim().length < 3) {
            newErrors.name = 'Name must be at least 3 characters long';
        }

        if (!tempEmpData.email || !validateEmail(tempEmpData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!tempEmpData.phoneNumber || !validatePhone(tempEmpData.phoneNumber)) {
            newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
        }

        if (!tempEmpData.gender || tempEmpData.gender === '') {
            newErrors.gender = 'Please select a gender';
        }

        if (!tempEmpData.age || tempEmpData.age < 18 || tempEmpData.age > 55) {
            newErrors.age = 'Age must be between 18 and 55';
        }

        if (!tempEmpData.department || tempEmpData.department === '') {
            newErrors.department = 'Please select a department';
        }

        if (!tempEmpData.position || tempEmpData.position === '') {
            newErrors.position = 'Please select a position';
        }

        if (!tempEmpData.employmentStatus || tempEmpData.employmentStatus === '') {
            newErrors.employmentStatus = 'Please select an employment status';
        }

        setEditErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const refreshEmployeeList = async () => {
        try {
            const response = await fetch('/api/service');
            const { data } = await response.json();
            if (Array.isArray(data)) {
                setEmployees(data);
            }
        } catch (error) {
            console.error('Error refreshing employee list:', error);
            showMessage('Error refreshing list', 'error');
        }
    };

    const handleSave = async () => {
        if (!validateEditForm()) {
            showMessage('Please input the correct data before saving', 'error');
            return;
        }
        try {
            const response = await fetch(`/api/service?id=${tempEmpData._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(tempEmpData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Server error:', errorData);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const { message } = await response.json();
            showMessage(message, 'success');

            // Refresh the list using the new function
            await refreshEmployeeList();

            setTempEmpData(null);
            setEditErrors({});
        } catch (error) {
            console.error('Error updating employee:', error);
            showMessage('Error updating employee', 'error');
        }
    };

    const handleDeleteClick = (employee) => {
        setDeleteConfirmation({
            open: true,
            employeeId: employee._id,
            employeeName: employee.name
        });
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/service?id=${deleteConfirmation.employeeId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Server error:', errorData);
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                showMessage("Data Deleted Successfully", 'success')
            }
            setEmployees((prevEmployees) =>
                prevEmployees.filter((emp) => emp._id !== deleteConfirmation.employeeId)
            );
            handleCloseDeleteModal();
        } catch (error) {
            showMessage('Error deleting employee:', error);
        }
    };

    const handleCloseDeleteModal = () => {
        setDeleteConfirmation({
            open: false,
            employeeId: null,
            employeeName: ''
        });
    };

    const handleClose = () => {
        setTempEmpData(null);
        setEditErrors({});
    };

    // const getEmploymentDepartementText = (statusCode) => EMPLOYMENT_DEPARTEMENT[statusCode] || 'Unknown';
    const getEmploymentDepartementText = (id) => EMPLOYMENT_DEPARTEMENT[id] || 'Unknown';
    return (
        <Box >
            <Navbar />
            <Container
                component="main"
                sx={{
                    padding: { xs: '0.5rem !important', sm: '1rem !important' },
                    borderRadius: '.5rem',
                    minHeight: '400px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    maxWidth: '100% !important',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: '1rem',
                        mb: 2,
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            fontSize: { xs: '1.2rem', sm: '1.5rem' },
                            textAlign: { xs: 'center', sm: 'left' },
                            flexGrow: 1,
                            fontFamily: 'Quicksand'
                        }}
                    >
                        Results Overview
                    </Typography>

                    <TextField
                        size="small"
                        variant="outlined"
                        placeholder="Search"
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: '5px',
                            width: { xs: '100%', sm: '300px' },
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon sx={{ cursor: 'pointer' }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>

                <Divider sx={{ marginBottom: '1rem', width: '100%' }} />

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        <CircularProgress />
                    </Box>
                ) : !employees || employees.length === 0 ? (
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1,
                        minHeight: '200px'
                    }}>
                        <InboxOutlined sx={{ fontSize: 60, color: 'grey.400', mb: 2 }} />
                        <Typography variant="h6" color="text.secondary">
                            No employees found
                        </Typography>
                    </Box>
                ) : (

                    // Listing Users

                    <Grid
                        container
                        sx={{
                            bgcolor: 'white',
                            borderRadius: 2,
                            boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                            fontFamily: 'Quicksand',
                            margin: 'auto',
                            userSelect: 'none',
                        }}
                    >
                        {/* Header Row */}
                        <Grid
                            container
                            sx={{
                                borderBottom: '3px solid #7F00FF',
                                color: '#7F00FF',
                                fontWeight: 'bold',
                                fontSize: '0.85rem',
                                paddingY: 1,
                                textAlign: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Grid item xs={1}>No</Grid>
                            <Grid item xs={2} sx={{ textAlign: 'left' }}>Name & Position</Grid>
                            <Grid item xs={1}>Email</Grid>
                            <Grid item xs={4}>Department</Grid>
                            <Grid item xs={1.5}>Status</Grid>
                            <Grid item xs={2} />
                        </Grid>

                        {/* Data Rows */}
                        {employees.map((employee, index) => (
                            <Grid
                                container
                                key={employee._id || index}
                                sx={{
                                    bgcolor: index % 2 === 0 ? '#f9f9f9' : 'transparent',
                                    alignItems: 'center',
                                    paddingY: 1,
                                    paddingX: 1,
                                    position: 'relative',
                                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                    color: '#333',
                                    '&:hover': { bgcolor: '#eae6ff' },
                                }}
                            >
                                {/* No */}
                                <Grid item xs={1} textAlign="center" fontWeight={600}>
                                    {index + 1}
                                </Grid>

                                {/* Avatar + Name + Position */}
                                <Grid
                                    item
                                    xs={2}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                        textAlign: 'left',
                                    }}
                                >

                                    <Box>
                                        <Typography fontWeight={600}>{employee.name}</Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {employee.position}
                                        </Typography>
                                    </Box>
                                </Grid>

                                {/* Email */}
                                <Grid item xs={2.5} sx={{ display: 'flex', flexDirection: 'column', gap: 0.3 }}>
                                    <Typography sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <EmailIcon fontSize="small" /> {employee.email}
                                    </Typography>
                                </Grid>

                                {/* Department */}
                                <Grid
                                    item
                                    xs={3}
                                    sx={{ display: 'flex', alignItems: 'center', gap: 0.5, textTransform: 'capitalize' }}
                                >
                                    <BusinessCenter fontSize="small" /> {getEmploymentDepartementText(employee.department)}
                                </Grid>

                                {/* Employment Status */}
                                <Grid
                                    item
                                    xs={1.5}
                                    sx={{
                                        fontWeight: 600,
                                        color:
                                            employee.employmentStatus === 'Full Time'
                                                ? '#388e3c'
                                                : '#f57c00',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 0.5,
                                        textTransform: 'capitalize',
                                    }}
                                >
                                    <WorkHistory fontSize="small" /> {employee.employmentStatus || 'N/A'}
                                </Grid>

                                {/* Actions */}
                                <Grid
                                    item
                                    xs={2}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        gap: 1,
                                    }}
                                >
                                    {employee.empStatus === 'edited' && (
                                        <EditIcon
                                            color="primary"
                                            sx={{ fontSize: 20, alignSelf: 'center', mr: 1 }}
                                            titleAccess="Edited"
                                        />
                                    )}

                                    <Button
                                        variant="outlined"
                                        color="success"
                                        size="small"
                                        sx={{ fontWeight: 'bold', textTransform: 'none' }}
                                        onClick={() => handleEditClick(employee)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        size="small"
                                        sx={{ fontWeight: 'bold', textTransform: 'none' }}
                                        onClick={() => handleDeleteClick(employee)}
                                    >
                                        Delete
                                    </Button>
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                )}

                {/* Edit Modal */}

                {tempEmpData && (
                    <Modal open={Boolean(tempEmpData)} onClose={handleClose}>
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: { xs: '95%', sm: '600px' },
                                maxHeight: { xs: '90vh', sm: '80vh' },
                                overflow: 'auto',
                                bgcolor: 'white',
                                borderRadius: '8px',
                                boxShadow: 24,
                                p: { xs: 2, sm: 4 },
                            }}
                        >
                            <Typography variant="h6" component="h2" mb={2}>
                                Edit Employee
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <TextField
                                    label="Full Name"
                                    name="name"
                                    value={tempEmpData.name}
                                    onChange={handleInputChange}
                                    fullWidth
                                    error={!!editErrors.name}
                                    helperText={editErrors.name}
                                />
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <TextField
                                        label="Email"
                                        name="email"
                                        value={tempEmpData.email}
                                        onChange={handleInputChange}
                                        fullWidth
                                        error={!!editErrors.email}
                                        helperText={editErrors.email}
                                    />
                                    <TextField
                                        label="Phone"
                                        name="phoneNumber"
                                        value={tempEmpData.phoneNumber}
                                        onChange={handleInputChange}
                                        sx={{ width: '200px' }}
                                        error={!!editErrors.phoneNumber}
                                        helperText={editErrors.phoneNumber}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <FormControl
                                        sx={{ width: '200px' }}
                                        error={!!editErrors.gender}
                                    >
                                        <InputLabel>Gender</InputLabel>
                                        <Select
                                            name="gender"
                                            value={tempEmpData.gender}
                                            label="Gender"
                                            onChange={handleInputChange}
                                        >
                                            <MenuItem value="Male">Male</MenuItem>
                                            <MenuItem value="Female">Female</MenuItem>
                                        </Select>
                                        {editErrors.gender && (
                                            <FormHelperText>{editErrors.gender}</FormHelperText>
                                        )}
                                    </FormControl>
                                    <TextField
                                        label="Age"
                                        name="age"
                                        type="number"
                                        value={tempEmpData.age}
                                        onChange={handleInputChange}
                                        sx={{ width: '150px' }}
                                        error={!!editErrors.age}
                                        helperText={editErrors.age}
                                        InputProps={{ inputProps: { min: 18, max: 100 } }}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <FormControl
                                        sx={{ width: '50%' }}
                                        error={!!editErrors.department}
                                    >
                                        <InputLabel>Department</InputLabel>
                                        <Select
                                            name="department"
                                            value={tempEmpData.department || ''}
                                            label="Department"
                                            onChange={handleInputChange}
                                        >
                                            <MenuItem value={1}>Human Resources (HR)</MenuItem>
                                            <MenuItem value={2}>Finance & Accounting</MenuItem>
                                            <MenuItem value={3}>Marketing & Sales</MenuItem>
                                            <MenuItem value={4}>Operations</MenuItem>
                                            <MenuItem value={5}>IT/Engineering</MenuItem>
                                        </Select>
                                        {editErrors.department && (
                                            <FormHelperText>{editErrors.department}</FormHelperText>
                                        )}
                                    </FormControl>
                                    <FormControl
                                        sx={{ width: '50%' }}
                                        error={!!editErrors.position}
                                    >
                                        <InputLabel>Position</InputLabel>
                                        <Select
                                            name="position"
                                            value={tempEmpData.position}
                                            label="Position"
                                            onChange={handleInputChange}
                                        >
                                            <MenuItem value="Team Leader">Team Leader</MenuItem>
                                            <MenuItem value="Assistant">Assistant</MenuItem>
                                            <MenuItem value="Member">Member</MenuItem>
                                        </Select>
                                        {editErrors.position && (
                                            <FormHelperText>{editErrors.position}</FormHelperText>
                                        )}
                                    </FormControl>
                                </Box>
                                <FormControl
                                    fullWidth
                                    error={!!editErrors.employmentStatus}
                                >
                                    <InputLabel>Employment Status</InputLabel>
                                    <Select
                                        name="employmentStatus"
                                        value={tempEmpData.employmentStatus}
                                        label="Employment Status"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value={"Full Time"}>Full Time</MenuItem>
                                        <MenuItem value={'Part Time'}>Part Time</MenuItem>
                                        <MenuItem value={'Contract'}>Contract</MenuItem>
                                        <MenuItem value={'Internship'}>Internship</MenuItem>
                                    </Select>
                                    {editErrors.employmentStatus && (
                                        <FormHelperText>{editErrors.employmentStatus}</FormHelperText>
                                    )}
                                </FormControl>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                                    <Button onClick={handleClose} variant="outlined" color="secondary">
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleSave}
                                        variant="contained"
                                        color="primary"
                                        sx={{
                                            padding: '0.8rem 2rem',
                                            fontSize: '1.1rem',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        Save Changes
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Modal>
                )}

                {/* Delete Modal */}

                <Modal
                    open={deleteConfirmation.open}
                    onClose={handleCloseDeleteModal}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: { xs: '90%', sm: '400px' },
                            bgcolor: 'background.paper',
                            borderRadius: '8px',
                            boxShadow: 24,
                            p: { xs: 2, sm: 4 },
                        }}
                    >
                        <Typography variant="h6" component="h2" mb={2}>
                            Confirm Delete
                        </Typography>
                        <Typography mb={3}>
                            Are you sure you want to delete {deleteConfirmation.employeeName}? This action cannot be undone.
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                            <Button
                                onClick={handleCloseDeleteModal}
                                variant="outlined"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleDelete}
                                variant="contained"
                                color="error"
                            >
                                Delete
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </Container>
        </Box >
    );
}
