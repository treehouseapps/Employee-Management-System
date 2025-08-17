import { Box } from '@mui/material';
import Sidebar from './sidebar';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <Box sx={{ position: 'relative', minHeight: '100vh', backgroundColor: 'white', paddingBottom: '80px' }}>
            <Sidebar />
            <Box
                sx={{
                    marginLeft: { xs: 0, md: '250px' },
                    transition: 'margin 0.3s',
                }}
            >
                {children}
                <Footer />
            </Box>
        </Box>
    );
};

export default Layout;
