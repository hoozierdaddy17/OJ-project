import { useEffect, useState, createContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";

// pages & components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Problems from "./pages/Problems";
import Profile from "./pages/Profile";
import ProblemDetail from "./components/ProblemDetail";
import ProtectedRoute from "./components/ProtectedRoutes"; 

// Create UserContext
export const UserContext = createContext();

function App() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const userInfo = JSON.parse(atob(token.split(".")[1]));
        setUser(userInfo); // Set user state with token data
      } catch (error) {
        console.error("Failed to decode token:", error);
        setUser({});
      }
    }
  }, []);

  const handleLogin = () => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const userInfo = JSON.parse(atob(token.split(".")[1]));
        setUser(userInfo); // Store user info in context
        toast.success("Logged in successfully!");
      } catch (error) {
        console.error("Failed to decode token:", error);
        toast.error("Failed to log in. Please try again.");
      }
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:7000/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        setUser({}); // Reset to empty object on logout
        Cookies.remove("token"); // Remove the token from cookies
        navigate("/");
        toast.info("Logged out successfully!");
      } else {
        console.error("Failed to log out");
        toast.error("Failed to log out. Please try again.");
      }
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("An error occurred while logging out.");
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="App">
        <ToastContainer />
        <Navbar
          isLoggedIn={Object.keys(user).length > 0}
          onLogout={handleLogout}
        />
        <div className="pages">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/problems"
              element={<ProtectedRoute element={<Problems />} />}
            />
            <Route
              path="/profile"
              element={<ProtectedRoute element={<Profile />} />}
            />
            <Route path="/problems/:id" element={<ProblemDetail />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </UserContext.Provider>
  );
}

export default App;
