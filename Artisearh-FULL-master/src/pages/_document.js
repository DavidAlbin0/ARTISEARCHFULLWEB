// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
      </body>
    </Html>
  );
}
