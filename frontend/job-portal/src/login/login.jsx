import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import { useAuth } from '../authProviderComponents/authProvider'; 

const Login = () => {
  const { setAuth } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        }),
        credentials: 'include'
      });
      const data = await response.json();
      if (data.isAuthenticated && data.user.isadmin) {
        setAuth({ isAuthenticated: true, user: data.user, isadmin: data.user.isadmin });
        navigate('/home')
      } else if(data.isAuthenticated && !data.user.isadmin) {
        setAuth({ isAuthenticated: true, user: data.user, isadmin: data.user.isadmin });
      } else {
        console.log('Invalid credentials');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div id="welcome-container">
          <h2>Welcome Back!</h2>
          <p>Log in to continue your journey with us</p>
        </div>
        <div id="login-form-container">
          <h2 className="form-title">Log In</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <input
              type="text"
              name="username"
              className="input-field"
              required
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Email Address"
            />
            <input
              type="password"
              name="password"
              className="input-field"
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button type="submit" className="submit-button">Log In</button>
          </form>
          <p className="signup-link">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
