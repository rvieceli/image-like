import { ReactNode, useEffect, useState } from 'react';

import Router from 'next/router';

import {
  useLoginMutation,
  useMeQuery,
  User,
  useRegisterMutation,
} from '@image-like/data-access';

import { getAccessToken, saveJwtToken } from '../../services/cookies';
import { browserSignOut } from './browserSignOut';
import { authChannel } from './Channel';
import { AuthContext, SignInCredentials, SignUpCredentials } from './Context';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();
  const { data, refetch } = useMeQuery({ skip: !getAccessToken() });

  useEffect(() => {
    authChannel.onmessage = () => document.location.reload();
  }, []);

  const signIn = async (credentials: SignInCredentials) => {
    try {
      const { data } = await login({
        variables: {
          data: credentials,
        },
      });

      saveJwtToken(data.login.token);

      refetch();

      setAuthModalOpen(false);

      authChannel.postMessage('SIGN_IN');
    } catch (err) {
      console.log(err);
      alert('Email or password invalid');
    }
  };

  const signUp = async (credentials: SignUpCredentials) => {
    try {
      const { data } = await register({
        variables: {
          data: credentials,
        },
      });

      saveJwtToken(data.register.token);

      refetch();

      setAuthModalOpen(false);

      authChannel.postMessage('SIGN_IN');
    } catch (err) {
      console.log(err);
      alert('Email or password invalid');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: Boolean(data?.me),
        signIn,
        signUp,
        user: data?.me,
        signOut: browserSignOut,
        isAuthModalOpen,
        openAuthModal: () => setAuthModalOpen(true),
        closeAuthModal: () => setAuthModalOpen(false),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
