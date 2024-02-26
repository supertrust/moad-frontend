import { AuthProvider } from '@src/contexts/AuthContext';
import { ConfirmDialogProvider } from '@src/contexts/ConfirmDialogContext';
import Layout from '@src/layout';

import ReactQueryClient from '@src/services/ReactQueryClient';
import '@src/styles/globals.css';
import '@src/styles/responsive.css';
import { setRouter } from '@src/utils/axios';
import type { AppProps } from 'next/app';
import { Noto_Sans_KR } from 'next/font/google';
import { useRouter } from 'next/router';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'rsuite/dist/rsuite.css';
import "../components/pages/Landing/about.scss";
import "../components/pages/Landing/inquire.scss";
import "../components/pages/Landing/privacy.scss";
import "../components/pages/Landing/styles.scss";
import "../components/pages/Landing/terms.scss";

const notoSansKR = Noto_Sans_KR({
	weight: '400',
	subsets: ['latin'],
});

const _App = ({ Component, pageProps }: AppProps) => {
	const router = useRouter();
	const { pathname } = router;
	setRouter(router)

	if (pathname.includes('/dashboard')) {
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
					<ConfirmDialogProvider>
						<_App {...props} />
					</ConfirmDialogProvider>
			</AuthProvider>
			<ToastContainer />
		</ReactQueryClient>
	);
}
