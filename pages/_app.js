import '@/styles/globals.css';
import { Provider as StoreProvider } from 'react-redux';

import { store } from '../store/store';
import { ProtectRoute } from 'auth';
import Layout from '@/components/layout';

export default function App({ Component, pageProps }) {
  return (
    <ProtectRoute>
      <StoreProvider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StoreProvider>
    </ProtectRoute>
  );
}
