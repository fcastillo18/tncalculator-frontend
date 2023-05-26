export type Record = {
  id: number;
  operation: string;
  user: string;
  amount: number;
  operationResponse: string;
  date: Date;
  isDeleted: boolean;
};

export interface OperationData {
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
