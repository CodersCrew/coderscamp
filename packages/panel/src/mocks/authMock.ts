const isBrowser = typeof window !== 'undefined';

const createAuthMock = () => {
  let isAuthenticated = isBrowser ? localStorage.getItem('is-authenticated') === 'true' : false;

  const setIsAuthenticated = (newIsAuthenticated: boolean) => {
    if (isBrowser) {
      localStorage.setItem('is-authenticated', newIsAuthenticated ? 'true' : 'false');
    }

    isAuthenticated = newIsAuthenticated;
  };

  const getIsAuthenticated = () => isAuthenticated;

  const login = () => setIsAuthenticated(true);

  const logout = () => setIsAuthenticated(false);

  return { getIsAuthenticated, login, logout };
};

export const authMock = createAuthMock();
