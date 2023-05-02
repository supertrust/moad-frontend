import '@/styles/globals.css';
import { Provider as StoreProvider } from 'react-redux';

import { store } from '../store/store';
import { ProtectRoute } from 'auth';
import Layout from '@/components/Layout/Layout';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
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
