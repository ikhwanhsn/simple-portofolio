import Image from "next/image";
import Link from "next/link";
import profileImg from "../../public/img/profile.jpg";
import Contact from "@/components/Contact";
import { profile } from "@/data/profile";

const collabMailto = `mailto:${profile.contact.email}?subject=${encodeURIComponent(
  "Let's build together",
)}`;

const Header = () => {
  const { agents, humans, status } = profile.workforce;
  const [syra, s3labs] = profile.roles;

  return (
    <header>
      <section className="flex gap-5 items-center">
        <Image
          src={profileImg}
          alt={profile.name}
          width={60}
          height={60}
          sizes="60px"
          priority
          className="rounded-full"
        />
        <aside className="font-medium">
          <div className="flex flex-wrap items-center gap-2">
            <h1>{profile.name}</h1>
            <a
              href={collabMailto}
              className="inline-flex items-center gap-1.5 rounded-md bg-backgroundCard px-2 py-0.5 font-mono text-[10px] text-greyText transition-colors duration-150 hover:bg-cardHover hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text"
              aria-label="Open to collaborate"
            >
              <span
                className="relative inline-flex size-1.5 rounded-full bg-highlight"
                aria-hidden
              >
                <span className="absolute inset-0 rounded-full bg-highlight animate-status-pulse" />
              </span>
              Open to collab
            </a>
          </div>
          <p>{profile.tagline}</p>
          <p>
            {syra.title} of{" "}
            <a
              href={syra.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:border-b hover:text-greyText hover:border-greyText"
            >
              {syra.org}
            </a>{" "}
            · {s3labs.title} of{" "}
            <a
              href={s3labs.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:border-b hover:text-greyText hover:border-greyText"
            >
              {s3labs.org}
            </a>
          </p>
        </aside>
      </section>

      <Contact />

      <div className="mt-12 animate-thesis-in">
        <Link
          href="/blog/scale-with-agents-not-headcount"
          className="block w-full font-mono text-greyText px-4 py-3 bg-backgroundCard text-xs rounded-lg transition-opacity ease-in duration-500 hover:bg-cardHover"
        >
          Thesis: {profile.thesis} →
        </Link>
        <p className="mt-3 flex items-center gap-2 font-mono text-[11px] text-greyText px-1">
          <span
            className="relative inline-flex size-1.5 rounded-full bg-highlight"
            aria-hidden
          >
            <span className="absolute inset-0 rounded-full bg-highlight animate-status-pulse" />
          </span>
          <span>
            workforce {status} · {agents} agents · {humans} human
          </span>
        </p>
      </div>
    </header>
  );
};

export default Header;
