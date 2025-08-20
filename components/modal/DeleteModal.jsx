import { Modal, Box, Typography, Button } from '@mui/material';

export default function DeleteModal({ open, onClose, onDelete, name }) {
    return (
        <Modal open={open} onClose={onClose}>
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
                    Are you sure you want to delete <b>{name}</b>? This action cannot be undone.
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    <Button onClick={onClose} variant="outlined">
                        Cancel
                    </Button>
                    <Button onClick={onDelete} variant="contained" color="error">
                        Delete
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
