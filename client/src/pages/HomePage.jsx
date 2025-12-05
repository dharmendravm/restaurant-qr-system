import axios from "axios";
import React, { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/menu", {
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
