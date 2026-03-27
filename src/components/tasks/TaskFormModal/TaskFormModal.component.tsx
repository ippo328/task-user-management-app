import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { TaskFormValues } from '../../../types/task';
import type { User } from '../../../types/user';

type Props = {
  open: boolean;
  mode: 'create' | 'edit';
  users: User[];
  register: UseFormRegister<TaskFormValues>;
  errors: FieldErrors<TaskFormValues>;
  submitting: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

export function TaskFormModalComponent({
  open,
  mode,
  users,
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
            {mode === 'create' ? 'Create Task' : 'Edit Task'}
          </h2>
        </div>

        <div style={styles.body}>
          <div style={styles.field}>
            <label style={styles.label}>Title</label>
            <input
              {...register('title')}
              type="text"
              style={styles.input}
              placeholder="Enter task title"
            />
            {errors.title ? <p style={styles.error}>{errors.title.message}</p> : null}
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Description</label>
            <textarea
              {...register('description')}
              style={styles.textarea}
              placeholder="Enter task description"
            />
            {errors.description ? (
              <p style={styles.error}>{errors.description.message}</p>
            ) : null}
          </div>

          <div style={styles.gridTwo}>
            <div style={styles.field}>
              <label style={styles.label}>Status</label>
              <select {...register('status')} style={styles.select}>
                <option value="todo">Todo</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>
              {errors.status ? <p style={styles.error}>{errors.status.message}</p> : null}
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Priority</label>
              <select {...register('priority')} style={styles.select}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              {errors.priority ? (
                <p style={styles.error}>{errors.priority.message}</p>
              ) : null}
            </div>
          </div>

          <div style={styles.gridTwo}>
            <div style={styles.field}>
              <label style={styles.label}>Assignee</label>
              <select
                {...register('assigneeUserId', { valueAsNumber: true })}
                style={styles.select}
              >
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
              {errors.assigneeUserId ? (
                <p style={styles.error}>{errors.assigneeUserId.message}</p>
              ) : null}
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Due Date</label>
              <input {...register('dueDate')} type="date" style={styles.input} />
              {errors.dueDate ? <p style={styles.error}>{errors.dueDate.message}</p> : null}
            </div>
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
    maxWidth: '640px',
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
  gridTwo: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
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
  textarea: {
    minHeight: '96px',
    padding: '12px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    resize: 'vertical',
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