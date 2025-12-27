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
        <Sun className="w-5 h-5 text-text-accent" />
      ) : (
        <Moon className=" w-5 h-5 text-text-main" />
      )}
    </button>
  );
}
