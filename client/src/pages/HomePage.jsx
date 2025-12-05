import axios from "axios";
import React, { useEffect } from "react";

// Use the same API base URL env as authSlice
const API_URL = import.meta.env.VITE_API_URL; // dev: http://localhost:3000, prod: your deployed backend

const HomePage = () => {
  useEffect(() => {
    axios.get(`${API_URL}/api/v1/menu`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  }, []);

  return (
    <div className="min-h-screen">
    </div>
  );
};

export default HomePage;
