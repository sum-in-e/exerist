import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import dynamic from 'next/dynamic';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>EXERIST</title>
      </Head>

      <Component {...pageProps} />
    </>
  );
}

export default dynamic(() => Promise.resolve(App), { ssr: false }); // ssr 끄기
