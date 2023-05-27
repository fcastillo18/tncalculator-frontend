import { OperationResult, Record } from '../types/RecordTypes';
import { Role, User } from '../types/UserTypes';

// TODO this sample data should be used in storybook, after implementation
export const sampleOperationResult: OperationResult = {
  id: 1,
  operationType: 'Addition',
  operationResult: 10,
  operationCost: 0,
  userRemainingBalance: 100,
};
// TODO this sample data should be used in storybook, after implementation
export const sampleOperationRecords: Record[] = [
  {
    id: 1,
    operation: 'ADDITION',
    user: 'Franklin',
    amount: 50,
    operationResponse: 'SUCCESS',
    date: new Date(),
    isDeleted: false,
  },
  {
    id: 2,
    operation: 'SUBTRACTION',
    user: 'Jose',
    amount: 30,
    operationResponse: 'SUCCESS',
    date: new Date(),
    isDeleted: false,
  },
  {
    id: 3,
    operation: 'SUBTRACTION',
    user: 'Jose',
    amount: 30,
    operationResponse: 'SUCCESS',
    date: new Date(),
    isDeleted: false,
  },
  {
    id: 4,
    operation: 'SUBTRACTION',
    user: 'Jose',
    amount: 30,
    operationResponse: 'SUCCESS',
    date: new Date(),
    isDeleted: false,
  },
  {
    id: 5,
    operation: 'SUBTRACTION',
    user: 'Jose',
    amount: 30,
    operationResponse: 'SUCCESS',
    date: new Date(),
    isDeleted: false,
  },
  {
    id: 6,
    operation: 'SUBTRACTION',
    user: 'Jose',
    amount: 30,
    operationResponse: 'SUCCESS',
    date: new Date(),
    isDeleted: false,
  },
];

const adminRoleSample: Role[] = [{ id: 1, name: 'admin' }];
const userRoleSample: Role[] = [{ id: 2, name: 'user' }];

export const sampleUserRecords: User[] = [
  {
    id: 1,
    username: 'admin',
    password: 'admin',
    email: 'admin@example.com',
    roles: adminRoleSample,
    balance: 100,
  },
  {
    id: 2,
    username: 'user2',
    password: 'pass2',
    email: 'user2@example.com',
    roles: userRoleSample,
    balance: 500,
  },
  {
    id: 3,
    username: 'admin2',
    password: 'admin2',
    email: 'admin2@example.com',
    roles: adminRoleSample,
    balance: 90,
  },
  {
    id: 4,
    username: 'user4',
    password: 'pass4',
    email: 'user4@example.com',
    roles: userRoleSample,
    balance: 250,
  },
  {
    id: 5,
    username: 'user5',
    password: 'pass5',
    email: 'user5@example.com',
    roles: userRoleSample,
    balance: 50,
  },
];
