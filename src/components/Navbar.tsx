"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);
  return (
    <nav
      className={`flex justify-between items-center text-greyText px-1 border-greyText border-opacity-15 border-b pb-3 font-mono text-xs`}
    >
      <ul className="flex items-center justify-center gap-2">
        <li>
          <Link
            href="/"
            className={`hover:border-b text-text ${
              pathname === "/" ? "border-b font-bold" : ""
            }`}
          >
            Work
          </Link>
        </li>
        /
        <li>
          <Link
            href="/about"
            className={`hover:border-b ${
              pathname === "/about" ? "border-b font-bold" : ""
            }`}
          >
            About
          </Link>
        </li>
        /
        <li>
          <Link
            href="/blog"
            className={`hover:border-b ${
              pathname === "/blog" ? "border-b font-bold" : ""
            }`}
          >
            Blog
          </Link>
        </li>
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
