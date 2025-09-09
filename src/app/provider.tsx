"use client";

import Navbar from "@/components/Navbar";
import { createContext, useState } from "react";

const ThemeContext = createContext("bg-background text-text");
const Provider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState("bg-background text-text");
  return (
    <ThemeContext.Provider value={theme}>
      <div className={theme}>
        <div className="max-w-lg mx-auto text-sm pt-10">
          <Navbar setTheme={setTheme} />
          {children}
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default Provider;
