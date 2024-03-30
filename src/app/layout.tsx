import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

export const metadata: Metadata = {
  title: "Ikhwanul Husna",
  description: "Personal Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <title>Ikhwanul Husna</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`bg-background text-text font-sans`}>
        <main className="max-w-lg mx-auto text-sm pt-10">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}
