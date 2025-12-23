import { useEffect } from "react";
import { Outlet } from "react-router-dom";

function ForceDarkPages() {
  useEffect(() => {
    document.documentElement.classList.add("dark");

    return () => {
    };
  }, []);

  return <Outlet/>;
}

export default ForceDarkPages;