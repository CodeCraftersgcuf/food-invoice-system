import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useAuth() {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await axios.get('/api/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data);
    } catch (err) {
      console.error('Auth failed:', err);
      localStorage.removeItem('token');
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, fetchUser };
}
