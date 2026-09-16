import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    if (email === 'admin@laroche-posay.ng' && password === 'admin123') {
      navigate('/admin/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="admin-login-container">
      <form className="admin-login-card" onSubmit={handleLogin}>
        <img src="/BLUE LOGO.png" alt="La Roche-Posay" className="admin-login-logo" />
        <h1>Authorized Personnel Only</h1>
        <input 
          type="email" 
          placeholder="Corporate Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
        <button type="submit">Access Portal</button>
        <p style={{marginTop: '24px', fontSize: '0.8rem', color: '#64748B', textAlign: 'center'}}>
          Demo: admin@laroche-posay.ng / admin123
        </p>
      </form>
    </div>
  );
};

export default AdminLogin;
