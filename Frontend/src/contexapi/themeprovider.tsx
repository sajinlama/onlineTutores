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
  // Initialize theme from localStorage or use system preference as fallback
  const [theme, setTheme] = useState<Theme>(() => {
    // Check if we're in the browser environment
    if (typeof window !== "undefined") {
      // Try to get theme from localStorage
      const savedTheme = localStorage.getItem("theme") as Theme;
      
      // If there's a saved theme, use it
      if (savedTheme === "light" || savedTheme === "dark") {
        return savedTheme;
      }
      
      // Otherwise, check system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return "dark";
      }
    }
    
    // Default to light theme
    return "light";
  });

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    
    // Save to localStorage
    localStorage.setItem("theme", newTheme);
  };

  // Apply theme class to document when theme changes
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  // Initialize theme on mount
  useEffect(() => {
    // Apply the initial theme class to document
    document.documentElement.classList.add(theme);
    
    // Save initial theme to localStorage if not already set
    if (typeof window !== "undefined" && !localStorage.getItem("theme")) {
      localStorage.setItem("theme", theme);
    }
  }, []);

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