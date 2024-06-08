import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md space-y-4 w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-center">Sign Up</h1>
        <form className="space-y-4">
          <div>
            <label htmlFor="firstname" className="block mb-1">
              First Name:
            </label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="lastname" className="block mb-1">
              Last Name:
            </label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="username" className="block mb-1">
              Username:
            </label>
            <input
              type="text"
              name="username"
              id="username"
              required
              className="w-full p-2 border rounded"
            />
          </div>
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
            />
          </div>
          <button
            type="submit"
            className="w-full bg-cyan-700 text-white p-2 rounded hover:bg-cyan-800"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-cyan-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
