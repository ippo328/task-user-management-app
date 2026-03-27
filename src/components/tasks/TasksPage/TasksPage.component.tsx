import { PageHeaderComponent } from '../../common/PageHeader/PageHeader.component';
import { SearchInputComponent } from '../../common/SearchInput/SearchInput.component';
import { SelectFilterComponent } from '../../common/SelectFilter/SelectFilter.component';
import { TasksTableComponent } from '../TasksTable/TasksTable.component';
import type { Task, TaskFilters } from '../../../types/task';
import type { User } from '../../../types/user';

type Props = {
  tasks: Task[];
  users: User[];
  filters: TaskFilters;
  loading: boolean;
  error: string | null;
  onKeywordChange: (value: string) => void;
  onStatusChange: (value: TaskFilters['status']) => void;
  onPriorityChange: (value: TaskFilters['priority']) => void;
  onAssigneeChange: (value: TaskFilters['assigneeUserId']) => void;
  onCreate: () => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
};

export function TasksPageComponent({
  tasks,
  users,
  filters,
  loading,
  error,
  onKeywordChange,
  onStatusChange,
  onPriorityChange,
  onAssigneeChange,
  onCreate,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div>
      <PageHeaderComponent
        title="Tasks"
        description="Manage tasks, assignees, and progress."
        action={
          <button type="button" onClick={onCreate} style={styles.createButton}>
            + New Task
          </button>
        }
      />

      <div style={styles.filterRow}>
        <SearchInputComponent
          value={filters.keyword}
          placeholder="Search by task title"
          onChange={onKeywordChange}
        />

        <SelectFilterComponent
          value={filters.status}
          onChange={(value) => onStatusChange(value as TaskFilters['status'])}
          options={[
            { label: 'All Status', value: 'all' },
            { label: 'Todo', value: 'todo' },
            { label: 'In Progress', value: 'in_progress' },
            { label: 'Done', value: 'done' },
          ]}
        />

        <SelectFilterComponent
          value={filters.priority}
          onChange={(value) => onPriorityChange(value as TaskFilters['priority'])}
          options={[
            { label: 'All Priority', value: 'all' },
            { label: 'Low', value: 'low' },
            { label: 'Medium', value: 'medium' },
            { label: 'High', value: 'high' },
          ]}
        />

        <SelectFilterComponent
          value={String(filters.assigneeUserId)}
          onChange={(value) =>
            onAssigneeChange(value === 'all' ? 'all' : Number(value))
          }
          options={[
            { label: 'All Assignees', value: 'all' },
            ...users.map((user) => ({
              label: user.name,
              value: String(user.id),
            })),
          ]}
        />
      </div>

      {loading ? <div style={styles.message}>Loading tasks...</div> : null}
      {error ? <div style={styles.error}>{error}</div> : null}

      {!loading && !error ? (
        <TasksTableComponent
          tasks={tasks}
          users={users}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ) : null}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  filterRow: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: '20px',
  },
  createButton: {
    height: '40px',
    padding: '0 16px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    fontWeight: 600,
    cursor: 'pointer',
  },
  message: {
    marginBottom: '16px',
    fontSize: '14px',
    color: '#6b7280',
  },
  error: {
    marginBottom: '16px',
    fontSize: '14px',
    color: '#b91c1c',
  },
};