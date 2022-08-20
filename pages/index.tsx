import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>EXERIST</title>
      </Head>

      <main>컨텐츠</main>
    </div>
  );
};

export default Home;

// ssr 끄기
// export default dynamic(() => Promise.resolve(App), { ssr: false });
