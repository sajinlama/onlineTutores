import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/register";
import Login from "./components/login";
import Layout from "./components/layout";
import Home from "./components/home";
import Dashboard from "./components/dashboard";
import Setting from "./components/setting";
import Maths from "./components/Maths";
import English from "./components/english";
import ScienceSubject from "./components/scienceSubject";


function App() {
  return (
    <BrowserRouter>
      <Routes>
  
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home/*" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="setting" element={<Setting />} />
          <Route path="maths" element={<Maths />} />
          <Route path="english" element={< English/>} />
          <Route path="science" element={<ScienceSubject />} />
        
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
