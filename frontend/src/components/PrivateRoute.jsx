import { Route, Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRoute = ({ element, isLoggedIn, ...rest }) => {
  return isLoggedIn ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" replace state={{ from: rest.location }} />
  );
};

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default PrivateRoute;
