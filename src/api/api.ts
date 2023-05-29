import axios, { InternalAxiosRequestConfig } from 'axios';
import { SignInResponse } from './types';
import {
  OperationRequestData,
  OperationResult,
  OperationType,
} from '../types/RecordTypes';

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

  sessionStorage.setItem('jwtToken', token);
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

export const fetchAllUserRecords = async () => {
  return api.get('/user/all').then((res) => res.data);
};

export const fetchAllOperations = async () => {
  return api.get('/operation/all').then((res) => res.data);
};

export const createOperation = async (
  operationType: OperationType,
  operationRequestData: OperationRequestData
): Promise<OperationResult> => {
  let url;
  switch (operationType) {
    case OperationType.ADDITION:
      url = '/operation/add';
      break;
    case OperationType.SUBTRACTION:
      url = '/operation/subtract';
      break;
    case OperationType.MULTIPLICATION:
      url = '/operation/multiply';
      break;
    case OperationType.DIVISION:
      url = '/operation/divide';
      break;
    case OperationType.SQUARE_ROOT:
      url = '/operation/squareRoot';
      break;
    case OperationType.RANDOM_STRING:
      url = '/operation/randomString';
      // This will be the only case that will return, cuz' the request is different from others.
      return (
        await api.post(url, {
          userId: operationRequestData.userId,
          randomString: operationRequestData.num1,
        })
      ).data;
    default:
      throw new Error('Invalid operation type');
  }

  console.log('operationRequestData: ', operationRequestData);
  const response = await api.post<OperationResult>(url, operationRequestData);
  return response.data;
};

export default api;
