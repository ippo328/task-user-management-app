type Props = {
  label: string;
  value: number;
};

export function SummaryCardComponent({ label, value }: Props) {
  return (
    <div style={styles.card}>
      <div style={styles.label}>{label}</div>
      <div style={styles.value}>{value}</div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    padding: '20px',
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)',
  },
  label: {
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '8px',
  },
  value: {
    fontSize: '28px',
    fontWeight: 700,
    color: '#111827',
  },
};