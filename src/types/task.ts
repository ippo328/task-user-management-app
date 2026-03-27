export type TaskStatus = 'todo' | 'in_progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export type Task = {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeUserId: number;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
};

export type TaskFormValues = {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeUserId: number;
  dueDate: string;
};

export type TaskFilters = {
  keyword: string;
  status: 'all' | TaskStatus;
  priority: 'all' | TaskPriority;
  assigneeUserId: 'all' | number;
};