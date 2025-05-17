import React, { useState } from 'react';
import axios from 'axios';
import './auth.css';

export default function Login({ onSwitch }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
const navigateToDashboard = () => {
    window.location.href = '/dashboard';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/login', form);
      localStorage.setItem('token', res.data.token);
      navigateToDashboard(); // ✅ redirect to route-based dashboard
    } catch (err) {
      setError('Invalid credentials');
    }
  };

   return (
    <div className="auth-wrapper">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input name="email" onChange={handleChange} placeholder="Email" required />
        <input name="password" type="password" onChange={handleChange} placeholder="Password" required />
        <button type="submit">Login</button>

        <button
          type="button"
          onClick={onSwitch}
          style={{ marginTop: '1rem', background: '#ccc' }}
        >
          Go to Register
        </button>
      </form>
    </div>
  );
}
