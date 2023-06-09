import axios, { InternalAxiosRequestConfig } from 'axios';
import { SignInResponse } from './types';
import {
  OperationRequestData,
  OperationResult,
  OperationType,
} from '../types/RecordTypes';
import {
  EXPIRATION_TIME_NAME,
  JWT_TOKEN_NAME,
  SIGNED_USER,
} from '../types/Constants';
import { SignupRequest, User } from '../types/UserTypes';

const url =
  import.meta.env.REACT_APP_API_BASE_URL ||
  'http://ec2-3-89-20-5.compute-1.amazonaws.com/api/v1';
const api = axios.create({
  baseURL: url,
});

console.log('REACT_APP_API_BASE_URL: ', url);

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(JWT_TOKEN_NAME);
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

  localStorage.setItem(JWT_TOKEN_NAME, token);
  localStorage.setItem(EXPIRATION_TIME_NAME, expirationTime.toString());
  localStorage.setItem(SIGNED_USER, JSON.stringify(response.data.user));
  return response.data;
};

// TODO validate the Token expiration time before calling any endpoint
export const getToken = (): string | null => {
  return localStorage.getItem(JWT_TOKEN_NAME);
};

export const fetchAllOperationRecords = async () => {
  return api.get('/record/all').then((res) => res.data);
};

export const fetchAllUserRecords = async () => {
  return api.get('/user/all').then((res) => res.data);
};

export const getUserById = async (userId: number): Promise<User> => {
  const response = await api.get(`/user/getById?id=${userId}`);
  return response.data as User;
};

export const fetchAllOperations = async () => {
  return api.get('/operation/all').then((res) => res.data);
};

export const deleteOperationRecord = async (id: number) => {
  const response = await api.delete(`/record/delete/${id}`);
  return response;
};

export const fetchAllOperationsByUserId = async (userId: number) => {
  const response = await api.get(`/record/all/${userId}`);
  if (userId === 0) {
    throw new Error('UserId cannot be 0');
  }
  return response.data;
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

  const response = await api.post<OperationResult>(url, operationRequestData);
  return response.data;
};

export async function generateRandomString(
  apiKey: string,
  length = 10,
  numberOfStrings = 1,
  characters = 'abcdefghijklmnopqrstuvwxyz'
) {
  const response = await axios.post(
    'https://api.random.org/json-rpc/4/invoke',
    {
      jsonrpc: '2.0',
      method: 'generateStrings',
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        apiKey,
        n: numberOfStrings,
        length: length,
        characters: characters,
      },
      id: 42,
    }
  );

  if (response.data.error) {
    throw new Error(response.data.error.message);
  }
  // Access the data directly from the response
  return response.data.result.random.data;
}

export const signup = async (userData: SignupRequest) => {
  const response = await api.post('/auth/signup', userData);
  return response.data;
};

export default api;
