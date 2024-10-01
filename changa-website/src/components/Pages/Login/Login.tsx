import React, { useState } from 'react';
import './Login.scss';

interface User {
  id: number;
  name: string;
  email: string;
  role: string; // Assuming Role is a string
  created: string; // ISO string for DateTime
}

interface LoginProps {
  onLogin: (user: User) => void; // Update the onLogin prop to accept the entire user object
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

      const data: User = await response.json(); // Adjust the type based on your API response structure
      console.log('Login successful:', data);

      localStorage.setItem('token', data.token);
      onLogin(data); // Pass the entire user object to the onLogin function

      window.location.href = '/dashboard'; // Adjust as needed

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
          <label htmlFor="email">Email (username for now)</label>
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
        
        <p className='already-account'>Already have an account?</p>
      </form>
    </div>
  );
};

export default Login;
