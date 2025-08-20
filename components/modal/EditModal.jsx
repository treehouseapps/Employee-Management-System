import React from "react";
import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
} from "@mui/material";

const EditEmployeeModal = ({
    open,
    onClose,
    tempEmpData,
    editErrors,
    handleInputChange,
    handleSave,
}) => {
    if (!tempEmpData) return null;

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: { xs: "95%", sm: "600px" },
                    maxHeight: { xs: "90vh", sm: "80vh" },
                    overflow: "auto",
                    bgcolor: "white",
                    borderRadius: "8px",
                    boxShadow: 24,
                    p: { xs: 2, sm: 4 },
                }}
            >
                <Typography variant="h6" component="h2" mb={2}>
                    Edit Employee
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <TextField
                        label="Full Name"
                        name="name"
                        value={tempEmpData.name}
                        onChange={handleInputChange}
                        fullWidth
                        error={!!editErrors.name}
                        helperText={editErrors.name}
                    />

                    <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
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
                            sx={{ width: { xs: "100%", sm: "200px" } }}
                            error={!!editErrors.phoneNumber}
                            helperText={editErrors.phoneNumber}
                        />
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
                        <FormControl sx={{ width: { xs: "100%", sm: "200px" } }} error={!!editErrors.gender}>
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
                            {editErrors.gender && <FormHelperText>{editErrors.gender}</FormHelperText>}
                        </FormControl>

                        <TextField
                            label="Age"
                            name="age"
                            type="number"
                            value={tempEmpData.age}
                            onChange={handleInputChange}
                            sx={{ width: { xs: "100%", sm: "150px" } }}
                            error={!!editErrors.age}
                            helperText={editErrors.age}
                            InputProps={{ inputProps: { min: 18, max: 100 } }}
                        />
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
                        <FormControl sx={{ width: "100%" }} error={!!editErrors.department}>
                            <InputLabel>Department</InputLabel>
                            <Select
                                name="department"
                                value={tempEmpData.department || ""}
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

                        <FormControl sx={{ width: "100%" }} error={!!editErrors.position}>
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

                    <FormControl fullWidth error={!!editErrors.employmentStatus}>
                        <InputLabel>Employment Status</InputLabel>
                        <Select
                            name="employmentStatus"
                            value={tempEmpData.employmentStatus}
                            label="Employment Status"
                            onChange={handleInputChange}
                        >
                            <MenuItem value="Full Time">Full Time</MenuItem>
                            <MenuItem value="Part Time">Part Time</MenuItem>
                            <MenuItem value="Contract">Contract</MenuItem>
                            <MenuItem value="Internship">Internship</MenuItem>
                        </Select>
                        {editErrors.employmentStatus && (
                            <FormHelperText>{editErrors.employmentStatus}</FormHelperText>
                        )}
                    </FormControl>

                    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}>
                        <Button onClick={onClose} variant="outlined" color="secondary">
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSave}
                            variant="contained"
                            color="primary"
                            sx={{
                                padding: "0.8rem 2rem",
                                fontSize: "1.1rem",
                                fontWeight: "bold",
                            }}
                        >
                            Save Changes
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default EditEmployeeModal;
