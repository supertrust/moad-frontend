import Loader from "@src/components/Loader";
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
import { useEffect } from "react";
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
	const { pathname:path } = router;
	const token = typeof window !== 'undefined'? localStorage.getItem("token") : null;

	useEffect(()=>{
		setRouter(router)
	},[router])

	useEffect(() => {
		if (!token && !path.includes("/login")) {
			const returnUrl = window.location.href.replace(window.location.origin, '');
			if(returnUrl.length && returnUrl!=="/")router.replace(`/login?returnUrl=${returnUrl}`);
			else router.replace(`/login`);
		}
		else if(path==="/" && token)
			router.replace(`/dashboard`);

	}, [path, router]);

	if (path.includes('/dashboard') && !path.includes("/login") && token) {
		return (
			<main className={notoSansKR.className}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</main>
		);
	}

	else if(!path.includes("/login"))
		return <div className={'flex justify-center pt-5'}><Loader size={'lg'}/></div>

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
