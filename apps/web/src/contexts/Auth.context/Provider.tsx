import { ReactNode, useEffect, useState } from 'react';

import Router from 'next/router';

import { useLoginMutation, useMeQuery, User } from '@image-like/data-access';

import { getAccessToken, saveJwtToken } from '../../services/cookies';
import { browserSignOut } from './browserSignOut';
import { authChannel } from './Channel';
import { AuthContext, SignInCredentials } from './Context';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [login] = useLoginMutation();
  const { data } = useMeQuery({ skip: !getAccessToken() });

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
        user: data?.me,
        signOut: browserSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
