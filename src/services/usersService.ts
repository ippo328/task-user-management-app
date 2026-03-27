import { apiClient } from './apiClient';
import type { User, UserFormValues } from '../types/user';

export const getUsers = async (): Promise<User[]> => {
  const response = await apiClient.get<User[]>('/users');
  return response.data;
};

export const getUserById = async (id: number): Promise<User> => {
  const response = await apiClient.get<User>(`/users/${id}`);
  return response.data;
};

export const createUser = async (data: UserFormValues): Promise<User> => {
  const payload = {
    ...data,
    createdAt: new Date().toISOString(),
  };

  const response = await apiClient.post<User>('/users', payload);
  return response.data;
};

export const updateUser = async (
  id: number,
  data: UserFormValues
): Promise<User> => {
  const existing = await getUserById(id);

  const payload: User = {
    ...existing,
    ...data,
  };

  const response = await apiClient.put<User>(`/users/${id}`, payload);
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await apiClient.delete(`/users/${id}`);
};