// src/pages/Register.jsx
import { useState } from 'react';
import API from '../services/api'; // Ensure correct API path
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Import Link component for navigation

const Register = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate(); // Use navigate hook for redirect

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the registration data to the backend
      await API.post('/auth/register', form);
      // On success, navigate to login page
      navigate('/login');
    } catch (err) {
      console.error('Registration failed:', err.response?.data || err.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit">Register</button>
      </form>

      {/* Add this "Already have an account?" section */}
      <p>
        Already have an account?{' '}
        <Link to="/login">Login</Link> {/* Link to the login page */}
      </p>
    </div>
  );
};

export default Register;
