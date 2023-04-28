import '@/styles/globals.css';
import { store } from '../store/store';
import { ProtectRoute } from 'auth';
import { Provider as StoreProvider } from 'react-redux';

export default function App({ Component, pageProps }) {
  return (
    <ProtectRoute>
      <StoreProvider store={store}>
        <Component {...pageProps} />
      </StoreProvider>
    </ProtectRoute>
  );
}
