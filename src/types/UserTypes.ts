export type Role = {
  id: number;
  name: string;
};

export type User = {
  id: number;
  username: string;
  password: string;
  status?: string;
  balance?: number;
  email: string;
  roles: Role[];
  date?: string; // Using a string for simplicity; consider using a Date for real date handling
  isDeleted?: boolean;
};
