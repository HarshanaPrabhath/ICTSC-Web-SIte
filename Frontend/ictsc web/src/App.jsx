import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";

// Pages
import Home from "./pages/Home";
import Team from "./pages/Team"; 
import Calender from "./pages/Calender";
import Project from "./pages/Project"; 
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard"; // Fixed the spelling here
import TShirtRegistration from "./pages/TShirtRegistration";
import HackTrailRegister from "./pages/HackTrailRegister";
import HackTrailDashboard from "./pages/HackTrailDashboard";


function App() {
  return (
    <ThemeProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<Team />} />
          <Route path="/projects" element={<Project />} />
          <Route path="/calender" element={<Calender />} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/register" element={<TShirtRegistration/>} />
          <Route path="/hacktrailregister" element={<HackTrailRegister />} />
          <Route path="/hacktrail-dashboard" element={<HackTrailDashboard />} />
          
          {/* Admin Route */}
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
    </ThemeProvider>
  );
}

export default App;
