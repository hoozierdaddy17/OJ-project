import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    toast.success("Logged in successfully!"); // Show success notification on login
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:7000/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        setIsLoggedIn(false);
        localStorage.removeItem("token");
        navigate("/");
        toast.info("Logged out successfully!"); // Show info notification on logout
      } else {
        console.error("Failed to log out");
        toast.error("Failed to log out. Please try again."); // Show error notification
      }
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("An error occurred while logging out."); // Show error notification
    }
  };

  return (
    <div className="App">
      <ToastContainer />
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <div className="pages">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/problems/:id" element={<ProblemDetail />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
