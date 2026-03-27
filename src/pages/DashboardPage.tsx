import { useEffect, useMemo, useState } from 'react';
import { SummaryCardComponent } from '../components/dashboard/SummaryCard/SummaryCard.component';
import { PageHeaderComponent } from '../components/common/PageHeader/PageHeader.component';
import { getTasks } from '../services/tasksService';
import { getUsers } from '../services/usersService';
import type { Task } from '../types/task';
import type { User } from '../types/user';

export default function DashboardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void fetchDashboardData();
  }, []);

  const summary = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);

    return {
      totalUsers: users.length,
      activeUsers: users.filter((user) => user.status === 'active').length,
      totalTasks: tasks.length,
      incompleteTasks: tasks.filter((task) => task.status !== 'done').length,
      overdueTasks: tasks.filter(
        (task) => task.status !== 'done' && task.dueDate && task.dueDate < today
      ).length,
    };
  }, [users, tasks]);

  async function fetchDashboardData() {
    try {
      setLoading(true);
      setError(null);

      const [usersData, tasksData] = await Promise.all([getUsers(), getTasks()]);
      setUsers(usersData);
      setTasks(tasksData);
    } catch (err) {
      console.error(err);
      setError('Failed to load dashboard data.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <PageHeaderComponent
        title="Dashboard"
        description="Overview of users and task progress."
      />

      {loading ? <div style={styles.message}>Loading dashboard...</div> : null}
      {error ? <div style={styles.error}>{error}</div> : null}

      {!loading && !error ? (
        <div style={styles.grid}>
          <SummaryCardComponent label="Total Users" value={summary.totalUsers} />
          <SummaryCardComponent label="Active Users" value={summary.activeUsers} />
          <SummaryCardComponent label="Total Tasks" value={summary.totalTasks} />
          <SummaryCardComponent
            label="Incomplete Tasks"
            value={summary.incompleteTasks}
          />
          <SummaryCardComponent label="Overdue Tasks" value={summary.overdueTasks} />
        </div>
      ) : null}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '16px',
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