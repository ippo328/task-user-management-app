import { PageHeaderComponent } from '../../common/PageHeader/PageHeader.component';
import { SearchInputComponent } from '../../common/SearchInput/SearchInput.component';
import { SelectFilterComponent } from '../../common/SelectFilter/SelectFilter.component';
import { UsersTableComponent } from '../UsersTable/UsersTable.component';
import type { User, UserFilters } from '../../../types/user';

type Props = {
  users: User[];
  filters: UserFilters;
  loading: boolean;
  error: string | null;
  onKeywordChange: (value: string) => void;
  onRoleChange: (value: UserFilters['role']) => void;
  onStatusChange: (value: UserFilters['status']) => void;
  onCreate: () => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
};

export function UsersPageComponent({
  users,
  filters,
  loading,
  error,
  onKeywordChange,
  onRoleChange,
  onStatusChange,
  onCreate,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div>
      <PageHeaderComponent
        title="Users"
        description="Manage users, roles, and account status."
        action={
          <button type="button" onClick={onCreate} style={styles.createButton}>
            + New User
          </button>
        }
      />

      <div style={styles.filterRow}>
        <SearchInputComponent
          value={filters.keyword}
          placeholder="Search by name or email"
          onChange={onKeywordChange}
        />

        <SelectFilterComponent
          value={filters.role}
          onChange={(value) => onRoleChange(value as UserFilters['role'])}
          options={[
            { label: 'All Roles', value: 'all' },
            { label: 'Admin', value: 'admin' },
            { label: 'Member', value: 'member' },
          ]}
        />

        <SelectFilterComponent
          value={filters.status}
          onChange={(value) => onStatusChange(value as UserFilters['status'])}
          options={[
            { label: 'All Status', value: 'all' },
            { label: 'Active', value: 'active' },
            { label: 'Inactive', value: 'inactive' },
          ]}
        />
      </div>

      {loading ? <div style={styles.message}>Loading users...</div> : null}
      {error ? <div style={styles.error}>{error}</div> : null}

      {!loading && !error ? (
        <UsersTableComponent users={users} onEdit={onEdit} onDelete={onDelete} />
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