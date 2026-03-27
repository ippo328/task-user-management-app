import { apiClient } from './apiClient';
import type { Task, TaskFormValues } from '../types/task';

export const getTasks = async (): Promise<Task[]> => {
  const response = await apiClient.get<Task[]>('/tasks');
  return response.data;
};

export const getTaskById = async (id: number): Promise<Task> => {
  const response = await apiClient.get<Task>(`/tasks/${id}`);
  return response.data;
};

export const createTask = async (data: TaskFormValues): Promise<Task> => {
  const now = new Date().toISOString();

  const payload = {
    ...data,
    createdAt: now,
    updatedAt: now,
  };

  const response = await apiClient.post<Task>('/tasks', payload);
  return response.data;
};

export const updateTask = async (
  id: number,
  data: TaskFormValues
): Promise<Task> => {
  const existing = await getTaskById(id);

  const payload: Task = {
    ...existing,
    ...data,
    updatedAt: new Date().toISOString(),
  };

  const response = await apiClient.put<Task>(`/tasks/${id}`, payload);
  return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await apiClient.delete(`/tasks/${id}`);
};