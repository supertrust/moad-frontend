import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang='en'>
			<Head >
				<link
					href='https://cdn.jsdelivr.net/npm/remixicon@2.2.0/fonts/remixicon.css'
					rel='stylesheet'
				/>
				<link
					rel='stylesheet'
					href='https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap'
				/>
				<link rel="shortcut icon" href="/favicon.svg" />
			</Head>
			<title>MOAD</title>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
