import Router from 'next/router';

import { destroyJwtToken } from '../../services/cookies';
import { authChannel } from './Channel';

export const browserSignOut = () => {
  if (!process.browser) {
    return;
  }
  destroyJwtToken();

  authChannel.postMessage('SIGN_OUT');

  Router.push('/');
};
