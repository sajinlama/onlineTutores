  import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

  import Register from "./components/register";
  import Login from "./components/login";
  import Layout from "./components/layout";
  import Dashboard from "./components/dashboard";

  import ProtectedRoute from "./components/protectedRoutes";
  import Homepage from "./components/homepage";
  import SubjectQuizWrapper from "./components/SubjectQuizWrapper";
import Setting from "./components/setting";

  function App() {
    return (
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Layout />}>
              <Route index element={<Dashboard />} />
            <Route path="quiz/:subjectId" element={<SubjectQuizWrapper />} />
             <Route path="setting" element={<Setting />} />
            
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    );
  }

  export default App;
