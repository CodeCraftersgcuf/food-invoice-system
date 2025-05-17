import React, { useState } from 'react';
import axios from 'axios';
import './auth.css';

export default function Register({ onSwitch }) {
  const [form, setForm] = useState({
    name: '', email: '', password: ''
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/register', {
        ...form,
        role: 'accountant', // hardcoded role
      });
      localStorage.setItem('token', res.data.token);
      alert('Registration successful');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="auth-wrapper">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          name="name"
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          name="email"
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Password"
          required
        />

        {/* No role selector shown to user */}

        <button type="submit">Register</button>
        <button
          type="button"
          onClick={onSwitch}
          style={{ marginTop: '1rem', background: '#ccc' }}
        >
          Go to Login
        </button>
      </form>
    </div>
  );
}
