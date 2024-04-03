"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const navbar = ["Work", "About", "Blog"];
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);
  return (
    <nav
      className={`flex justify-between items-center text-greyText px-1 border-greyText border-opacity-15 border-b pb-3 font-mono text-xs`}
    >
      <ul className="flex items-center justify-center gap-2">
        {navbar.map((item, index) => (
          <li key={index}>
            <Link
              href={`${item === "Work" ? "/" : `/${item.toLowerCase()}`}`}
              className={`hover:border-b hover:border-greyText ${
                pathname ===
                `${item === "Work" ? "/" : `/${item.toLowerCase()}`}`
                  ? "border-b font-bold text-text border-greyText"
                  : ""
              }`}
            >
              {item}
            </Link>
            {item === "Blog" ? "" : <span className="ml-1">/</span>}
          </li>
        ))}
      </ul>
      <button
        className="w-28 px-5 py-2 rounded-full transition-all duration-200 ease-in hover:bg-cardHover"
        onClick={() => setIsDarkMode(!isDarkMode)}
      >
        {isDarkMode ? "Lights on" : "Lights off"}
      </button>
    </nav>
  );
};

export default Navbar;
