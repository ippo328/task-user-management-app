import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { UserFormValues } from '../../../types/user';

type Props = {
  open: boolean;
  mode: 'create' | 'edit';
  register: UseFormRegister<UserFormValues>;
  errors: FieldErrors<UserFormValues>;
  submitting: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

export function UserFormModalComponent({
  open,
  mode,
  register,
  errors,
  submitting,
  onClose,
  onSubmit,
}: Props) {
  if (!open) {
    return null;
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h2 style={styles.title}>
            {mode === 'create' ? 'Create User' : 'Edit User'}
          </h2>
        </div>

        <div style={styles.body}>
          <div style={styles.field}>
            <label style={styles.label}>Name</label>
            <input
              {...register('name', {
                required: 'Name is required.',
                maxLength: {
                  value: 50,
                  message: 'Name must be 50 characters or less.',
                },
              })}
              type="text"
              style={styles.input}
              placeholder="Enter user name"
            />
            {errors.name ? <p style={styles.error}>{errors.name.message}</p> : null}
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              {...register('email', {
                required: 'Email is required.',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter a valid email address.',
                },
              })}
              type="email"
              style={styles.input}
              placeholder="Enter email address"
            />
            {errors.email ? <p style={styles.error}>{errors.email.message}</p> : null}
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Role</label>
            <select
              {...register('role', {
                required: 'Role is required.',
              })}
              style={styles.select}
            >
              <option value="admin">Admin</option>
              <option value="member">Member</option>
            </select>
            {errors.role ? <p style={styles.error}>{errors.role.message}</p> : null}
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Status</label>
            <select
              {...register('status', {
                required: 'Status is required.',
              })}
              style={styles.select}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            {errors.status ? <p style={styles.error}>{errors.status.message}</p> : null}
          </div>
        </div>

        <div style={styles.footer}>
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            style={styles.cancelButton}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSubmit}
            disabled={submitting}
            style={styles.saveButton}
          >
            {submitting ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(17, 24, 39, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
    zIndex: 1000,
  },
  modal: {
    width: '100%',
    maxWidth: '520px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)',
    overflow: 'hidden',
  },
  header: {
    padding: '20px 24px',
    borderBottom: '1px solid #e5e7eb',
  },
  title: {
    margin: 0,
    fontSize: '20px',
    fontWeight: 700,
    color: '#111827',
  },
  body: {
    padding: '24px',
    display: 'grid',
    gap: '16px',
  },
  field: {
    display: 'grid',
    gap: '8px',
  },
  label: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#374151',
  },
  input: {
    height: '40px',
    padding: '0 12px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    boxSizing: 'border-box',
  },
  select: {
    height: '40px',
    padding: '0 12px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    backgroundColor: '#ffffff',
  },
  error: {
    margin: 0,
    fontSize: '12px',
    color: '#dc2626',
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    padding: '20px 24px',
    borderTop: '1px solid #e5e7eb',
  },
  cancelButton: {
    height: '40px',
    padding: '0 16px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
  },
  saveButton: {
    height: '40px',
    padding: '0 16px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    fontWeight: 600,
    cursor: 'pointer',
  },
};