import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Provider from "./provider";

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
      <body className={`font-sans`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
