"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
};

const getThemeFromDom = (): Theme =>
  document.documentElement.classList.contains("dark") ? "dark" : "light";

const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
  root.dataset.theme = theme;
};

const subscribe = (onStoreChange: () => void) => {
  const observer = new MutationObserver(onStoreChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useSyncExternalStore(
    subscribe,
    getThemeFromDom,
    () => "light" as Theme,
  );
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("theme");
    const preferred: Theme =
      stored === "light" || stored === "dark"
        ? stored
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";

    if (getThemeFromDom() !== preferred) {
      applyTheme(preferred);
    }

    document.documentElement.classList.add("theme-ready");
    setReady(true);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    const run = () => {
      applyTheme(next);
      window.localStorage.setItem("theme", next);
    };

    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => void;
    };

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (
      ready &&
      !prefersReducedMotion &&
      typeof doc.startViewTransition === "function"
    ) {
      doc.startViewTransition(run);
      return;
    }

    run();
  }, [ready]);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [setTheme, theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
