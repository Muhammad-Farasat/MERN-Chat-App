import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useSignup from "../../Hooks/useSignup";

function signup() {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    // email: '',
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const { loading, signup } = useSignup();

  const submitForm = async (e) => {
    e.preventDefault();
    console.log(inputs);
    await signup(inputs);
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gradient-to-br from-blue-200 to-blue-800">
      <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg w-11/12 max-w-md p-8">
        <h1 className="text-3xl font-extrabold text-center text-white mb-6">
          Sign-up
        </h1>

        <form className="space-y-4" onSubmit={submitForm}>
          <div>
            <label className="block text-white font-semibold mb-1">
              Fullname
            </label>
            <input
              type="text"
              placeholder="Enter your fullname..."
              className="w-full px-4 py-2 text-gray-900 bg-white bg-opacity-80 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={inputs.fullName}
              onChange={(e) =>
                setInputs({ ...inputs, fullName: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-white font-semibold mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username..."
              className="w-full px-4 py-2 text-gray-900 bg-white bg-opacity-80 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
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
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-white font-semibold mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm your password..."
              className="w-full px-4 py-2 text-gray-900 bg-white bg-opacity-80 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
            />
          </div>

          <div className="flex justify-between text-white font-semibold">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                className="radio"
                checked={inputs.gender === "male"}
                onChange={() => setInputs({ ...inputs, gender: "male" })}
              />
              <span>Male</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                className="radio"
                checked={inputs.gender === "female"}
                onChange={() => setInputs({ ...inputs, gender: "female" })}
              />
              <span>Female</span>
            </label>
          </div>

          <div className="text-center">
            <Link
              to="/login"
              className="text-blue-200 hover:text-white hover:underline"
            >
              Already have an account?
            </Link>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition-all duration-200"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default signup;
