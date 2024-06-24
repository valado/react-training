import sha256 from 'crypto-js/sha256';
import { useNavigate } from 'react-router-dom';
import { environment } from 'src/environments/environment';

const generateAuthHeader = (email: string, password: string) =>
  `Basic ${email}:${sha256(password)}`;

export const useLogin = (
  loggedIn: () => void
): ((email: string, password: string) => Promise<void>) => {
  const navigate = useNavigate();
  return (email: string, password: string) =>
    fetch(`${environment.API_URL}/login`, {
      method: 'POST',
      headers: { authorization: generateAuthHeader(email, password) },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.token) {
          storeToken(response.token);
          loggedIn();
          const deepLink = getDeepLink();
          if (deepLink) {
            return navigate(deepLink);
          }
          navigate('/home');
        }
      })
      .catch((error) => {
        console.log(error);
      });
};

export const useRegister = (): ((
  email: string,
  password: string
) => Promise<void>) => {
  const navigate = useNavigate();
  return (email: string, password: string) =>
    fetch(`${environment.API_URL}/register`, {
      method: 'POST',
      headers: { authorization: generateAuthHeader(email, password) },
    })
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.log(error);
      });
};

// Auth token retrieveal

const AUTH_TOKEN_KEY = 'authToken';
export const storeToken = (token: string) =>
  window.localStorage.setItem(AUTH_TOKEN_KEY, token);
export const getToken = () => window.localStorage.getItem(AUTH_TOKEN_KEY);

// Deep link token retrieveal

const DEEP_LINK_KEY = 'deepLink';

export const storeDeepLink = (deepLink: string) => {
  window.localStorage.setItem(DEEP_LINK_KEY, deepLink);
};

export const getDeepLink = () => {
  const deepLink = window.localStorage.getItem(DEEP_LINK_KEY);
  window.localStorage.removeItem(DEEP_LINK_KEY);
  return deepLink;
};
