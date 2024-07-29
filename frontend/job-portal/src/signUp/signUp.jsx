import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      navigate("/detail", { state: { state: formData } });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="md:flex md:w-1/2 bg-gradient-to-r from-cyan-500 to-teal-500 p-8 md:p-12 text-white flex items-center justify-center">
          <div>
            <h2 className="text-3xl font-bold mb-2">Hello, Friend!</h2>
            <p className="mb-4">
              Enter your personal details and start your journey with us
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
          <div className="w-full">
            <h2 className="text-2xl font-bold mb-8 text-teal-600">Sign Up</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Full Name"
                id="username"
                name="username"
                required
                value={formData.username}
                onChange={handleChange}
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-green-500"
              />
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-green-500"
              />
              <input
                type="password"
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-green-500"
              />
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="Recruiter"
                    checked={formData.role === "Recruiter"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Recruiter
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="Job Seeker"
                    checked={formData.role === "Job Seeker"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Job Seeker
                </label>
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-400 focus:outline-none"
              >
                Sign Up
              </button>
              <p className="text-center mt-4">
                Already signed up?{" "}
                <Link to="/login" className="text-teal-600 hover:underline">
                  Go to login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;