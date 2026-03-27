import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import DashboardPage from '../pages/DashboardPage';
import UsersPage from '../pages/UsersPage';
import TasksPage from '../pages/TasksPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'users',
        element: <UsersPage />,
      },
      {
        path: 'tasks',
        element: <TasksPage />,
      },
    ],
  },
]);