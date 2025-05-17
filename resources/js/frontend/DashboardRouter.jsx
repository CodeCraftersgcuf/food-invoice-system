import React, { useEffect, useState } from 'react';
import useAuth from './hooks/useAuth';

export default function DashboardRouter() {
  const { user } = useAuth();
  const [view, setView] = useState(null);

  useEffect(() => {
    if (!user) return;

    if (user.role === 'admin') {
      setView('admin');
    } else {
      setView('receipt');
    }
  }, [user]);

  if (!user) return <p>Loading...</p>;

  return (
    <>
      {view === 'admin' && <h1>Welcome Admin - Dashboard</h1>}
      {view === 'receipt' && <h1>Create Receipt - Accountant View</h1>}
    </>
  );
}
