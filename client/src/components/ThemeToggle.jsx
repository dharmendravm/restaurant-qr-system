import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : true;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button className="cursor-pointer" onClick={() => setDark(prev => !prev)}>
      {dark ? (
        <Sun className="text-yellow-300" />
      ) : (
        <Moon className="text-blue-950" />
      )}
    </button>
  );
}
