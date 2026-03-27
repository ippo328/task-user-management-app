type Props = {
  value: 'low' | 'medium' | 'high';
};

export function PriorityBadgeComponent({ value }: Props) {
  const config = getPriorityStyle(value);

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

function getPriorityStyle(value: Props['value']) {
  switch (value) {
    case 'low':
      return {
        label: 'Low',
        backgroundColor: '#f3f4f6',
        color: '#4b5563',
      };
    case 'medium':
      return {
        label: 'Medium',
        backgroundColor: '#fef3c7',
        color: '#92400e',
      };
    case 'high':
      return {
        label: 'High',
        backgroundColor: '#fee2e2',
        color: '#b91c1c',
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