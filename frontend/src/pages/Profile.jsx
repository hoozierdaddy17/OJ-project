import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { FiEdit } from "react-icons/fi";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState({
    username: false,
    email: false,
    password: false,
    fullname: false,
  });
  const [updatedFields, setUpdatedFields] = useState({
    username: "",
    email: "",
    newPassword: "",
    confirmNewPassword: "",
    firstname: "",
    lastname: "",
  });
  const [activeTab, setActiveTab] = useState("profile");
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = Cookies.get("token");
        const response = await axios.get("http://localhost:7000/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData && editMode.fullname) {
      setUpdatedFields({
        ...updatedFields,
        firstname: userData.firstname || "",
        lastname: userData.lastname || "",
      });
    }
  }, [userData, editMode.fullname]);

  const handleUpdateProfile = async () => {
    if (updatedFields.newPassword !== updatedFields.confirmNewPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const token = Cookies.get("token");
      const response = await axios.put(
        "http://localhost:7000/profile",
        {
          username: updatedFields.username || userData.username,
          email: updatedFields.email || userData.email,
          firstname: updatedFields.firstname || userData.firstname,
          lastname: updatedFields.lastname || userData.lastname,
          password: updatedFields.newPassword || undefined,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUserData(response.data);
      setEditMode({
        username: false,
        email: false,
        password: false,
        fullname: false,
      });
      setUpdatedFields({
        username: "",
        email: "",
        firstname: "",
        lastname: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleEdit = (field) => {
    setEditMode({ ...editMode, [field]: true });
    setUpdatedFields({ ...updatedFields, [field]: userData[field] });
  };

  const handleCancelEdit = (field) => {
    setEditMode({ ...editMode, [field]: false });
    setUpdatedFields({ ...updatedFields, [field]: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8 px-4 flex">
        <aside className="bg-gray-700 text-white w-64 p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Dashboard</h2>
          <nav>
            <ul>
              <li className={activeTab === "profile" ? "font-bold" : ""}>
                <button
                  onClick={() => setActiveTab("profile")}
                  className="text-white w-full text-left"
                >
                  Profile
                </button>
              </li>
              <li className={activeTab === "submissions" ? "font-bold" : ""}>
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
              {userData ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {editMode.fullname ? (
                    <div className="p-4 bg-gray-200 rounded shadow">
                      <label className="font-bold text-gray-700">
                        Full Name:
                      </label>
                      <div className="flex items-center mt-2">
                        <input
                          type="text"
                          placeholder="First Name"
                          value={updatedFields.firstname}
                          onChange={(e) =>
                            setUpdatedFields({
                              ...updatedFields,
                              firstname: e.target.value,
                            })
                          }
                          className="w-1/2 p-2 border rounded mr-2"
                        />
                        <input
                          type="text"
                          placeholder="Last Name"
                          value={updatedFields.lastname}
                          onChange={(e) =>
                            setUpdatedFields({
                              ...updatedFields,
                              lastname: e.target.value,
                            })
                          }
                          className="w-1/2 p-2 border rounded ml-2"
                        />
                        <button
                          onClick={() => handleCancelEdit("fullname")}
                          className="text-green-700 hover:text-green-900 ml-2"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-gray-200 rounded shadow">
                      <label className="font-bold text-gray-700">
                        Full Name:
                      </label>
                      <div className="flex items-center mt-2">
                        <p className="text-gray-900 flex-1">
                          {userData.firstname} {userData.lastname}
                        </p>
                        <FiEdit
                          className="ml-2 cursor-pointer"
                          onClick={() =>
                            setEditMode({ ...editMode, fullname: true })
                          }
                        />
                      </div>
                    </div>
                  )}
                  {["username", "email"].map((field) => (
                    <div key={field} className="p-4 bg-gray-200 rounded shadow">
                      <label className="font-bold text-gray-700 capitalize">
                        {field}:
                      </label>
                      {editMode[field] ? (
                        <div className="flex items-center mt-2">
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
                            {userData[field]}
                          </p>
                          <FiEdit
                            className="ml-2 cursor-pointer"
                            onClick={() => handleEdit(field)}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                  {editMode.password ? (
                    <>
                      <div className="p-4 bg-gray-200 rounded shadow">
                        <label className="font-bold text-gray-700">
                          New Password:
                        </label>
                        <div className="relative">
                          <input
                            type={passwordVisible ? "text" : "password"}
                            value={updatedFields.newPassword}
                            onChange={(e) =>
                              setUpdatedFields({
                                ...updatedFields,
                                newPassword: e.target.value,
                              })
                            }
                            className="w-full p-2 border rounded mt-2"
                          />
                          <span
                            className="absolute right-3 top-3 cursor-pointer"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                          >
                            {passwordVisible ? <BsEyeSlash /> : <BsEye />}
                          </span>
                        </div>
                      </div>
                      <div className="p-4 bg-gray-200 rounded shadow">
                        <label className="font-bold text-gray-700">
                          Confirm New Password:
                        </label>
                        <div className="relative">
                          <input
                            type={passwordVisible ? "text" : "password"}
                            value={updatedFields.confirmNewPassword}
                            onChange={(e) =>
                              setUpdatedFields({
                                ...updatedFields,
                                confirmNewPassword: e.target.value,
                              })
                            }
                            className="w-full p-2 border rounded mt-2"
                          />
                          <span
                            className="absolute right-3 top-3 cursor-pointer"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                          >
                            {passwordVisible ? <BsEyeSlash /> : <BsEye />}
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="p-4 bg-gray-200 rounded shadow">
                      <label className="font-bold text-gray-700">
                        Password:
                      </label>
                      <div className="flex items-center mt-2">
                        <p className="text-gray-900 flex-1">********</p>
                        <FiEdit
                          className="ml-2 cursor-pointer"
                          onClick={() =>
                            setEditMode({ ...editMode, password: true })
                          }
                        />
                      </div>
                    </div>
                  )}
                  <div className="col-span-full mt-4">
                    <button
                      onClick={handleUpdateProfile}
                      className="w-full bg-green-700 text-white p-2 rounded hover:bg-green-800"
                    >
                      Update Profile
                    </button>
                  </div>
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          )}
          {activeTab === "submissions" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Submissions
              </h2>
              <div className="p-4 bg-gray-200 rounded shadow">
                {/* Content for Submissions tab */}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
