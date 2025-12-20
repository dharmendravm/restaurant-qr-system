import { useEffect } from "react";

function ForceDarkPages({ children }) {
  useEffect(() => {
    document.documentElement.classList.add("dark");

    return () => {
    };
  }, []);

  return <>{children}</>;
}

export default ForceDarkPages;