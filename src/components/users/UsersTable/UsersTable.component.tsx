import { StatusBadgeComponent } from '../../common/StatusBadge/StatusBadge.component';
import { formatDate } from '../../../utils/date';
import type { User } from '../../../types/user';

type Props = {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
};

export function UsersTableComponent({
  users,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div style={styles.wrapper}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Role</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Created At</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td style={styles.emptyCell} colSpan={6}>
                No users found.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td style={styles.td}>{user.name}</td>
                <td style={styles.td}>{user.email}</td>
                <td style={styles.td}>{user.role}</td>
                <td style={styles.td}>
                  <StatusBadgeComponent value={user.status} />
                </td>
                <td style={styles.td}>{formatDate(user.createdAt)}</td>
                <td style={styles.td}>
                  <div style={styles.actions}>
                    <button
                      type="button"
                      onClick={() => onEdit(user)}
                      style={styles.editButton}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(user)}
                      style={styles.deleteButton}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    overflowX: 'auto',
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    padding: '14px 16px',
    borderBottom: '1px solid #e5e7eb',
    textAlign: 'left',
    fontSize: '13px',
    fontWeight: 600,
    color: '#6b7280',
    backgroundColor: '#f9fafb',
  },
  td: {
    padding: '16px',
    borderBottom: '1px solid #f3f4f6',
    fontSize: '14px',
    color: '#111827',
    verticalAlign: 'middle',
  },
  emptyCell: {
    padding: '24px',
    textAlign: 'center',
    fontSize: '14px',
    color: '#6b7280',
  },
  actions: {
    display: 'flex',
    gap: '8px',
  },
  editButton: {
    height: '32px',
    padding: '0 12px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
  },
  deleteButton: {
    height: '32px',
    padding: '0 12px',
    border: '1px solid #fecaca',
    borderRadius: '8px',
    backgroundColor: '#fef2f2',
    color: '#b91c1c',
    cursor: 'pointer',
  },
};