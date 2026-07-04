"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Save, Moon, Sun, LogOut, User, Lock, Paintbrush, 
  ShieldAlert, AlertCircle, CheckCircle2 
} from "lucide-react";
import { useTheme } from "@/contexapi/themeprovider";

const API_ENDPOINTS = {
  CHANGE_PASSWORD: "http://localhost:5001/api/users/change-password",
  UPDATE_PROFILE: "http://localhost:5001/api/users/update-profile",
};

export default function Setting() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    userId: "",
  });

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newName, setNewName] = useState("");
  
  const [passwordAlert, setPasswordAlert] = useState({ show: false, message: "", type: "" });
  const [profileAlert, setProfileAlert] = useState({ show: false, message: "", type: "" });
  
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const username = localStorage.getItem("name") || "User";
    const userEmail = localStorage.getItem("email") || "user@example.com";
    const userId = localStorage.getItem("userId") || "";
    
    setUser({ name: username, email: userEmail, userId });
    setNewName(username);
  }, []);

  // Alert cleanups automatically after a few seconds for better UX
  useEffect(() => {
    if (profileAlert.show) {
      const t = setTimeout(() => setProfileAlert(p => ({ ...p, show: false })), 4000);
      return () => clearTimeout(t);
    }
  }, [profileAlert.show]);

  useEffect(() => {
    if (passwordAlert.show) {
      const t = setTimeout(() => setPasswordAlert(p => ({ ...p, show: false })), 4000);
      return () => clearTimeout(t);
    }
  }, [passwordAlert.show]);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setPasswordAlert({
        show: true,
        message: "New passwords don't match match verification setup.",
        type: "error",
      });
      return;
    }
    
    if (newPassword.length < 8) {
      setPasswordAlert({
        show: true,
        message: "Password safety threshold requires at least 8 characters.",
        type: "error",
      });
      return;
    }
    
    setIsUpdatingPassword(true);
    try {
      await axios.post(
        API_ENDPOINTS.CHANGE_PASSWORD, 
        { userId: user.userId, currentPassword, newPassword },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" }
        }
      );
      
      setPasswordAlert({
        show: true,
        message: "Security credentials updated successfully.",
        type: "success",
      });
      
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to update security framework.";
      setPasswordAlert({ show: true, message: errorMessage, type: "error" });
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingProfile(true);
    
    try {
      await axios.put(
        API_ENDPOINTS.UPDATE_PROFILE,
        { userId: user.userId, name: newName },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" }
        }
      );
      
      localStorage.setItem("name", newName);
      setUser(prev => ({ ...prev, name: newName }));
      
      setProfileAlert({
        show: true,
        message: "Profile workspace updated successfully.",
        type: "success",
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Profile synchronization failure.";
      setProfileAlert({ show: true, message: errorMessage, type: "error" });
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen w-full bg-[#fafafa] dark:bg-[#030303] text-zinc-900 dark:text-zinc-100 font-sans antialiased relative p-6 md:p-10 transition-colors duration-300">
      <div className="w-full max-w-7xl mx-auto space-y-6 relative z-10">
        
        {/* Module Header Bar Layout */}
        <div className="w-full bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-5 shadow-sm flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl font-bold tracking-tight">System Settings</h1>
            </div>
            <p className="text-xs text-zinc-400 dark:text-zinc-500">Manage your profile, security settings, and environment workspace options</p>
          </div>
        </div>

        {/* Master Workspace Split Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Forms and Configuration Module Controls */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Profile Configuration Section */}
            <div className="bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
              <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-900/60 pb-4">
                <div className="w-8 h-8 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black rounded-lg flex items-center justify-center shadow-sm">
                  <User size={16} />
                </div>
                <h2 className="text-md font-bold tracking-tight">Profile Information</h2>
              </div>

              {profileAlert.show && (
                <div className={`p-4 border rounded-xl flex items-start gap-3 text-xs font-medium transition-all duration-300 ${
                  profileAlert.type === "success" 
                    ? "bg-emerald-500/5 border-emerald-500/10 text-emerald-600 dark:text-emerald-400" 
                    : "bg-red-500/5 border-red-500/10 text-red-600 dark:text-red-400"
                }`}>
                  {profileAlert.type === "success" ? <CheckCircle2 size={16} className="flex-shrink-0" /> : <AlertCircle size={16} className="flex-shrink-0" />}
                  <span>{profileAlert.message}</span>
                </div>
              )}

              <form onSubmit={handleProfileUpdate} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={user.email}
                    disabled
                    className="w-full p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-100 dark:bg-zinc-900/60 text-zinc-400 dark:text-zinc-500 text-sm select-none outline-none cursor-not-allowed"
                  />
                  <p className="text-[11px] text-zinc-400 dark:text-zinc-500 pl-1">Primary authentication registry routing token cannot be modified.</p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    Display Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 text-sm focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors outline-none"
                    placeholder="Enter system profile handle"
                    required
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={isUpdatingProfile}
                    className="h-11 px-6 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black font-semibold text-sm rounded-xl shadow-md transition-all active:scale-[0.98] disabled:opacity-20 flex items-center gap-2 group hover:opacity-90 cursor-pointer"
                  >
                    <Save size={15} />
                    <span>{isUpdatingProfile ? "Saving Profile..." : "Save Profile Changes"}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Password Configuration Section */}
            <div className="bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
              <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-900/60 pb-4">
                <div className="w-8 h-8 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black rounded-lg flex items-center justify-center shadow-sm">
                  <Lock size={16} />
                </div>
                <h2 className="text-md font-bold tracking-tight">Security Credentials</h2>
              </div>

              {passwordAlert.show && (
                <div className={`p-4 border rounded-xl flex items-start gap-3 text-xs font-medium transition-all duration-300 ${
                  passwordAlert.type === "success" 
                    ? "bg-emerald-500/5 border-emerald-500/10 text-emerald-600 dark:text-emerald-400" 
                    : "bg-red-500/5 border-red-500/10 text-red-600 dark:text-red-400"
                }`}>
                  {passwordAlert.type === "success" ? <CheckCircle2 size={16} className="flex-shrink-0" /> : <AlertCircle size={16} className="flex-shrink-0" />}
                  <span>{passwordAlert.message}</span>
                </div>
              )}

              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="currentPassword" className="block text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 text-sm focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="newPassword" className="block text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                      New Security Key
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 text-sm focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors outline-none"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="block text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                      Verify New Security Key
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 text-sm focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={isUpdatingPassword}
                    className="h-11 px-6 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black font-semibold text-sm rounded-xl shadow-md transition-all active:scale-[0.98] disabled:opacity-20 flex items-center gap-2 group hover:opacity-90 cursor-pointer"
                  >
                    <Save size={15} />
                    <span>{isUpdatingPassword ? "Updating Token..." : "Update Security Matrix"}</span>
                  </button>
                </div>
              </form>
            </div>

          </div>

          {/* Right Column: Layout Actions, Side Panels and Token Disconnects */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Visual Customization Workspace Block */}
            <div className="bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 border-b border-zinc-100 dark:border-zinc-900/60 pb-3">
                <Paintbrush size={16} className="text-zinc-400" />
                <span className="text-xs uppercase font-bold tracking-wider text-zinc-400 dark:text-zinc-500">Appearance Theme Engine</span>
              </div>
              
              <div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800/80 p-4 rounded-xl">
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Environment Theme</span>
                <button
                  onClick={toggleTheme}
                  className="h-9 px-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black font-semibold text-xs rounded-xl shadow-md hover:opacity-90 active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
                >
                  {theme === "dark" ? (
                    <>
                      <Sun size={14} />
                      <span>Light Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon size={14} />
                      <span>Dark Mode</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Session Management Area */}
            <div className="bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 border-b border-zinc-100 dark:border-zinc-900/60 pb-3">
                <ShieldAlert size={16} className="text-red-500/80" />
                <span className="text-xs uppercase font-bold tracking-wider text-zinc-400 dark:text-zinc-500">Session Workspace Terminus</span>
              </div>
              
              <p className="text-xs text-zinc-400 dark:text-zinc-500 leading-relaxed px-1">
                Terminating your environment clears browser tokens and state registers. You will need to re-authenticate to gain access again.
              </p>

              <button
                onClick={handleLogout}
                className="h-11 w-full bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/20 font-semibold rounded-xl text-sm shadow-sm active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogOut size={14} />
                <span>Disconnect Active Session</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}