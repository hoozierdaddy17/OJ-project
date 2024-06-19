import { Link, useLocation } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import PropTypes from "prop-types";

const Navbar = ({ isLoggedIn, onLogout }) => {
  const location = useLocation();
  console.log("Navbar - isLoggedIn:", isLoggedIn);

  // Determine if we are on the login or signup page
  const hideSearchBar =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <nav className="bg-cyan-900 text-white p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-extrabold">
          <Link to="/">Algo Arena</Link>
        </h1>
        <div className="flex items-center space-x-6">
          {!hideSearchBar && (
            <div className="relative">
              <input
                className="bg-white text-gray-700 rounded-full px-4 py-2 pr-10 focus:outline-none"
                placeholder="Search a problem"
                type="text"
              />
              <BsSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          )}
          {isLoggedIn ? (
            <>
              <Link
                to="/problems"
                className="text-lg hover:text-cyan-300 transition duration-300"
              >
                Problems
              </Link>
              <Link
                to="/profile"
                className="text-lg hover:text-cyan-300 transition duration-300"
              >
                Profile
              </Link>
              <button
                onClick={onLogout}
                className="text-lg hover:text-cyan-300 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-lg hover:text-cyan-300 transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-lg hover:text-cyan-300 transition duration-300"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Navbar;
