// App.jsx
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
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
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:7000/auth/logout", {
        method: "POST",
      });

      const data = await response.json(); // Parse response JSON

      if (response.ok) {
        setIsLoggedIn(false);
        localStorage.removeItem("token");
        navigate("/");
        console.log(data.msg); // Log the response message
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="App">
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
