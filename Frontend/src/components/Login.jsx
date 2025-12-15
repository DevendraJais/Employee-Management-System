import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setView } from '../redux/uiSlice';

export default function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:4000/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            mutation Login($username: String!, $password: String!) {
              login(username: $username, password: $password) {
                token
                role
              }
            }
          `,
          variables: credentials
        })
      });

      const result = await response.json();
      
      if (result.data?.login) {
        const { token, role } = result.data.login;
        localStorage.setItem('authToken', token);
        localStorage.setItem('userRole', role);
        window.location.reload();
      } else {
        setError(result.errors?.[0]?.message || 'Login failed');
      }
    } catch (error) {
      setError('Login failed: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Employee Management Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="login-info">
          <p>Default credentials:</p>
          <p>Admin: admin / admin123</p>
          {/* <p>Employee: employee / employee123</p> */}
        </div>
      </div>
    </div>
  );
}
