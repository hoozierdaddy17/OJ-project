import { Routes, Route } from "react-router-dom";
import "../App.css";

// pages & components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// import Profile from "./pages/Profile";
import Problems from "./pages/Problems";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="pages">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          <Route path="/problems" element={<Problems />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
