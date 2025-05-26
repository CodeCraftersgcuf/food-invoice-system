import React, { useEffect, useState } from 'react';
import useAuth from './hooks/useAuth';
import CreateReceipt from './components/dashboard/CreateReceipt';
import AdminReceipts from './components/dashboard/AdminReceipts';
import ManageDashboard from './components/dashboard/ManageDashboard';

export default function DashboardRouter() {
  const { user } = useAuth();
  const [view, setView] = useState(null);

  useEffect(() => {
    if (!user) return;
    if (window.location.pathname === '/manage') setView('manage');
    else if (user.role === 'admin') setView('admin');
    else setView('create');
  }, [user]);

  if (!user) return <p>Loading...</p>;

  return (
    <>
      {view === 'manage' && <ManageDashboard />}
      {view === 'admin' && <AdminReceipts />}
      {view === 'create' && <CreateReceipt />}
      <div style={{ marginTop: 20 }}>
        <a href="/manage">Go to Management Dashboard</a>
      </div>
    </>
  );
}
