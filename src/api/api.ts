import axios, { InternalAxiosRequestConfig } from 'axios';
import { SignInResponse } from './types';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = sessionStorage.getItem('jwtToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const signin = async (
  username: string,
  password: string
): Promise<SignInResponse> => {
  const response = await api.post<SignInResponse>('/auth/signin', {
    username,
    password,
  });
  const token = response.data.token;
  const expirationTime = Date.now() / 1000 + 3600; // calculate the expiration time

  sessionStorage.setItem('token', token);
  sessionStorage.setItem('expirationTime', expirationTime.toString());
  return response.data;
};

// TODO validate the Token expiration time before calling any endpoint
export const getToken = (): string | null => {
  return sessionStorage.getItem('jwtToken');
};

export const fetchAllOperationRecords = async () => {
  return api.get('/record/all').then((res) => res.data);
};

export default api;
