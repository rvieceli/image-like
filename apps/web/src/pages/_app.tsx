import { AppProps } from 'next/app';

import { ApolloProvider } from '@apollo/client';

import './styles.css';
import { AuthProvider } from '../contexts/Auth.context';
import { client } from '../services/apollo-client';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ApolloProvider>
  );
}

export default CustomApp;
