import React, { useState } from 'react';
import {
  Avatar,
  Button,
  TextField,
  Box,
  Typography,
  Container,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Loading from '../components/loading';
import Navbar from '../components/navbar';
import { useMessage } from '../components/MessageContext';

export default function RegisterEmployee() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');
  const [age, setAge] = useState('');
  const [employmentStatus, setEmploymentStatus] = useState('');
  const [text, setText] = useState('Register');
  const [errors, setErrors] = useState({});
  const { showMessage } = useMessage();

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phoneNumber) => {
    const phoneNumberRegex = /^\d{10}$/;  // Assumes 10-digit phoneNumber number
    return phoneNumberRegex.test(phoneNumber);
  };

  const validateForm = () => {
    const newErrors = {};

    if (name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters long';
    }

    if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!validatePhone(phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phoneNumber number';
    }

    if (!department) {
      newErrors.department = 'Please select a department';
    }

    if (!position) {
      newErrors.position = 'Please select a position';
    }

    if (!gender) {
      newErrors.gender = 'Please select a gender';
    }

    if (!age || age < 18 || age > 55) {
      newErrors.age = 'Please enter a valid age between 18 and 55';
    }

    if (!employmentStatus) {
      newErrors.employmentStatus = 'Please select an employment employmentStatus';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearForm = () => {
    setName('');
    setEmail('');
    setPhoneNumber('');
    setDepartment('');
    setPosition('');
    setGender('');
    setAge('');
    setEmploymentStatus('');
    setErrors({});
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showMessage('Please fix the errors before submitting', 'error');
      return;
    }

    setText(<Loading />);
    try {
      const response = await fetch('/api/service', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phoneNumber,
          department,
          position,
          gender,
          age,
          employmentStatus
        }),
      });

      const result = await response.json();
      if (response.ok) {
        showMessage(result.message, 'success');
        clearForm();  // Clear form after successful submission
        setText('Register');
      } else {
        showMessage(result.message);
        setText('Register');
      }
    } catch (error) {
      console.error('Network error:', error);
      showMessage('Network error');
      setText('Register');
    }
  };

  return (
    <Box >
      <Navbar />
      <Container sx={{
        padding: '1px',
        marginBottom: '2rem'
      }}>
        <Box component="main"
          sx={{
            boxShadow: '1px 2px 10px 0.5px lightblue',
            margin: { xs: '1rem auto', md: '2rem auto' },
            padding: { xs: '1rem !important', sm: '2rem !important' },
            borderRadius: '.5rem',
            backgroundColor: 'white',
            height: 'max-content',
            maxWidth: { xs: '95% !important', sm: '600px !important' }
          }}>
          <div>
            <Box display='grid'
              gridTemplateColumns='1fr 3fr'
              // placeItems='center'
              alignItems='center'
              marginBottom={2}
              gap='1rem'>
              <Avatar sx={{ bgcolor: '#7F00FF' }}>
                <PersonAddIcon />
              </Avatar>
              <Typography variant="h5" sx={{
                marginBottom: '1rem',
                fontWeight: 'bolder',
                fontFamily: '"Quicksand", "serif"',
                fontSize: { xs: '1.2rem', sm: '1.5rem' }
              }}>
                Register Employee
              </Typography>
            </Box>
            <form noValidate onSubmit={onSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={!!errors.name}
                  helperText={errors.name}
                />
                <Box sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 2
                }}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email}
                    sx={{ width: '100%' }}
                  />
                  <TextField
                    variant="outlined"
                    required
                    sx={{
                      width: { xs: '100%', sm: '200px' }
                    }}
                    type='number'
                    label="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber}
                  />
                </Box>
                <Box sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 2
                }}>
                  <FormControl
                    required
                    error={!!errors.gender}
                    sx={{
                      width: { xs: '100%', sm: '200px' }
                    }}
                  >
                    <InputLabel>Gender</InputLabel>
                    <Select
                      value={gender}
                      label="Gender"
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                    </Select>
                    {errors.gender && (
                      <FormHelperText>{errors.gender}</FormHelperText>
                    )}
                  </FormControl>
                  <TextField
                    variant="outlined"
                    required
                    sx={{
                      width: { xs: '100%', sm: '150px' }
                    }}
                    type="number"
                    label="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    error={!!errors.age}
                    helperText={errors.age}
                    InputProps={{ inputProps: { min: 18, max: 100 } }}
                  />
                </Box>
                <Box sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 2
                }}>
                  <FormControl
                    required
                    error={!!errors.department}
                    sx={{
                      width: { xs: '100%', sm: '50%' }
                    }}
                  >
                    <InputLabel>Department</InputLabel>
                    <Select
                      value={department}
                      label="Department"
                      onChange={(e) => setDepartment(e.target.value)}
                    >
                      <MenuItem value="Human Resources (HR)">Human Resources (HR)</MenuItem>
                      <MenuItem value="Finance & Accounting">Finance & Accounting</MenuItem>
                      <MenuItem value="Marketing & Sales">Marketing & Sales</MenuItem>
                      <MenuItem value="Operations">Operations</MenuItem>
                      <MenuItem value="IT/Engineering">IT/Engineering</MenuItem>
                    </Select>
                    {errors.department && (
                      <FormHelperText>{errors.department}</FormHelperText>
                    )}
                  </FormControl>
                  <FormControl
                    required
                    error={!!errors.position}
                    sx={{
                      width: { xs: '100%', sm: '50%' }
                    }}
                  >
                    <InputLabel>Position</InputLabel>
                    <Select
                      value={position}
                      label="Position"
                      onChange={(e) => setPosition(e.target.value)}
                    >
                      <MenuItem value="Team Leader">Team Leader</MenuItem>
                      <MenuItem value="Assistant">Assistant</MenuItem>
                      <MenuItem value="Member">Member</MenuItem>
                    </Select>
                    {errors.position && (
                      <FormHelperText>{errors.position}</FormHelperText>
                    )}
                  </FormControl>
                </Box>
                <FormControl
                  required
                  error={!!errors.employmentStatus}
                  fullWidth
                >
                  <InputLabel>Employment Status</InputLabel>
                  <Select
                    value={employmentStatus}
                    label="Employment Status"
                    onChange={(e) => setEmploymentStatus(e.target.value)}
                  >
                    <MenuItem value="Full Time">Full Time</MenuItem>
                    <MenuItem value="Part Time">Part Time</MenuItem>
                    <MenuItem value="Internship">Internship</MenuItem>
                    <MenuItem value="Contract">Contract</MenuItem>
                  </Select>
                  {errors.employmentStatus && (
                    <FormHelperText>{errors.employmentStatus}</FormHelperText>
                  )}
                </FormControl>
                <Button
                  fullWidth
                  variant="contained"
                  type='submit'
                  sx={{
                    backgroundColor: '#7F00FF',
                    color: '#fff',
                    padding: '10px',
                    fontWeight: 'bold',
                    '&:hover': {
                      backgroundColor: '#5e00cc',
                    },
                  }}
                >
                  Submit
                </Button>
              </Box>
            </form>
          </div>
        </Box>
      </Container>
    </Box>
  );
}
