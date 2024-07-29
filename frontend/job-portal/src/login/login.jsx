import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../authProviderComponents/authProvider";

const Login = () => {
  const { setAuth } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
        credentials: "include",
      });
      const data = await response.json();
      if (data.isAuthenticated && data.user.isadmin) {
        setAuth({
          isAuthenticated: true,
          user: data.user,
          isadmin: data.user.isadmin,
        });
        navigate("/home");
      } else if (data.isAuthenticated && !data.user.isadmin) {
        setAuth({
          isAuthenticated: true,
          user: data.user,
          isadmin: data.user.isadmin,
        });
      } else {
        console.log("Invalid credentials");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="md:flex md:w-1/2 bg-gradient-to-r from-cyan-500 to-teal-500 p-8 md:p-12 text-white flex items-center justify-center">
          <div>
            <h2 className="text-3xl font-bold mb-2">Welcome Back!</h2>
            <p className="mb-4">Log in to continue your journey with us</p>
          </div>
        </div>
        <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
          <div className="w-full">
            <h2 className="text-2xl font-bold mb-8 text-teal-600">Log In</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  name="username"
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-green-500"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Email Address"
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  name="password"
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-green-500"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-400 focus:outline-none"
              >
                Log In
              </button>
            </form>
            <p className="mt-4 text-center">
              Don't have an account?{" "}
              <Link to="/signup" className="text-teal-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;