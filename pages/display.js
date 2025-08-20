import {
    Box, Typography, Grid, Button,
    TextField, InputAdornment, Card, Avatar
} from '@mui/material';
import { useFetchedData } from '../context/DataContext';
import { useMessage } from '../context/MessageContext';
import Search from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import { Email as EmailIcon, BusinessCenter } from '@mui/icons-material';
import { useState } from 'react';
import Navbar from '../components/navbar';
import EditModal from '../components/modal/EditModal';
import DeleteModal from '../components/modal/DeleteModal';

const EMPLOYMENT_DEPARTMENT = {
    1: 'Human Resources (HR)',
    2: 'Finance & Accounting',
    3: 'Marketing & Sales',
    4: 'Operations',
    5: 'IT/Engineering'
};

export default function DisplayEmployee() {
    const { fetchedData: employees = [], setFetchedData } = useFetchedData();
    const { showMessage } = useMessage();
    const [tempEmpData, setTempEmpData] = useState(null);
    const [editErrors, setEditErrors] = useState({});
    const [deleteConfirmation, setDeleteConfirmation] = useState({
        open: false,
        employeeId: null,
        employeeName: ''
    });
    const [searchTerm, setSearchTerm] = useState('');

    const handleEditClick = (employee) => setTempEmpData(employee);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTempEmpData(prev => ({ ...prev, [name]: value }));
    };
    const handleClose = () => {
        setTempEmpData(null);
        setEditErrors({});
    };

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePhone = (phone) => /^\d{10}$/.test(phone);

    const validateEditForm = () => {
        const errors = {};
        if (!tempEmpData) return false;

        if (!tempEmpData.name || tempEmpData.name.trim().length < 3) errors.name = 'Name must be at least 3 characters';
        if (!tempEmpData.email || !validateEmail(tempEmpData.email)) errors.email = 'Invalid email';
        if (!tempEmpData.phoneNumber || !validatePhone(tempEmpData.phoneNumber)) errors.phoneNumber = 'Invalid 10-digit phone';
        if (!tempEmpData.gender) errors.gender = 'Select a gender';
        if (!tempEmpData.age || tempEmpData.age < 18 || tempEmpData.age > 55) errors.age = 'Age must be 18-55';
        if (!tempEmpData.department) errors.department = 'Select a department';
        if (!tempEmpData.position) errors.position = 'Select a position';
        if (!tempEmpData.employmentStatus) errors.employmentStatus = 'Select employment status';

        setEditErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSave = async () => {
        if (!validateEditForm()) {
            showMessage('Please correct the errors before saving', 'error');
            return;
        }

        try {
            const res = await fetch(`/api/service?id=${tempEmpData._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(tempEmpData)
            });
            if (!res.ok) throw new Error('Failed to update employee');

            const { message } = await res.json();
            showMessage(message, 'success');

            const listRes = await fetch('/api/service');
            const { data } = await listRes.json();
            if (Array.isArray(data)) setFetchedData(data);

            handleClose();
        } catch (err) {
            console.error(err);
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
            const res = await fetch(`/api/service?id=${deleteConfirmation.employeeId}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete');

            setFetchedData(prev => prev.filter(emp => emp._id !== deleteConfirmation.employeeId));
            setDeleteConfirmation({ open: false, employeeId: null, employeeName: '' });
            showMessage('Employee deleted', 'success');
        } catch (err) {
            console.error(err);
            showMessage('Error deleting employee', 'error');
        }
    };

    const handleCloseDeleteModal = () => setDeleteConfirmation({ open: false, employeeId: null, employeeName: '' });

    const filteredMembers = employees.filter(emp =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getDepartmentText = (id) => EMPLOYMENT_DEPARTMENT[id] || 'Unknown';

    return (
        <Box>
            <Navbar />

            <Box sx={{ textAlign: 'center', px: 2, py: 2 }}>
                <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Meet Our Team
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                    <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                        Dedicated professionals who power our organization.
                    </Typography>
                    <TextField
                        size="small"
                        variant="outlined"
                        value={searchTerm}
                        placeholder="Search"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{ width: { xs: '100%', md: '250px' }, bgcolor: 'white', borderRadius: 1 }}
                        InputProps={{ endAdornment: <InputAdornment position="end"><Search sx={{ cursor: 'pointer' }} /></InputAdornment> }}
                    />
                </Box>
            </Box>

            {filteredMembers.length === 0 ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="200px" bgcolor="#f5f5f5" borderRadius={2} my={2}>
                    <Typography variant="h6" color="textSecondary">No employees found</Typography>
                </Box>
            ) : (
                <Grid container spacing={2} sx={{ px: 2, my: 2 }}>
                    {filteredMembers.map(emp => (
                        <Grid item xs={12} sm={6} md={4} key={emp._id}>
                            <Card sx={{ p: 2, boxShadow: 3, borderRadius: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                                    <Avatar src={emp.profilePhoto || (emp.gender === 'Male' ? '/man.svg' : '/woman.svg')} sx={{ width: 56, height: 56 }} />
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 600 }}>{emp.name}</Typography>
                                        <Typography variant="body2" color="text.secondary">{emp.position}</Typography>
                                    </Box>
                                    <Typography variant="caption" sx={{ color: emp.employmentStatus === 'Full Time' ? '#388e3c' : '#f57c00', fontWeight: 600 }}>
                                        {emp.employmentStatus || 'N/A'}
                                    </Typography>
                                </Box>

                                <Typography variant="body2" color="text.secondary" noWrap>
                                    <EmailIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} /> {emp.email}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" noWrap>
                                    <BusinessCenter fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} /> {getDepartmentText(emp.department)}
                                </Typography>

                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 1, flexWrap: 'wrap' }}>
                                    {emp.empStatus === 'edited' && <EditIcon color="primary" sx={{ fontSize: 20 }} />}
                                    <Button variant="outlined" color="success" size="small" sx={{ fontWeight: 'bold', textTransform: 'none' }} onClick={() => handleEditClick(emp)}>Edit</Button>
                                    <Button variant="outlined" color="error" size="small" sx={{ fontWeight: 'bold', textTransform: 'none' }} onClick={() => handleDeleteClick(emp)}>Delete</Button>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            <EditModal
                open={!!tempEmpData}
                onClose={handleClose}
                tempEmpData={tempEmpData}
                editErrors={editErrors}
                handleInputChange={handleInputChange}
                handleSave={handleSave}
            />

            <DeleteModal
                open={deleteConfirmation.open}
                onClose={handleCloseDeleteModal}
                employeeName={deleteConfirmation.employeeName}
                handleDelete={handleDelete}
            />
        </Box>
    );
}
