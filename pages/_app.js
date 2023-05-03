import '@/styles/globals.css';
import { Provider as StoreProvider } from 'react-redux';

import { store } from '../store/store';
import { ProtectRoute } from 'auth';
import Layout from '@/components/Layout/Layout';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HttpService } from '@/utils/HttpService';
import { useEffect } from 'react';
const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  //setting default header on refreshing the page
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
     HttpService.setToken(token);
    }
  }, []);

  return (
    <ProtectRoute>
      <StoreProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
      </StoreProvider>
    </ProtectRoute>
  );
}
