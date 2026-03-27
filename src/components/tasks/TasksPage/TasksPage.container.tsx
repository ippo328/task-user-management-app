import { useEffect, useMemo, useState } from 'react';
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from '../../../services/tasksService';
import { getUsers } from '../../../services/usersService';
import type { Task, TaskFilters, TaskFormValues } from '../../../types/task';
import type { User } from '../../../types/user';
import { ConfirmDialogComponent } from '../../common/ConfirmDialog/ConfirmDialog.component';
import { ToastComponent } from '../../common/Toast/Toast.component';
import { TaskFormModalContainer } from '../TaskFormModal/TaskFormModal.container';
import { TasksPageComponent } from './TasksPage.component';

const initialFilters: TaskFilters = {
  keyword: '',
  status: 'all',
  priority: 'all',
  assigneeUserId: 'all',
};

type ToastState = {
  open: boolean;
  message: string;
  type: 'success' | 'error';
};

export function TasksPageContainer() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [filters, setFilters] = useState<TaskFilters>(initialFilters);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [deletingTask, setDeletingTask] = useState<Task | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [toast, setToast] = useState<ToastState>({
    open: false,
    message: '',
    type: 'success',
  });

  useEffect(() => {
    void fetchInitialData();
  }, []);

  useEffect(() => {
    if (!toast.open) {
      return;
    }

    const timer = window.setTimeout(() => {
      setToast((prev) => ({ ...prev, open: false }));
    }, 2500);

    return () => window.clearTimeout(timer);
  }, [toast.open]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const keyword = filters.keyword.trim().toLowerCase();

      const matchesKeyword =
        keyword === '' || task.title.toLowerCase().includes(keyword);

      const matchesStatus =
        filters.status === 'all' || task.status === filters.status;

      const matchesPriority =
        filters.priority === 'all' || task.priority === filters.priority;

      const matchesAssignee =
        filters.assigneeUserId === 'all' ||
        task.assigneeUserId === filters.assigneeUserId;

      return (
        matchesKeyword &&
        matchesStatus &&
        matchesPriority &&
        matchesAssignee
      );
    });
  }, [tasks, filters]);

  const handleKeywordChange = (value: string) => {
    setFilters((prev) => ({ ...prev, keyword: value }));
  };

  const handleStatusChange = (value: TaskFilters['status']) => {
    setFilters((prev) => ({ ...prev, status: value }));
  };

  const handlePriorityChange = (value: TaskFilters['priority']) => {
    setFilters((prev) => ({ ...prev, priority: value }));
  };

  const handleAssigneeChange = (value: TaskFilters['assigneeUserId']) => {
    setFilters((prev) => ({ ...prev, assigneeUserId: value }));
  };

  const handleCreate = () => {
    setModalMode('create');
    setEditingTask(null);
    setIsTaskModalOpen(true);
  };

  const handleEdit = (task: Task) => {
    setModalMode('edit');
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const handleDelete = (task: Task) => {
    setDeletingTask(task);
  };

  const handleCloseModal = () => {
    if (submitting) {
      return;
    }

    setIsTaskModalOpen(false);
    setEditingTask(null);
  };

  const handleSubmitTask = async (values: TaskFormValues) => {
    try {
      setSubmitting(true);

      if (modalMode === 'create') {
        await createTask(values);
        setToast({
          open: true,
          message: 'Task created successfully.',
          type: 'success',
        });
      } else if (editingTask) {
        await updateTask(editingTask.id, values);
        setToast({
          open: true,
          message: 'Task updated successfully.',
          type: 'success',
        });
      }

      await fetchInitialData();
      setIsTaskModalOpen(false);
      setEditingTask(null);
    } catch (err) {
      console.error(err);
      setToast({
        open: true,
        message: 'Failed to save task.',
        type: 'error',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingTask) {
      return;
    }

    try {
      setDeleteLoading(true);
      await deleteTask(deletingTask.id);
      await fetchInitialData();
      setDeletingTask(null);
      setToast({
        open: true,
        message: 'Task deleted successfully.',
        type: 'success',
      });
    } catch (err) {
      console.error(err);
      setToast({
        open: true,
        message: 'Failed to delete task.',
        type: 'error',
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  async function fetchInitialData() {
    try {
      setLoading(true);
      setError(null);

      const [tasksData, usersData] = await Promise.all([getTasks(), getUsers()]);
      setTasks(tasksData);
      setUsers(usersData);
    } catch (err) {
      console.error(err);
      setError('Failed to load tasks.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <TasksPageComponent
        tasks={filteredTasks}
        users={users}
        filters={filters}
        loading={loading}
        error={error}
        onKeywordChange={handleKeywordChange}
        onStatusChange={handleStatusChange}
        onPriorityChange={handlePriorityChange}
        onAssigneeChange={handleAssigneeChange}
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <TaskFormModalContainer
        open={isTaskModalOpen}
        mode={modalMode}
        task={editingTask}
        users={users}
        submitting={submitting}
        onClose={handleCloseModal}
        onSubmit={handleSubmitTask}
      />

      <ConfirmDialogComponent
        open={Boolean(deletingTask)}
        title="Delete Task"
        message={
          deletingTask ? (
            <>
              Are you sure you want to delete <strong>{deletingTask.title}</strong>?
            </>
          ) : null
        }
        confirmLabel="Delete"
        cancelLabel="Cancel"
        loading={deleteLoading}
        onCancel={() => {
          if (!deleteLoading) {
            setDeletingTask(null);
          }
        }}
        onConfirm={() => {
          void handleConfirmDelete();
        }}
      />

      <ToastComponent
        open={toast.open}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
      />
    </>
  );
}