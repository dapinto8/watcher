import { QueryClientProvider, QueryClient } from 'react-query';
import { CookiesProvider } from 'react-cookie';
import { UserProvider } from '@/context/userContext';
import { FavoritesProvider } from '@/context/favoritesContext';
import Layout from '@/components/Layout';

import '@/styles/global.scss';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60000,
    }
  }
});

function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <UserProvider>
          <FavoritesProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </FavoritesProvider>
        </UserProvider>
      </CookiesProvider>
    </QueryClientProvider>
  );
}

export default App;
