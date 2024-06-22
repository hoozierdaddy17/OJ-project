import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Cookies from "js-cookie"; // Import js-cookie

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // State to manage login errors

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:7000/auth/login", {
        email,
        password,
      });
      // Store token as a cookie
      Cookies.set("token", response.data.token, { expires: 1 }); // Expires in 1 day
      onLogin(); // Call the onLogin function passed as prop
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid credentials. Please check your email and password."); // Set error message for display
    }
  };

  const handleDismissError = () => {
    setError(null); // Clear error message
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md space-y-4 w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

        {/* Error Message Popup */}
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {error}</span>
            <span
              className="absolute top-0 bottom-0 right-0 px-4 py-3"
              onClick={handleDismissError}
            >
              <button className="text-red-700 font-bold hover:text-red-900">
                X
              </button>
            </span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="w-full p-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1">
              Password:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              className="w-full p-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-cyan-700 text-white p-2 rounded hover:bg-cyan-800"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-cyan-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
