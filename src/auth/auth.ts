import { EXPIRATION_TIME_NAME, JWT_TOKEN_NAME } from '../types/Constants';

export const isUserSessionActive = () => {
  const token = localStorage.getItem(JWT_TOKEN_NAME);
  const expirationTime = localStorage.getItem(EXPIRATION_TIME_NAME);

  console.log('token', token);
  console.log('expirationTime', expirationTime);
  if (!token || !expirationTime) {
    return false;
  }
  const currentTime = Date.now() / 1000;
  console.log(currentTime);
  console.log('isUserLoggedIn:', currentTime < Number(expirationTime));
  return currentTime < Number(expirationTime);
};
