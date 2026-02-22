import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { ThemeProvider } from "@material-tailwind/react";
import Team from "./pages/Team"; 
import Calender from "./pages/Calender";
import Project from "./pages/Project"; 


function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<Team />} />
           <Route path="/projects" element={<Project />} />
           <Route path="/calender" element={<Calender />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;