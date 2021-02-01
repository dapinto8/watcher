import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useUser } from '@/context/userContext';
import Head from 'next/head';
import Header from './Header';

export default function Layout({ children }) {
  const [cookies, setCookie] = useCookies(['session_id', 'user']);
  const { user, getUser, setUser } = useUser();

  useEffect(() => {
    if (cookies.user && !user) {
      setUser(cookies.user);
    } else if (!cookies.user && !user && cookies.session_id) {
      getUser(cookies.session_id).then(user => {
        setCookie('user', user);
      });
    }
  }, [cookies, user])

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
      <main>{children}</main>
    </>
  );
}
