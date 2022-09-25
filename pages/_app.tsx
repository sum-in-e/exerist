import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RouteGuard from '@common/bridges/RouteGuard';
import { BrowserRouter as Router } from 'react-router-dom';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // 데이터가 stale 상태일 경우 윈도우 포커싱 될 때 마다 refetch를 실행하는 옵션
      retry: 0,
    },
  },
});

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

      <QueryClientProvider client={queryClient}>
        <RouteGuard>
          <Router>
            <Component {...pageProps} />
          </Router>
        </RouteGuard>
      </QueryClientProvider>
    </>
  );
}

export default dynamic(() => Promise.resolve(App), { ssr: false }); // ssr 끄기
