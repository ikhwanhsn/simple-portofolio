import type { Metadata } from "next";
import Link from "next/link";
import { now } from "@/data/now";
import { SITE_URL, profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Now",
  description: `What ${profile.name} is focused on right now. ${now.focus}`,
  alternates: { canonical: `${SITE_URL}/now` },
  openGraph: {
    title: "Now",
    description: `What ${profile.name} is focused on right now. ${now.focus}`,
    url: `${SITE_URL}/now`,
  },
};

const NowPage = () => {
  return (
    <main className="mt-12 min-h-screen mb-4">
      <p className="font-mono text-xs text-greyText">Now</p>
      <h1 className="mt-3 font-medium text-2xl leading-snug tracking-tight">
        What I&apos;m on right now
      </h1>
      <p className="mt-2 font-mono text-[11px] text-greyText">
        Updated {now.displayDate}
      </p>
      <p className="mt-5 font-medium text-greyText leading-relaxed">
        {now.focus}
      </p>

      <section className="mt-12">
        <p className="font-mono text-xs text-greyText">Building</p>
        <ul className="mt-4 space-y-5">
          {now.building.map((item) => (
            <li key={item.title}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:border-b hover:border-greyText hover:text-greyText"
              >
                {item.title}
              </a>
              <p className="mt-1 font-medium text-greyText leading-relaxed">
                {item.detail}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <p className="font-mono text-xs text-greyText">Thinking about</p>
        <ul className="mt-4 space-y-2 font-medium text-greyText">
          {now.reading.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <p className="font-mono text-xs text-greyText">Open to</p>
        <p className="mt-4 font-medium leading-relaxed">{now.openTo}</p>
      </section>

      <p className="mt-12 font-mono text-xs text-greyText">
        <Link href="/" className="hover:border-b hover:border-greyText">
          ← Work
        </Link>
        <span className="mx-2">/</span>
        <Link href="/about" className="hover:border-b hover:border-greyText">
          About
        </Link>
      </p>
    </main>
  );
};

export default NowPage;
