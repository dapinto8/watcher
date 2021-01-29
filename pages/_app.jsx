import { QueryClient, QueryClientProvider } from 'react-query';
import { CookiesProvider } from 'react-cookie';
import { ThemeProvider } from 'styled-components';
import Layout from '@/components/Layout';

import '@/styles/global.scss';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

const theme = {
  colors: {
    primary: '#FF002E',
    secondary: '#020414',
    alt: 'rgb(255 0 46 / 20%)'
  }
};

function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <ThemeProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </CookiesProvider>
    </QueryClientProvider>
  );
}

export default App;
