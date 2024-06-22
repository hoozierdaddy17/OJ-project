import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { FiEdit, FiEye, FiEyeOff } from "react-icons/fi"; 


const ProfileStatsPanel = () => {
  const statsData = [
    { label: "Submissions", value: 24 },
    { label: "Points", value: 78 },
    { label: "Followers", value: 123 },
    { label: "Following", value: 45 },
  ];

  return (
    <div className="bg-gray-200 p-4 shadow rounded-lg mx-4 mb-4 mt-4">
      <h2 className="text-xl font-bold mb-4">Statistics</h2>
      <div className="grid grid-cols-2 gap-4">
        {statsData.map((stat, index) => (
          <div key={index} className="p-2 bg-white shadow rounded">
            <p className="text-gray-800 font-bold">{stat.label}</p>
            <p className="text-gray-600">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState({
    username: false,
    email: false,
    password: false,
  });
  const [updatedFields, setUpdatedFields] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = Cookies.get("token");
        const response = await axios.get("http://localhost:7000/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const token = Cookies.get("token");
      const response = await axios.put(
        "http://localhost:7000/user",
        {
          username: updatedFields.username || userData.username,
          email: updatedFields.email || userData.email,
          password: updatedFields.password,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUserData(response.data);
      setEditMode({ username: false, email: false, password: false });
      setUpdatedFields({ username: "", email: "", password: "" });
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  const handleEdit = (field) => {
    setEditMode((prev) => ({ ...prev, [field]: true }));
    setUpdatedFields((prev) => ({ ...prev, [field]: userData[field] }));
  };

  const handleCancelEdit = (field) => {
    setEditMode((prev) => ({ ...prev, [field]: false }));
    setUpdatedFields((prev) => ({ ...prev, [field]: "" }));
  };

  // function to toggle password visibility
  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8 px-4 flex">
        <aside className="bg-gray-700 bg-opacity-50 text-white w-64 p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Dashboard</h2>
          <nav>
            <ul>
              <li
                className={`mb-2 ${activeTab === "profile" ? "font-bold" : ""}`}
              >
                <button
                  onClick={() => setActiveTab("profile")}
                  className="text-white w-full text-left"
                >
                  Profile
                </button>
              </li>
              <li
                className={`mb-2 ${
                  activeTab === "submissions" ? "font-bold" : ""
                }`}
              >
                <button
                  onClick={() => setActiveTab("submissions")}
                  className="text-white w-full text-left"
                >
                  Submissions
                </button>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-4 bg-white rounded-lg shadow ml-4">
          {activeTab === "profile" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                User Profile
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userData ? (
                  <>
                    <div className="p-4 bg-gray-200 rounded shadow">
                      <h3 className="text-lg font-bold mb-2">
                        Personal Information
                      </h3>
                      <p className="text-gray-700 mb-1">
                        <span className="font-bold">Firstname:</span>{" "}
                        {userData.firstname}
                      </p>
                      <p className="text-gray-700 mb-1">
                        <span className="font-bold">Lastname:</span>{" "}
                        {userData.lastname}
                      </p>
                    </div>
                    {/* Updated password field handling */}
                    {["username", "email", "password"].map((field) => (
                      <div
                        key={field}
                        className="p-4 bg-gray-200 rounded shadow"
                      >
                        <label className="font-bold text-gray-700 capitalize">
                          {field}:
                        </label>
                        {editMode[field] ? (
                          <div className="flex items-center mt-2">
                            {field === "password" ? (
                              <input
                                type={showPassword ? "text" : "password"}
                                value={updatedFields[field]}
                                onChange={(e) =>
                                  setUpdatedFields({
                                    ...updatedFields,
                                    [field]: e.target.value,
                                  })
                                }
                                className="w-full p-2 border rounded mr-2"
                              />
                            ) : (
                              <input
                                type="text"
                                value={updatedFields[field]}
                                onChange={(e) =>
                                  setUpdatedFields({
                                    ...updatedFields,
                                    [field]: e.target.value,
                                  })
                                }
                                className="w-full p-2 border rounded mr-2"
                              />
                            )}
                            {/* Toggle button for password visibility */}
                            {field === "password" ? (
                              <button
                                onClick={toggleShowPassword}
                                className="text-green-700 hover:text-green-900"
                              >
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                              </button>
                            ) : null}
                            <button
                              onClick={() => handleCancelEdit(field)}
                              className="text-green-700 hover:text-green-900"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center mt-2">
                            <p className="text-gray-900 flex-1">
                              {field === "password"
                                ? "********"
                                : userData[field]}
                            </p>
                            <FiEdit
                              className="ml-2 cursor-pointer"
                              onClick={() => handleEdit(field)}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                    <div className="col-span-full mt-4">
                      <button
                        onClick={handleUpdateProfile}
                        className="w-full bg-green-700 text-white p-2 rounded hover:bg-green-800"
                      >
                        Update Profile
                      </button>
                    </div>
                  </>
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            </div>
          )}
          {activeTab === "submissions" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Submissions
              </h2>
              <div className="p-4 bg-gray-200 rounded shadow">
                <p className="text-gray-700">
                  Here you can see all your submissions.
                </p>
                {/* Add your submission content here */}
              </div>
            </div>
          )}
        </main>
      </div>
      {activeTab === "profile" && <ProfileStatsPanel />}{" "}
      {/* Render stats panel only on profile tab */}
    </div>
  );
};

export default ProfilePage;
