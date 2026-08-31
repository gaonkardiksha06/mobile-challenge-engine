import React from "react";
import { ThemeProvider } from "./theme/ThemeContext";
import HomeScreen from "./app/(tabs)/index";

export default function App() {
  return (
    <ThemeProvider>
      <HomeScreen />
    </ThemeProvider>
  );
}
