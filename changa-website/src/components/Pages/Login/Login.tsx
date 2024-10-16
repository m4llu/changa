import React, { useState } from 'react';
import './Login.scss';
import { User } from '../../../types/User'; 
import Button from '../../common/Button/Button';

interface LoginProps {
  onLogin: (user: User) => void; 
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      const response = await fetch(`${import.meta.env.VITE_LOCAL_DEBUG_API_URL}/Users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': `${import.meta.env.VITE_API_KEY}`,
        },
        body: JSON.stringify({
          name: email,
          password: password,
        }),
      });
  
      if (!response.ok) {
        const message = await response.json();
        throw new Error(message?.error || 'Login failed');
      }
  
      const data = await response.json();
      console.log("API Response:", data);
  
      if (!data) {
        throw new Error('User data is missing in the response');
      }
  
      onLogin(data);
  
      window.location.href = '/dashboard';
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Sign In</h2>

        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <Button variant='tertiary' fullWidth={true}>
          {loading ? 'Loading...' : 'Sign In'}
        </Button>

        <p className='already-account'>Don't have an account? <a href="/register">Sign Up</a></p>
      </form>
    </div>
  );
};

export default Login;
