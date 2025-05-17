import React from 'react';
import DashboardRouter from '../DashboardRouter';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';

const currentPath = window.location.pathname;

const App = () => {
  if (currentPath === '/dashboard') return <DashboardRouter />;
  if (currentPath === '/register') return <Register onSwitch={() => window.location.href = '/'} />;
  return <Login onSwitch={() => window.location.href = '/register'} />;
};

export default App;
