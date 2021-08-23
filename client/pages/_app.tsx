import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../apollo/client';
function MyApp({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}
export default MyApp;
