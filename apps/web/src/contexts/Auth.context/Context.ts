import { createContext } from 'react';

import { User } from '@image-like/data-access';

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
}

export interface AuthContextData {
  signIn(credentials: SignInCredentials): Promise<void>;
  signUp(credentials: SignUpCredentials): Promise<void>;
  signOut(): void;
  isAuthenticated: boolean;
  user?: User;
  openAuthModal(): void;
  closeAuthModal(): void;
  isAuthModalOpen: boolean;
}

export const AuthContext = createContext({} as AuthContextData);
