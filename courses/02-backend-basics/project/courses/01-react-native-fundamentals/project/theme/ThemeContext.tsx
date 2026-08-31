
import React, { createContext, useState, useContext } from "react";
import { lightTheme, darkTheme } from "./theme";

const ThemeContext = createContext({
  theme: darkTheme,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(darkTheme);

  const toggleTheme = () => {
    setTheme(theme === darkTheme ? lightTheme : darkTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
