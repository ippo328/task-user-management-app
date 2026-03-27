import { NavLink } from 'react-router-dom';

export function SidebarComponent() {
  return (
    <div style={styles.container}>
      <div style={styles.logoArea}>
        <h1 style={styles.logo}>Task Admin</h1>
      </div>

      <nav style={styles.nav}>
        <NavLink
          to="/dashboard"
          style={({ isActive }) => ({
            ...styles.link,
            ...(isActive ? styles.activeLink : {}),
          })}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/users"
          style={({ isActive }) => ({
            ...styles.link,
            ...(isActive ? styles.activeLink : {}),
          })}
        >
          Users
        </NavLink>

        <NavLink
          to="/tasks"
          style={({ isActive }) => ({
            ...styles.link,
            ...(isActive ? styles.activeLink : {}),
          })}
        >
          Tasks
        </NavLink>
      </nav>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    height: '100%',
    padding: '24px 16px',
    boxSizing: 'border-box',
  },
  logoArea: {
    marginBottom: '32px',
  },
  logo: {
    margin: 0,
    fontSize: '20px',
    fontWeight: 700,
    color: '#111827',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  link: {
    display: 'block',
    padding: '12px 16px',
    borderRadius: '8px',
    color: '#374151',
    textDecoration: 'none',
    fontWeight: 500,
  },
  activeLink: {
    backgroundColor: '#e5edff',
    color: '#1d4ed8',
  },
};