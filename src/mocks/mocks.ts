import { OperationResult, OperationType, Record } from '../types/RecordTypes';
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
// FIXME fix types
export const sampleOperationRecords: Record[] = [
  {
    id: 1,
    operation: {
      id: 1,
      type: OperationType.ADDITION,
      cost: 10,
    },
    user: {
      id: 1,
      username: 'fcastillo',
      email: 'franklin@mail.com',
      balance: 100,
      status: 'ACTIVE',
      isDeleted: false,
      roles: [{ id: 1, name: 'admin' }],
    },
    amount: 50,
    operationResponse: 'SUCCESS',
    date: new Date(),
    deleted: false,
  },
  {
    id: 2,
    operation: {
      id: 1,
      type: OperationType.SUBTRACTION,
      cost: 10,
    },
    user: {
      id: 1,
      username: 'jose',
      email: 'jose@mail.com',
      balance: 80,
      status: 'ACTIVE',
      isDeleted: false,
      roles: [{ id: 1, name: 'user' }],
    },
    amount: 30,
    operationResponse: 'SUCCESS',
    date: new Date(),
    deleted: false,
  },
  {
    id: 3,
    operation: {
      id: 1,
      type: OperationType.SUBTRACTION,
      cost: 10,
    },
    user: {
      id: 1,
      username: 'john',
      email: 'john@mail.com',
      balance: 350,
      status: 'ACTIVE',
      isDeleted: false,
      roles: [{ id: 1, name: 'admin' }],
    },
    amount: 30,
    operationResponse: 'SUCCESS',
    date: new Date(),
    deleted: false,
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
    status: 'ACTIVE',
  },
  {
    id: 2,
    username: 'user2',
    password: 'pass2',
    email: 'user2@example.com',
    roles: userRoleSample,
    balance: 500,
    status: 'ACTIVE',
  },
  {
    id: 3,
    username: 'admin2',
    password: 'admin2',
    email: 'admin2@example.com',
    roles: adminRoleSample,
    balance: 90,
    status: 'ACTIVE',
  },
  {
    id: 4,
    username: 'user4',
    password: 'pass4',
    email: 'user4@example.com',
    roles: userRoleSample,
    balance: 250,
    status: 'ACTIVE',
  },
  {
    id: 5,
    username: 'user5',
    password: 'pass5',
    email: 'user5@example.com',
    roles: userRoleSample,
    balance: 50,
    status: 'ACTIVE',
  },
];
