import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    console.log("Submitting login...");

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      console.log("Response status:", response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log("Login success:", data);
        // Store the token in local storage
        localStorage.setItem('token', data.token);
        onLogin(); // Set logged-in state
        navigate(data.redirectUrl || '/navbar');
      } else {
        const data = await response.json();
        console.error("Login error:", data.message);
        setError(data.message || 'Login failed.');
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError('An error occurred during login.');
    }
  };

  const navigateToRegister = () => {
    document.querySelector('.login-container').classList.add('slide-out');
    setTimeout(() => {
      navigate('/register');
    }, 300);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="show-password"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
            />
            <label htmlFor="show-password" className="checkbox-label">Show Password</label>
          </div>

          <button type="submit" className="login-button">Log In</button>
        </form>

        <p className="register-link">
          Don't have an account?{' '}
          <button onClick={navigateToRegister} className="text-button">Register</button>
        </p>
      </div>
    </div>
  );
};

export default Login;
