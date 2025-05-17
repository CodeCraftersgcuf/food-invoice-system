import React, { useEffect, useState } from 'react';
import useAuth from './hooks/useAuth';
import CreateReceipt from './components/dashboard/CreateReceipt';
import AdminReceipts from './components/dashboard/AdminReceipts';

export default function DashboardRouter() {
  const { user } = useAuth();
  const [view, setView] = useState(null);

  useEffect(() => {
    if (!user) return;
    if (user.role === 'admin') setView('admin');
    else setView('create');
  }, [user]);

  if (!user) return <p>Loading...</p>;

return (
    <>
{view === 'admin' && <AdminReceipts />}
      {view === 'create' && <CreateReceipt />}
    </>
  );
}
