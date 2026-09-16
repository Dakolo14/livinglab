import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import './Admin.css';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Success, route to dashboard
      localStorage.setItem('livinglab_admin_auth', 'true');
      navigate('/admin/dashboard');
    } catch (err: any) {
      console.error(err);
      setError('Invalid email or password.');
    } finally {
      setIsLoading(false);
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
        {error && <p style={{color: '#EF4444', fontSize: '0.85rem', marginBottom: '16px', textAlign: 'left'}}>{error}</p>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Authenticating...' : 'Access Portal'}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
