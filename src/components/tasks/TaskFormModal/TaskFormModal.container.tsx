import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { Task, TaskFormValues } from '../../../types/task';
import type { User } from '../../../types/user';
import { TaskFormModalComponent } from './TaskFormModal.component';

type Props = {
  open: boolean;
  mode: 'create' | 'edit';
  task: Task | null;
  users: User[];
  submitting: boolean;
  onClose: () => void;
  onSubmit: (values: TaskFormValues) => Promise<void> | void;
};

const defaultValues: TaskFormValues = {
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
  assigneeUserId: 1,
  dueDate: '',
};

export function TaskFormModalContainer({
  open,
  mode,
  task,
  users,
  submitting,
  onClose,
  onSubmit,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormValues>({
    defaultValues,
  });

  useEffect(() => {
    if (!open) {
      return;
    }

    if (mode === 'edit' && task) {
      reset({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        assigneeUserId: task.assigneeUserId,
        dueDate: task.dueDate,
      });
      return;
    }

    reset({
      ...defaultValues,
      assigneeUserId: users[0]?.id ?? 1,
    });
  }, [mode, open, reset, task, users]);

  const submit = handleSubmit(async (values) => {
    await onSubmit(values);
  });

  return (
    <TaskFormModalComponent
      open={open}
      mode={mode}
      users={users}
      register={(name, options) => {
        let fieldOptions = { ...options };

        if (name === 'title') {
          fieldOptions = {
            ...fieldOptions,
            required: 'Title is required.',
            maxLength: {
              value: 100,
              message: 'Title must be 100 characters or less.',
            },
          };
        } else if (name === 'description') {
          fieldOptions = {
            ...fieldOptions,
            maxLength: {
              value: 500,
              message: 'Description must be 500 characters or less.',
            },
          };
        } else if (name === 'status') {
          fieldOptions = {
            ...fieldOptions,
            required: 'Status is required.',
          };
        } else if (name === 'priority') {
          fieldOptions = {
            ...fieldOptions,
            required: 'Priority is required.',
          };
        } else if (name === 'assigneeUserId') {
          fieldOptions = {
            ...fieldOptions,
            required: 'Assignee is required.',
            valueAsNumber: true,
          };
        }

        return register(name, fieldOptions);
      }}
      errors={errors}
      submitting={submitting}
      onClose={onClose}
      onSubmit={() => {
        void submit();
      }}
    />
  );
}