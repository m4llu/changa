import React, { useState } from 'react';
import './Login.scss';
import { User } from '../../../types/User'; // Ensure the User type includes the token property if necessary

interface LoginProps {
  onLogin: (user: User) => void; // Callback function to pass the user object after successful login
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

      const data: { token: string; user: User } = await response.json(); // Expecting the API to return the user data and JWT token

      // Store JWT token in localStorage
      localStorage.setItem('token', data.token);

      // Call the onLogin function with the user data
      onLogin(data.user);

      // Optionally redirect the user after successful login
      window.location.href = '/dashboard'; // Adjust this URL to the appropriate route in your application
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
        
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className='already-account'>Don't have an account? <a href="/register">Sign Up</a></p> {/* Adjust link as needed */}
      </form>
    </div>
  );
};

export default Login;
