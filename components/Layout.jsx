import { Box } from '@mui/material';
import Sidebar from './sidebar';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <>
            <Sidebar />
            <Box
                sx={{
                    marginLeft: { xs: 0, md: '250px' },
                    paddingTop: 0,
                    minHeight: '100vh',
                    backgroundColor: 'white',
                }}
            >
                {children}
                <Footer />
            </Box>
        </>
    );
};

export default Layout;
