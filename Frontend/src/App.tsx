import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import Register from "./components/register";
import Login from "./components/login";
import Layout from "./components/layout";

import Dashboard from "./components/dashboard";
import Setting from "./components/setting";
import Maths from "./components/Maths";
import English from "./components/english";
import Science from "./components/scienceSubject";
import ProtectedRoute from "./components/protectedRoutes";
import Homepage from "./components/homepage";

// Protected route component


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element ={<Homepage/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="setting" element={<Setting />} />
            <Route path="maths" element={<Maths />} />
            <Route path="english" element={<English />} />
            <Route path="science" element={<Science />} />
          </Route>
        </Route>
        
        {/* Redirect any unknown routes to login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;