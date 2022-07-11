import { AppProps } from 'next/app';

import { ApolloProvider } from '@apollo/client';

import './styles.css';
import { AuthModal } from '../components/auth-modal/AuthModal';
import { AuthProvider } from '../contexts/Auth.context';
import { client } from '../services/apollo-client';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Component {...pageProps} />
        <AuthModal />
      </AuthProvider>
    </ApolloProvider>
  );
}

export default CustomApp;
