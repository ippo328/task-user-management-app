import { useEffect, useMemo, useState } from 'react';
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from '../../../services/usersService';
import type { User, UserFilters, UserFormValues } from '../../../types/user';
import { ConfirmDialogComponent } from '../../common/ConfirmDialog/ConfirmDialog.component';
import { ToastComponent } from '../../common/Toast/Toast.component';
import { UserFormModalContainer } from '../UserFormModal/UserFormModal.container';
import { UsersPageComponent } from './UsersPage.component';

const initialFilters: UserFilters = {
  keyword: '',
  role: 'all',
  status: 'all',
};

type ToastState = {
  open: boolean;
  message: string;
  type: 'success' | 'error';
};

export function UsersPageContainer() {
  const [users, setUsers] = useState<User[]>([]);
  const [filters, setFilters] = useState<UserFilters>(initialFilters);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [toast, setToast] = useState<ToastState>({
    open: false,
    message: '',
    type: 'success',
  });

  useEffect(() => {
    void fetchUsers();
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

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const keyword = filters.keyword.trim().toLowerCase();

      const matchesKeyword =
        keyword === '' ||
        user.name.toLowerCase().includes(keyword) ||
        user.email.toLowerCase().includes(keyword);

      const matchesRole = filters.role === 'all' || user.role === filters.role;
      const matchesStatus =
        filters.status === 'all' || user.status === filters.status;

      return matchesKeyword && matchesRole && matchesStatus;
    });
  }, [users, filters]);

  const handleKeywordChange = (value: string) => {
    setFilters((prev) => ({ ...prev, keyword: value }));
  };

  const handleRoleChange = (value: UserFilters['role']) => {
    setFilters((prev) => ({ ...prev, role: value }));
  };

  const handleStatusChange = (value: UserFilters['status']) => {
    setFilters((prev) => ({ ...prev, status: value }));
  };

  const handleCreate = () => {
    setModalMode('create');
    setEditingUser(null);
    setIsUserModalOpen(true);
  };

  const handleEdit = (user: User) => {
    setModalMode('edit');
    setEditingUser(user);
    setIsUserModalOpen(true);
  };

  const handleDelete = (user: User) => {
    setDeletingUser(user);
  };

  const handleCloseModal = () => {
    if (submitting) {
      return;
    }

    setIsUserModalOpen(false);
    setEditingUser(null);
  };

  const handleSubmitUser = async (values: UserFormValues) => {
    try {
      setSubmitting(true);

      if (modalMode === 'create') {
        await createUser(values);
        setToast({
          open: true,
          message: 'User created successfully.',
          type: 'success',
        });
      } else if (editingUser) {
        await updateUser(editingUser.id, values);
        setToast({
          open: true,
          message: 'User updated successfully.',
          type: 'success',
        });
      }

      await fetchUsers();
      setIsUserModalOpen(false);
      setEditingUser(null);
    } catch (err) {
      console.error(err);
      setToast({
        open: true,
        message: 'Failed to save user.',
        type: 'error',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingUser) {
      return;
    }

    try {
      setDeleteLoading(true);
      await deleteUser(deletingUser.id);
      await fetchUsers();
      setDeletingUser(null);
      setToast({
        open: true,
        message: 'User deleted successfully.',
        type: 'success',
      });
    } catch (err) {
      console.error(err);
      setToast({
        open: true,
        message: 'Failed to delete user.',
        type: 'error',
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  async function fetchUsers() {
    try {
      setLoading(true);
      setError(null);

      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
      setError('Failed to load users.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <UsersPageComponent
        users={filteredUsers}
        filters={filters}
        loading={loading}
        error={error}
        onKeywordChange={handleKeywordChange}
        onRoleChange={handleRoleChange}
        onStatusChange={handleStatusChange}
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <UserFormModalContainer
        open={isUserModalOpen}
        mode={modalMode}
        user={editingUser}
        submitting={submitting}
        onClose={handleCloseModal}
        onSubmit={handleSubmitUser}
      />

      <ConfirmDialogComponent
        open={Boolean(deletingUser)}
        title="Delete User"
        message={
          deletingUser ? (
            <>
              Are you sure you want to delete <strong>{deletingUser.name}</strong>?
            </>
          ) : null
        }
        confirmLabel="Delete"
        cancelLabel="Cancel"
        loading={deleteLoading}
        onCancel={() => {
          if (!deleteLoading) {
            setDeletingUser(null);
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