import '../styles/globals.css'
import { Box } from '@mui/material';
import Sidebar from '../components/sidebar'
import Footer from '../components/Footer'
import Head from 'next/head'

import { UserProvider } from '../context/userContext';
import { MessageProvider } from '../context/MessageContext';
import { FetchedDataProvider } from '../context/DataContext';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Employee Management System</title>
      </Head>
      <div style={{ position: 'relative', minHeight: '100vh', paddingBottom: '80px', backgroundColor: 'white' }}>
        <UserProvider>
          <MessageProvider>
            <FetchedDataProvider>
              <Box display={'grid'} gridTemplateColumns={'1fr 5fr'}>
                <Sidebar />
                <Component {...pageProps} />
              </Box>
              <Footer />
            </FetchedDataProvider>
          </MessageProvider>
        </UserProvider>
      </div>
    </>
  )
}

export default MyApp
