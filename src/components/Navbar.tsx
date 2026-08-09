"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMoon, FiSun } from "react-icons/fi";
import BrandMark from "@/components/BrandMark";
import { useTheme } from "@/components/ThemeProvider";

const Navbar = () => {
  const navbar = ["Work", "About", "Blog", "Now"] as const;
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <nav className="flex justify-between items-center text-greyText px-1 border-b border-outline pb-3 font-mono text-xs">
      <div className="flex items-center gap-3 min-w-0">
        <Link
          href="/"
          aria-label="Ikhwanul Husna home"
          className="shrink-0 text-text hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text rounded-md"
        >
          <BrandMark className="size-6" />
        </Link>
        <ul className="flex items-center justify-center gap-2">
          {navbar.map((item, index) => {
            const href = item === "Work" ? "/" : `/${item.toLowerCase()}`;
            const isActive =
              item === "Work"
                ? pathname === "/"
                : pathname === href || pathname.startsWith(`${href}/`);

            return (
              <li key={item}>
                <Link
                  href={href}
                  className={`hover:border-b hover:border-greyText ${
                    isActive ? "border-b font-bold border-greyText" : ""
                  }`}
                >
                  {item}
                </Link>
                {index < navbar.length - 1 ? (
                  <span className="ml-1" aria-hidden>
                    /
                  </span>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>

      <button
        type="button"
        onClick={toggleTheme}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        aria-pressed={isDark}
        className="relative inline-flex items-center justify-center size-9 rounded-full bg-backgroundCard text-text hover:bg-cardHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text overflow-hidden"
      >
        <span
          className={`absolute inline-flex transition-opacity duration-200 ease-out ${
            isDark ? "opacity-100" : "opacity-0"
          }`}
        >
          <FiSun size={16} aria-hidden />
        </span>
        <span
          className={`absolute inline-flex transition-opacity duration-200 ease-out ${
            isDark ? "opacity-0" : "opacity-100"
          }`}
        >
          <FiMoon size={16} aria-hidden />
        </span>
      </button>
    </nav>
  );
};

export default Navbar;
