import { User } from './UserTypes';

export type Record = {
  id: number;
  operation: Operation;
  user: User;
  amount: number;
  operationResponse: string;
  date: Date;
  deleted: boolean;
};

export enum OperationType {
  ADDITION = 'ADDITION',
  SUBTRACTION = 'SUBTRACTION',
  MULTIPLICATION = 'MULTIPLICATION',
  DIVISION = 'DIVISION',
  SQUARE_ROOT = 'SQUARE_ROOT',
  RANDOM_STRING = 'RANDOM_STRING',
}

export type Operation = {
  id: number;
  type: OperationType;
  cost: number;
};

export interface OperationRequestData {
  userId: number;
  num1: number;
  num2: number;
}

export interface OperationResult {
  id: number;
  operationType: string;
  operationResult: number;
  operationCost: number;
  userRemainingBalance: number;
}
