import type { ReactNode } from 'react';

type Props = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export function PageHeaderComponent({
  title,
  description,
  action,
}: Props) {
  return (
    <div style={styles.wrapper}>
      <div>
        <h1 style={styles.title}>{title}</h1>
        {description ? <p style={styles.description}>{description}</p> : null}
      </div>

      {action ? <div>{action}</div> : null}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '16px',
    marginBottom: '24px',
  },
  title: {
    margin: 0,
    fontSize: '28px',
    fontWeight: 700,
    color: '#111827',
  },
  description: {
    margin: '8px 0 0',
    fontSize: '14px',
    color: '#6b7280',
  },
};