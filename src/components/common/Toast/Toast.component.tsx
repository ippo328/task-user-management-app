type ToastType = 'success' | 'error';

type Props = {
  open: boolean;
  message: string;
  type?: ToastType;
  onClose: () => void;
};

export function ToastComponent({
  open,
  message,
  type = 'success',
  onClose,
}: Props) {
  if (!open) {
    return null;
  }

  return (
    <div style={styles.wrapper}>
      <div
        style={{
          ...styles.toast,
          ...(type === 'success' ? styles.success : styles.error),
        }}
      >
        <span>{message}</span>
        <button type="button" onClick={onClose} style={styles.closeButton}>
          ×
        </button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 1100,
  },
  toast: {
    minWidth: '280px',
    maxWidth: '420px',
    padding: '14px 16px',
    borderRadius: '10px',
    boxShadow: '0 10px 24px rgba(0, 0, 0, 0.12)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
    fontSize: '14px',
    fontWeight: 500,
  },
  success: {
    backgroundColor: '#dcfce7',
    color: '#166534',
    border: '1px solid #86efac',
  },
  error: {
    backgroundColor: '#fee2e2',
    color: '#b91c1c',
    border: '1px solid #fca5a5',
  },
  closeButton: {
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    fontSize: '18px',
    lineHeight: 1,
    color: 'inherit',
  },
};