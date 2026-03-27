export type UserRole = 'admin' | 'member';
export type UserStatus = 'active' | 'inactive';

export type User = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
};

export type UserFormValues = {
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
};

export type UserFilters = {
  keyword: string;
  role: 'all' | UserRole;
  status: 'all' | UserStatus;
};