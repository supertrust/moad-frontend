import { Html, Head, Main, NextScript } from 'next/document';
import React from "react";

export default function Document() {
    return (
        <Html lang='en'>
            <Head>
                <link
                    href='https://cdn.jsdelivr.net/npm/remixicon@2.2.0/fonts/remixicon.css'
                    rel='stylesheet'
                />
                <link
                    rel='stylesheet'
                    href='https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap'
                />
                <link rel="shortcut icon" href="/favicon.svg"/>
                <meta name="description" content="MOAD 광고주님의 페이지입니다."/>
                <meta property="og:title" content="MOAD - 모빌리티 광고 플랫폼" key="title"/>
                <meta property="og:description" content="MOAD 광고주님의 페이지입니다."/>
                <meta property="og:image" content={"https://prd-static.moad.live/advertiser-og-image.png"}/>
            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    );
}
