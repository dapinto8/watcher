import Head from 'next/head';
import Header from './Header';
import styled from 'styled-components';

const Main = styled.div`
  padding-bottom: 2em;
`;

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/icons/watcher.svg" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Kanit:wght@200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header />
      <Main>{children}</Main>
    </>
  );
}
