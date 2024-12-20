import React, { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../Hooks/useLogin";

function login() {
  const { loading, login } = useLogin();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gradient-to-br from-blue-200 to-blue-800">
      <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg w-11/12 max-w-md p-8">
        <h1 className="text-3xl font-extrabold text-center text-white mb-6">
          Login
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          
          <div>
            <label className="block text-white font-semibold mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username..."
              className="w-full px-4 py-2 text-gray-900 bg-white bg-opacity-80 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-white font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password..."
              className="w-full px-4 py-2 text-gray-900 bg-white bg-opacity-80 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="text-center">
            <Link
              to="/signup"
              className="text-blue-200 hover:text-white hover:underline"
            >
              Don't have an account?
            </Link>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition-all duration-200"
            >
              {loading ? <div className="loading loading-spinner"></div> : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default login;
