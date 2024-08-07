const jwt = require("jwt-decode");
const cookieParser = require("cookie-parser");

const authMiddleware = (req, res, next) => {
  try {
    // Get the JWT from the cookie
    const token = req.cookies["jwt"];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Decode the JWT
    const decoded = jwt(token);

    // Extract the isAdmin status
    const isAdmin = decoded.isAdmin;

    // Add isAdmin status to the request object
    req.isAdmin = isAdmin;

    next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
