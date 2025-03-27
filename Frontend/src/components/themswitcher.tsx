
import { Sun, Moon } from "lucide-react"; // Optional icons for light/dark
import { useTheme } from "@/contexapi/themeprovider";

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center p-2 rounded-md transition cursor-pointer"
    >
      {theme === "light" ? (
        <Moon size={25}  />
      ) : (
        <Sun size={25}  />
      )}
      
    </button>
  );
};

export default ThemeSwitcher;
