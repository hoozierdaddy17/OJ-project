import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../App"; // Ensure this path is correct

const Sidebar = () => {
  const location = useLocation();
  const { user } = useContext(UserContext); // Access the user object from context

  // Log the user object to debug
  console.log("Sidebar - User:", user);

  return (
    <div className="w-1/4 h-screen bg-gray-800 text-white p-4">
      <h2 className="text-2xl font-bold mb-4">Navigation</h2>
      <ul>
        <li
          className={`mb-2 ${
            location.pathname === "/problems" ? "bg-gray-700" : ""
          }`}
        >
          <Link to="/problems">Problem List</Link>
        </li>

        {/* Conditionally render Create Problem if user is an admin */}
        {user.isAdmin && (
          <li
            className={`mb-2 ${
              location.pathname === "/problems/create" ? "bg-gray-700" : ""
            }`}
          >
            <Link to="/problems/create">Create Problem</Link>
          </li>
        )}

        {
          <>
            <li
              className={`mb-2 ${
                location.pathname.includes("/problems/edit")
                  ? "bg-gray-700"
                  : ""
              }`}
            >
              <Link to="#">Update Problem (Use Edit Icon)</Link>
            </li>
            <li
              className={`mb-2 ${
                location.pathname.includes("/problems/delete")
                  ? "bg-gray-700"
                  : ""
              }`}
            >
              <Link to="#">Delete Problem (Use Delete Icon)</Link>
            </li>
          </>
        }
      </ul>
    </div>
  );
};

export default Sidebar;
