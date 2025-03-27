"use client";
import React, { createContext, useState, useContext, useEffect } from "react";

// Define the types for the theme context
type Theme = "light" | "dark";
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};


const ThemeContext = createContext<ThemeContextType | undefined>(undefined);


export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
 
  const [theme, setTheme] = useState<Theme>("light");
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
  };

 
  useEffect(() => {
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};


export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
