import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login/Login";
import Register from "@/pages/auth/register/Register";
// import Navbar from "./components/Navbar";
import Menu from "./pages/Menu";
import ProtectedRoutes from "./components/ProtectedRoutes";
import HomePage from "./pages/HomePage";
import Welcome from "./pages/Welcome";


const App = () => {
  return (
    <div className="min-h-screen bg-[#010103]">
      {/* <Navbar /> */}
      <Router>
        <Routes>

          {/* Open Routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/welcome" element={<Welcome/>}/>
          <Route path="/login" element={<Login />} />

          {/*Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <HomePage />
              </ProtectedRoutes>
            }
          />
  
          <Route path="/menu" element={<Menu />} />

        </Routes>
      </Router>
    </div>
  );
};
export default App;
