import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { UserContext } from "../App";

const Navbar = ({ onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState("");

  const showSearchBar = location.pathname === "/problems";

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/problems?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="bg-cyan-900 text-white p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-extrabold">
          <Link to="/">Algo Arena</Link>
        </h1>
        <div className="flex items-center space-x-6">
          {showSearchBar && (
            <div className="relative">
              <input
                className="bg-white text-gray-700 rounded-full px-4 py-2 pr-10 focus:outline-none"
                placeholder="Search a problem"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <BsSearch
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={handleSearch}
              />
            </div>
          )}
          {Object.keys(user).length > 0 ? (
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

// Prop type validation
Navbar.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default Navbar;
