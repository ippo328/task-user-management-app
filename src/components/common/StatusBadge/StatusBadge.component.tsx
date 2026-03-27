type Props = {
  value: 'active' | 'inactive' | 'todo' | 'in_progress' | 'done';
};

export function StatusBadgeComponent({ value }: Props) {
  const config = getStatusStyle(value);

  return (
    <span
      style={{
        ...styles.badge,
        backgroundColor: config.backgroundColor,
        color: config.color,
      }}
    >
      {config.label}
    </span>
  );
}

function getStatusStyle(value: Props['value']) {
  switch (value) {
    case 'active':
      return {
        label: 'Active',
        backgroundColor: '#dcfce7',
        color: '#166534',
      };
    case 'inactive':
      return {
        label: 'Inactive',
        backgroundColor: '#f3f4f6',
        color: '#4b5563',
      };
    case 'todo':
      return {
        label: 'Todo',
        backgroundColor: '#e5e7eb',
        color: '#374151',
      };
    case 'in_progress':
      return {
        label: 'In Progress',
        backgroundColor: '#dbeafe',
        color: '#1d4ed8',
      };
    case 'done':
      return {
        label: 'Done',
        backgroundColor: '#dcfce7',
        color: '#166534',
      };
  }
}

const styles: Record<string, React.CSSProperties> = {
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    height: '28px',
    padding: '0 10px',
    borderRadius: '999px',
    fontSize: '12px',
    fontWeight: 600,
    whiteSpace: 'nowrap',
  },
};