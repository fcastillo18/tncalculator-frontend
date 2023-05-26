import { OperationResult, Record } from '../types/RecordTypes';

// TODO this sample data should be used in storybook, after implementation
export const sampleOperationResult: OperationResult = {
  id: 1,
  operationType: 'Addition',
  operationResult: 10,
  operationCost: 0,
  userRemainingBalance: 100,
};
// TODO this sample data should be used in storybook, after implementation
export const sampleRecords: Record[] = [
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
