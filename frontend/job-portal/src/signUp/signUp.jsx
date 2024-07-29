import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css";


const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: ''
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        navigate('/detail', { state: { state: formData } });
      } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-container">
        <div id="welcome-container">
          <div className="welcome-content">
            <h2>Hello, Friend!</h2>
            <p>Enter your personal details and start your journey with us</p>
          </div>
        </div>
        <div id="signup-form-container">
          <form className="signup-form" onSubmit={handleSubmit}>
            <h2 className="form-title">Sign Up</h2>
            <input
              type="text"
              placeholder="Full Name"
              id="username"
              name="username"
              required
              value={formData.username}
              onChange={handleChange}
              className="input-field"
            />
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="input-field"
            />
            <input
              type="password"
              id="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="input-field"
            />
            <div className="role">
              <label>
                Recruiter
                <input
                  className="recruiter"
                  type="radio"
                  name="role"
                  value="Recruiter"
                  checked={formData.role === "Recruiter"}
                  onChange={handleChange}
                />
              </label>
              <label>
                Job Seeker
                <input
                  className="jobseeker"
                  type="radio"
                  name="role"
                  value="Job Seeker"
                  checked={formData.role === "Job Seeker"}
                  onChange={handleChange}
                />
              </label>
            </div>
            <button className="submit-button" type="submit">
              Sign Up
            </button>
            <p className="login-link">
              Already signed up? <Link to="/login">Go to login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;