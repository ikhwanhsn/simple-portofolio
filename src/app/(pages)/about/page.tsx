import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Contact from "@/components/Contact";
import { SITE_URL, profile } from "@/data/profile";
import profileImage from "../../../../public/img/profile.jpg";

export const metadata: Metadata = {
  title: "About",
  description: `${profile.tagline}. Founder of Syra AI and Agentrail. CTO of S3Labs. ${profile.thesis}.`,
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: "About",
    description: `${profile.tagline}. Founder of Syra AI and Agentrail. CTO of S3Labs. ${profile.thesis}.`,
    url: `${SITE_URL}/about`,
  },
};

const experienceNotes: Record<string, string> = {
  Wecash: "sharpened how I ship money products under real user pressure",
  Tabriiz: "taught me Web3 fundraising UX and hackathon-speed execution",
  "Nova Capital": "pushed me deeper into capital, markets, and operator judgment",
  "Dry Code": "was where I learned to ship software as a craft, not a demo",
};

const AboutPage = () => {
  return (
    <main className="mt-12 min-h-screen mb-4">
      <p className="font-mono text-xs text-greyText">About me</p>
      <h1 className="mt-3 font-medium text-2xl leading-snug tracking-tight">
        I am {profile.name}.
      </h1>
      <p className="mt-3 font-medium text-greyText leading-relaxed">
        A builder from {profile.location}. One human. A company of agents. I
        direct the work. They research, ship, earn, and execute.
      </p>

      <blockquote className="mt-10 border-l-2 border-text pl-4">
        <p className="font-medium text-base leading-relaxed">
          “{profile.thesis}.”
        </p>
        <p className="mt-2 text-greyText font-medium text-sm">
          That line is personal. It is how I choose to live and build.
        </p>
        <Link
          href="/blog/scale-with-agents-not-headcount"
          className="mt-3 inline-block font-mono text-xs text-greyText hover:border-b hover:border-greyText"
        >
          Read the full thesis →
        </Link>
      </blockquote>

      <section className="mt-14">
        <p className="font-mono text-xs text-greyText">01 / Who I am</p>
        <div className="mt-4 space-y-4 font-medium text-justify">
          <p>
            I care about money, autonomy, and software that keeps working when I
            am offline. I came up through fintech and DeFi interfaces, shipping
            products where clarity and settlement actually mattered. That path
            led me here: building a company where agents are the workforce, not
            a side experiment.
          </p>
          <p>
            I do not want a big office to prove progress. I want systems that
            compound. My job is judgment, taste, strategy, and direction. My
            agents handle the loops I should never do by hand again.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <p className="font-mono text-xs text-greyText">02 / Vision</p>
        <div className="mt-4 space-y-4 font-medium text-justify">
          <p>
            I want a world where one person can run a multi-billion-dollar
            company with agents as operators. Not as demos. As real workforce:
            earning, allocating treasury, investing, spending, and growing
            capital onchain.
          </p>
          <p>
            The vision is economic autonomy for machines, directed by humans who
            stay small on purpose. Less headcount theater. More leverage. More
            ownership of the outcome.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <p className="font-mono text-xs text-greyText">03 / Mission</p>
        <div className="mt-4 space-y-4 font-medium text-justify">
          <p>
            My mission is to build the rails and the ecosystem that make that
            model real. Through {profile.products.syra.name}, I am building
            machine money for agents on Solana. Through{" "}
            {profile.products.agentrail.name}, I ship agent-native products for
            clients. Through {profile.products.s3labs.name}, I am building the
            AI-powered Web3 ecosystem where products, opportunities, and
            communities help builders move faster.
          </p>
          <p>
            Every week I ask the same question: what can an agent own end to
            end, and what still needs me? If the answer keeps shifting toward
            agents, we are winning.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <p className="font-mono text-xs text-greyText">04 / My agents</p>
        <p className="mt-4 font-medium text-justify text-greyText">
          These are not side projects. They are how I run the company.
        </p>
        <div className="mt-6 space-y-6">
          {profile.roles.map((role) => (
            <article
              key={role.org}
              className="rounded-2xl bg-backgroundCard px-5 py-5"
            >
              <p className="font-mono text-xs text-greyText">
                Agent · {role.title} seat
              </p>
              <h2 className="mt-2 font-medium text-lg">
                <a
                  href={role.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:border-b hover:border-greyText"
                >
                  {role.org}
                </a>
              </h2>
              <p className="mt-3 font-medium text-justify leading-relaxed">
                {role.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <p className="font-mono text-xs text-greyText">05 / How we work</p>
        <div className="mt-4 space-y-4 font-medium text-justify">
          <p>
            I set the destination. Agents run the routes. I review what matters,
            cut what does not, and keep risk boundaries tight. Research,
            monitoring, drafts, integrations, and repeatable execution belong to
            them. Strategy, partnerships, product taste, and final calls belong
            to me.
          </p>
          <p>
            That split is personal. It protects my focus and my life outside the
            screen. I am not trying to become a manager of people. I am trying
            to become a precise operator of systems.
          </p>
        </div>
        <ul className="mt-6 space-y-3 font-medium">
          <li className="flex gap-3">
            <span className="font-mono text-xs text-greyText mt-1 shrink-0">
              Me
            </span>
            <span>Direction, judgment, narrative, partnerships, risk</span>
          </li>
          <li className="flex gap-3">
            <span className="font-mono text-xs text-greyText mt-1 shrink-0">
              Agents
            </span>
            <span>Research, shipping loops, earning flows, execution</span>
          </li>
          <li className="flex gap-3">
            <span className="font-mono text-xs text-greyText mt-1 shrink-0">
              Goal
            </span>
            <span>Multi-billion-dollar scale without headcount dependency</span>
          </li>
        </ul>
      </section>

      <section className="mt-14">
        <p className="font-mono text-xs text-greyText">06 / How I got here</p>
        <ol className="mt-6 relative border-l border-outline ml-2">
          <li className="mb-8 pl-6 relative">
            <span className="absolute -left-[5px] top-1.5 size-2.5 rounded-full bg-text" />
            <p className="font-mono text-xs text-greyText">Now</p>
            <p className="mt-1 font-medium">
              Running the company through {profile.products.syra.name},{" "}
              {profile.products.agentrail.name}, and{" "}
              {profile.products.s3labs.name}
            </p>
          </li>
          {profile.experience.map((item) => (
            <li key={item.name} className="mb-8 last:mb-0 pl-6 relative">
              <span className="absolute -left-[5px] top-1.5 size-2.5 rounded-full bg-outline" />
              <p className="font-mono text-xs text-greyText">{item.year}</p>
              <p className="mt-1 font-medium">
                {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:border-b hover:border-greyText"
                  >
                    {item.name}
                  </a>
                ) : (
                  item.name
                )}
                <span className="text-greyText">
                  {" "}
                  {experienceNotes[item.name] ??
                    "shaped how I think about product and leverage"}
                </span>
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-16 rounded-2xl bg-backgroundCard px-5 py-6">
        <div className="flex items-center gap-4">
          <Image
            src={profileImage}
            alt={profile.name}
            width={52}
            height={52}
            className="rounded-full shrink-0"
          />
          <div className="font-medium min-w-0">
            <p>If this resonates, talk to me.</p>
            <p className="text-greyText text-sm mt-1">
              I am always open to builders, partners, and people thinking about
              agent-native companies.
            </p>
          </div>
        </div>
        <div className="mt-1">
          <Contact />
        </div>
      </section>

      <p className="mt-12 font-mono text-xs text-greyText">
        <Link href="/" className="hover:border-b hover:border-greyText">
          ← Work
        </Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:border-b hover:border-greyText">
          Blog
        </Link>
      </p>
    </main>
  );
};

export default AboutPage;
