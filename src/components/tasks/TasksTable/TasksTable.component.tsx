import { PriorityBadgeComponent } from '../../common/PriorityBadge/PriorityBadge.component';
import { StatusBadgeComponent } from '../../common/StatusBadge/StatusBadge.component';
import { formatDate } from '../../../utils/date';
import type { Task } from '../../../types/task';
import type { User } from '../../../types/user';

type Props = {
  tasks: Task[];
  users: User[];
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
};

export function TasksTableComponent({
  tasks,
  users,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div style={styles.wrapper}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Title</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Priority</th>
            <th style={styles.th}>Assignee</th>
            <th style={styles.th}>Due Date</th>
            <th style={styles.th}>Updated At</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td style={styles.emptyCell} colSpan={7}>
                No tasks found.
              </td>
            </tr>
          ) : (
            tasks.map((task) => (
              <tr key={task.id}>
                <td style={styles.td}>{task.title}</td>
                <td style={styles.td}>
                  <StatusBadgeComponent value={task.status} />
                </td>
                <td style={styles.td}>
                  <PriorityBadgeComponent value={task.priority} />
                </td>
                <td style={styles.td}>{findUserName(task.assigneeUserId, users)}</td>
                <td style={styles.td}>{task.dueDate || '-'}</td>
                <td style={styles.td}>{formatDate(task.updatedAt)}</td>
                <td style={styles.td}>
                  <div style={styles.actions}>
                    <button
                      type="button"
                      onClick={() => onEdit(task)}
                      style={styles.editButton}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(task)}
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

function findUserName(userId: number, users: User[]) {
  return users.find((user) => user.id === userId)?.name ?? '-';
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