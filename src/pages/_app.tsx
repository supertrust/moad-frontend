import type { AppProps } from 'next/app';
import '@src/styles/globals.css';
import '@src/styles/responsive.css';

import 'rsuite/dist/rsuite.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';

import ReactQueryClient from '@src/services/ReactQueryClient';
import { AuthProvider } from '@src/contexts/AuthContext';
import Layout from '@src/layout';
import CargoLayout from '@src/layout/cargo';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import store from '@src/redux/store';
import { ConfirmDialogProvider } from '@src/contexts/ConfirmDialogContext';
import { Noto_Sans_KR } from 'next/font/google';
import "../components/pages/Landing/styles.scss";
import "../components/pages/Landing/about.scss";
import "../components/pages/Landing/inquire.scss";
import "../components/pages/Landing/terms.scss";

const notoSansKR = Noto_Sans_KR({
	weight: '400',
	subsets: ['latin'],
});

const _App = ({ Component, pageProps }: AppProps) => {
	const { asPath } = useRouter();

	if (asPath.includes('/cargo/dashboard')) {
		return (
			<main className={notoSansKR.className}>
					<CargoLayout>
					<Component {...pageProps} />
				</CargoLayout>
			</main>
		);
	}
	if (asPath.includes('/dashboard')) {
		return (
			<main className={notoSansKR.className}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</main>
		);
	}
	return (
		<main className={notoSansKR.className}>
			<Component {...pageProps} />
		</main>
	);
};

export default function App(props: AppProps) {
	return (
		<ReactQueryClient>
			<AuthProvider>
				<Provider store={store}>
					<ConfirmDialogProvider>
						<_App {...props} />
					</ConfirmDialogProvider>
				</Provider>
			</AuthProvider>
			<ToastContainer />
		</ReactQueryClient>
	);
}
