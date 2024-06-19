import { useState, useEffect } from "react";
import axios from "axios";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    // Fetch user data from the backend when the component mounts
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:7000/user");
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await axios.put("http://localhost:7000/user", {
        username: newUsername,
        email: newEmail,
        password: newPassword,
      });
      setUserData(response.data);
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
      {userData ? (
        <div>
          <p>Firstname: {userData.firstname}</p>
          <p>Lastname: {userData.lastname}</p>
          <p>Username: {userData.username}</p>
          <p>Email: {userData.email}</p>
          <input
            type="text"
            placeholder="New username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="New email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={handleUpdateProfile}>Update Profile</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfilePage;
