import '../styles/globals.css';
import Layout from '../components/Layout';
import { UserProvider } from '../context/userContext';
import { MessageProvider } from '../context/MessageContext';
import { FetchedDataProvider } from '../context/DataContext';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Employee Management System</title>
      </Head>
      <UserProvider>
        <MessageProvider>
          <FetchedDataProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </FetchedDataProvider>
        </MessageProvider>
      </UserProvider>
    </>
  );
}

export default MyApp;
