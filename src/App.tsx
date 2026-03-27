import { Outlet } from 'react-router-dom';
import { AppLayoutComponent } from './components/layout/AppLayout/AppLayout.component';

export default function App() {
  return (
    <AppLayoutComponent>
      <Outlet />
    </AppLayoutComponent>
  );
}