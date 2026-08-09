import type { Metadata } from "next";
import Header from "@/components/Header";
import Profile from "@/components/Profile";
import WorkTabs from "@/components/WorkTabs";
import { SITE_URL, profile } from "@/data/profile";

export const metadata: Metadata = {
  alternates: { canonical: SITE_URL },
  openGraph: {
    url: SITE_URL,
    title: `${profile.name} | Founder of Syra AI · Agentrail · CTO of S3Labs`,
    description: `${profile.tagline}. Founder of Syra AI and Agentrail. CTO of S3Labs. ${profile.thesis}.`,
  },
};

export default function Home() {
  return (
    <main className="mt-12">
      <Header />
      <Profile />
      <WorkTabs />
    </main>
  );
}
