import { Box } from '@mui/material';
import Sidebar from './sidebar';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <>
            <Sidebar />
            <Box
                display="flex"
                flexDirection="column"
                minHeight="100vh"
                sx={{
                    marginLeft: { xs: 0, md: '250px' },
                    paddingTop: 0,
                    backgroundColor: 'white',
                }}
            >
                <Box flexGrow={1}>
                    {children}
                </Box>
                <Footer />
            </Box>
        </>
    );
};

export default Layout;
