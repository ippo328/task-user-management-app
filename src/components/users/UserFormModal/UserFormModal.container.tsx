import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { User, UserFormValues } from '../../../types/user';
import { UserFormModalComponent } from './UserFormModal.component';

type Props = {
  open: boolean;
  mode: 'create' | 'edit';
  user: User | null;
  submitting: boolean;
  onClose: () => void;
  onSubmit: (values: UserFormValues) => Promise<void> | void;
};

const defaultValues: UserFormValues = {
  name: '',
  email: '',
  role: 'member',
  status: 'active',
};

export function UserFormModalContainer({
  open,
  mode,
  user,
  submitting,
  onClose,
  onSubmit,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormValues>({
    defaultValues,
  });

  useEffect(() => {
    if (!open) {
      return;
    }

    if (mode === 'edit' && user) {
      reset({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      });
      return;
    }

    reset(defaultValues);
  }, [mode, open, reset, user]);

  const submit = handleSubmit(async (values) => {
    await onSubmit(values);
  });

  return (
    <UserFormModalComponent
      open={open}
      mode={mode}
      register={(name, options) => {
        if (name === 'name') {
          return register(name, {
            ...options,
            required: 'Name is required.',
            maxLength: {
              value: 50,
              message: 'Name must be 50 characters or less.',
            },
          });
        }
        if (name === 'email') {
          return register(name, {
            ...options,
            required: 'Email is required.',
            validate: (value) => {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              return emailRegex.test(value) || 'Enter a valid email address.';
            },
          });
        }
        if (name === 'role' || name === 'status') {
          return register(name, {
            ...options,
            required: `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`,
          });
        }
        return register(name, options);
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