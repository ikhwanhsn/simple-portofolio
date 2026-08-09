import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Provider from "./provider";
import { SITE_URL, profile } from "@/data/profile";

const title =
  "Ikhwanul Husna | Founder of Syra AI · Agentrail · CTO of S3Labs";
const description =
  "One human running a multi-billion-dollar company with agents. Founder of Syra AI and Agentrail. CTO of S3Labs. Scale with agents, not headcount.";
const ogImageAlt = `${profile.name} · ${profile.tagline}`;
const ogImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: ogImageAlt,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: "%s | Ikhwanul Husna",
  },
  description,
  applicationName: "Ikhwanul Husna",
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  keywords: [
    "Ikhwanul Husna",
    "Syra AI",
    "S3Labs",
    "AI agents",
    "Solana",
    "x402",
    "Web3",
  ],
  alternates: {
    types: {
      "text/plain": [
        { url: `${SITE_URL}/llms.txt`, title: "llms.txt" },
        { url: `${SITE_URL}/llms-full.txt`, title: "llms-full.txt" },
      ],
      "application/json": [
        { url: `${SITE_URL}/profile.json`, title: "profile.json" },
      ],
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Ikhwanul Husna",
    title,
    description,
    locale: "en_US",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@Ikhwanhsn",
    images: ["/og.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: SITE_URL,
  image: `${SITE_URL}/og.png`,
  jobTitle: [
    "Founder of Syra AI",
    "Founder of Agentrail",
    "CTO of S3Labs",
  ],
  description: profile.tagline,
  email: profile.contact.email,
  address: {
    "@type": "PostalAddress",
    addressCountry: "ID",
  },
  sameAs: [
    profile.contact.linkedin,
    profile.contact.x,
    profile.contact.telegram,
    profile.contact.instagram,
  ],
  knowsAbout: [
    "AI Agents",
    "Solana",
    "x402",
    "Web3",
    "Syra AI",
    "S3Labs",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="author" type="text/plain" href="/humans.txt" />
        <link
          rel="alternate"
          type="text/plain"
          title="llms.txt"
          href="/llms.txt"
        />
        <link
          rel="alternate"
          type="application/json"
          title="profile.json"
          href="/profile.json"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");var d=window.matchMedia("(prefers-color-scheme: dark)").matches;var r=t==="light"||t==="dark"?t:(d?"dark":"light");var e=document.documentElement;e.classList.toggle("dark",r==="dark");e.style.colorScheme=r;}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${GeistSans.className} antialiased min-h-screen bg-background text-text`}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
