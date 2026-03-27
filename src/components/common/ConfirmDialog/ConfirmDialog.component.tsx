import type { ReactNode } from 'react';

type Props = {
  open: boolean;
  title: string;
  message: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDialogComponent({
  open,
  title,
  message,
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  loading = false,
  onConfirm,
  onCancel,
}: Props) {
  if (!open) {
    return null;
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.dialog}>
        <h2 style={styles.title}>{title}</h2>
        <div style={styles.message}>{message}</div>

        <div style={styles.actions}>
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            style={styles.cancelButton}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            style={styles.confirmButton}
          >
            {loading ? 'Deleting...' : confirmLabel}
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
  dialog: {
    width: '100%',
    maxWidth: '420px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '24px',
    boxSizing: 'border-box',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)',
  },
  title: {
    margin: 0,
    fontSize: '20px',
    fontWeight: 700,
    color: '#111827',
  },
  message: {
    marginTop: '12px',
    fontSize: '14px',
    lineHeight: 1.6,
    color: '#4b5563',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '24px',
  },
  cancelButton: {
    height: '40px',
    padding: '0 16px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
  },
  confirmButton: {
    height: '40px',
    padding: '0 16px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#dc2626',
    color: '#ffffff',
    fontWeight: 600,
    cursor: 'pointer',
  },
};