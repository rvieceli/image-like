export const saveJwtToken = (accessToken: string) => {
  localStorage.setItem('app@jwt', accessToken);
};

export const getAccessToken = (ctx = undefined) => {
  if (typeof window === 'undefined') {
    return undefined;
  }

  return localStorage.getItem('app@jwt');
};

export const destroyJwtToken = (ctx = undefined) => {
  localStorage.removeItem('app@jwt');
};
