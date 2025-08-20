import {
    Box, Typography, Container, Grid, Divider, Button,
    Modal, TextField, CircularProgress, FormControl, InputLabel, Select,
    MenuItem, FormHelperText, InputAdornment, Card, Avatar,
} from '@mui/material';
import { useFetchedData } from '../context/DataContext';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { Email as EmailIcon, LocalPhone, InboxOutlined, Fingerprint, Wc, CalendarToday, BusinessCenter, WorkHistory } from '@mui/icons-material';
import Navbar from '../components/navbar';
import { useMessage } from '../context/MessageContext';
import EditModal from '../components/modal/EditModal';
import DeleteModal from '../components/modal/DeleteModal';

const EMPLOYMENT_DEPARTEMENT = {
    1: 'Human Resources (HR)',
    2: 'Finance & Accounting',
    3: 'Marketing & Sales',
    4: 'Operations',
    5: 'IT/Engineering'
};

export default function DisplayEmployee() {
    const { fetchedData: employees = [], setFetchedData, loading } = useFetchedData();
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
            setFetchedData((prevEmployees) =>
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

    const getEmploymentDepartementText = (id) => EMPLOYMENT_DEPARTEMENT[id] || 'Unknown';
    return (
        <Box >
            <Navbar />
            <Grid container spacing={2}>
                {employees.map((employee, index) => (
                    <Grid item xs={12} sm={6} md={4} key={employee._id || index}>
                        <Card sx={{ p: 2, boxShadow: 3, borderRadius: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                                {/* Profile Photo */}

                                <Avatar
                                    src={employee.profilePhoto || '/default-profile.png'}
                                    alt={employee.name}
                                    sx={{ width: 56, height: 56 }}
                                />
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        {employee.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {employee.position}
                                    </Typography>
                                </Box>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: employee.employmentStatus === 'Full Time' ? '#388e3c' : '#f57c00',
                                        fontWeight: 600,
                                        textTransform: 'capitalize',
                                    }}
                                >
                                    {employee.employmentStatus || 'N/A'}
                                </Typography>
                            </Box>

                            <Typography variant="body2" color="text.secondary" noWrap>
                                <EmailIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} /> {employee.email}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" noWrap>
                                <BusinessCenter fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />{' '}
                                {getEmploymentDepartementText(employee.department)}
                            </Typography>

                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 1, flexWrap: 'wrap' }}>
                                {employee.empStatus === 'edited' && <EditIcon color="primary" sx={{ fontSize: 20 }} />}
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
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>




        </Box >
    );
}
