import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../App";

const ProtectedRoute = ({ element }) => {
  const { user } = useContext(UserContext);

  if (!user || Object.keys(user).length === 0) {
    // If the user is not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If authenticated, render the element
  return element;
};

export default ProtectedRoute;
