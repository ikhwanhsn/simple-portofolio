"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <div className="max-w-lg mx-auto text-sm pt-10 px-5 sm:px-0 min-h-screen">
        <Navbar />
        {children}
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Provider;
