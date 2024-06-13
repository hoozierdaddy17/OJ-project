import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "../App.css";

// pages & components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Problems from "./pages/Problems";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
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
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
