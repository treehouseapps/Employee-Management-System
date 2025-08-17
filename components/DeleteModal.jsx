import React from 'react';
import { Box, Modal, Typography, Button } from '@mui/material';

const DeleteConfirmationModal = ({ deleteConfirmation, handleDelete, handleCloseDeleteModal }) => {
    if (!deleteConfirmation.open) return null;

    return (
        <Modal open={deleteConfirmation.open} onClose={handleCloseDeleteModal}>
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
                    <Button onClick={handleCloseDeleteModal} variant="outlined">Cancel</Button>
                    <Button onClick={handleDelete} variant="contained" color="error">Delete</Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default DeleteConfirmationModal;
