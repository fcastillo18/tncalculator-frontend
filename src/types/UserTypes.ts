export type Role = {
  name: string;
};

export type User = {
  id: number;
  username: string;
  password?: string;
  status: string;
  balance?: number;
  email: string;
  roles: Role[];
  date?: string; // Using a string for simplicity; consider using a Date for real date handling
  isDeleted?: boolean;
};

export interface SignupRequest {
  username: string;
  email: string;
  role: string[];
  balance?: number;
  password: string;
}
