import type { ReactNode } from 'react';
import { SidebarComponent } from '../Sidebar/Sidebar.component';

type Props = {
  children: ReactNode;
};

export function AppLayoutComponent({ children }: Props) {
  return (
    <div style={styles.wrapper}>
      <aside style={styles.sidebar}>
        <SidebarComponent />
      </aside>
      <main style={styles.main}>{children}</main>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f5f7fb',
  },
  sidebar: {
    width: '240px',
    borderRight: '1px solid #e5e7eb',
    backgroundColor: '#ffffff',
  },
  main: {
    flex: 1,
    padding: '32px',
  },
};