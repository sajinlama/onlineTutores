import { useState, useEffect } from "react";
import { Save, Moon, Sun, LogOut } from "lucide-react";
import { useTheme } from "@/contexapi/themeprovider";
import axios from "axios";

// Backend API endpoints - you'll implement these on your server
const API_ENDPOINTS = {
  CHANGE_PASSWORD: "http://localhost:5001/api/users/change-password",
  UPDATE_PROFILE: "http://localhost:5001/api/users/update-profile",
};

function Setting() {
  // User state
  const [user, setUser] = useState({
    name: "",
    email: "",
    userId: "",
  });

  // Form states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newName, setNewName] = useState("");
  
  // Alert states
  const [passwordAlert, setPasswordAlert] = useState({ show: false, message: "", type: "" });
  const [profileAlert, setProfileAlert] = useState({ show: false, message: "", type: "" });
  
  // Loading states
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  
  // Theme context using the hook
  const { theme, toggleTheme } = useTheme();

  // Load user data
  useEffect(() => {
    const username = localStorage.getItem("name") || "User";
    const userEmail = localStorage.getItem("email") || "user@example.com";
    const userId = localStorage.getItem("userId") || "";
    
    setUser({ name: username, email: userEmail, userId });
    setNewName(username);
  }, []);

  // Handle password change
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    // Validation
    if (newPassword !== confirmPassword) {
      setPasswordAlert({
        show: true,
        message: "New passwords don't match",
        type: "error",
      });
      return;
    }
    
    if (newPassword.length < 8) {
      setPasswordAlert({
        show: true,
        message: "Password must be at least 8 characters",
        type: "error",
      });
      return;
    }
    
    setIsUpdatingPassword(true);
    
    try {
      const response = await axios.post(
        API_ENDPOINTS.CHANGE_PASSWORD, 
        {
          userId: user.userId,
          currentPassword,
          newPassword,
        },
        {
          withCredentials: true, // Include cookies
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      
      setPasswordAlert({
        show: true,
        message: "Password updated successfully",
        type: "success",
      });
      
      // Clear form
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      // Handle axios error responses
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          "Failed to update password";
      
      setPasswordAlert({
        show: true,
        message: errorMessage,
        type: "error",
      });
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  // Handle profile update
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    
    setIsUpdatingProfile(true);
    
    try {
      const response = await axios.put(
        API_ENDPOINTS.UPDATE_PROFILE,
        {
          userId: user.userId,
          name: newName,
        },
        {
          withCredentials: true, // Include cookies
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      
      // Update local storage
      localStorage.setItem("name", newName);
      
      // Update user state
      setUser(prev => ({ ...prev, name: newName }));
      
      setProfileAlert({
        show: true,
        message: "Profile updated successfully",
        type: "success",
      });
    } catch (error) {
      // Handle axios error responses
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          "Failed to update profile";
      
      setProfileAlert({
        show: true,
        message: errorMessage,
        type: "error",
      });
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    
    // Clear cookies
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
    // Redirect to login
    window.location.href = "/login";
  };

  return (
    <div className="p-6 w-full lg:w-[70vw] h-full bg-white dark:bg-zinc-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-black dark:text-white">Settings</h1>
        
        {/* Profile Section */}
        <div className="bg-gray-50 dark:bg-zinc-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Profile Information</h2>
          
          {profileAlert.show && (
            <div className={`mb-4 p-3 rounded ${
              profileAlert.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}>
              {profileAlert.message}
            </div>
          )}
          
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={user.email}
                disabled
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 dark:bg-zinc-700 text-gray-500 dark:text-gray-400"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Email cannot be changed
              </p>
            </div>
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Display Name
              </label>
              <input
                type="text"
                id="name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md bg-white dark:bg-zinc-800 text-black dark:text-white"
              />
            </div>
            
            <button 
              type="submit"
              disabled={isUpdatingProfile}
              className="flex items-center px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition disabled:opacity-50"
            >
              <Save size={16} className="mr-2" />
              {isUpdatingProfile ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
        
        {/* Password Section */}
        <div className="bg-gray-50 dark:bg-zinc-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Change Password</h2>
          
          {passwordAlert.show && (
            <div className={`mb-4 p-3 rounded ${
              passwordAlert.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}>
              {passwordAlert.message}
            </div>
          )}
          
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md bg-white dark:bg-zinc-800 text-black dark:text-white"
                required
              />
            </div>
            
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md bg-white dark:bg-zinc-800 text-black dark:text-white"
                required
              />
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md bg-white dark:bg-zinc-800 text-black dark:text-white"
                required
              />
            </div>
            
            <button 
              type="submit"
              disabled={isUpdatingPassword}
              className="flex items-center px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition disabled:opacity-50"
            >
              <Save size={16} className="mr-2" />
              {isUpdatingPassword ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
        
        {/* Appearance Section */}
        <div className="bg-gray-50 dark:bg-zinc-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Appearance</h2>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Theme</span>
            <button
              onClick={toggleTheme}
              className="flex items-center px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition"
            >
              {theme === "dark" ? (
                <>
                  <Sun size={16} className="mr-2" />
                  Light Mode
                </>
              ) : (
                <>
                  <Moon size={16} className="mr-2" />
                  Dark Mode
                </>
              )}
            </button>
          </div>
        </div>
        
        {/* Logout Section */}
        <div className="bg-gray-50 dark:bg-zinc-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Session</h2>
          
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            <LogOut size={16} className="mr-2" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Setting;