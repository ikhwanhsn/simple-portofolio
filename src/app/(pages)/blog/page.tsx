import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, type BlogPost } from "@/data/blog";
import { SITE_URL } from "@/data/profile";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on agents, building, and running a company without a traditional org chart.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: "Blog",
    description:
      "Notes on agents, building, and running a company without a traditional org chart.",
    url: `${SITE_URL}/blog`,
  },
};

const readingMinutes = (post: BlogPost) => {
  const words = post.sections.reduce((total, section) => {
    const headingWords = section.heading?.split(/\s+/).length ?? 0;
    const bodyWords = section.paragraphs.join(" ").split(/\s+/).length;
    return total + headingWords + bodyWords;
  }, 0);
  return Math.max(1, Math.round(words / 200));
};

const BlogPage = () => {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <main className="mt-12 min-h-screen mb-4">
      <p className="font-mono text-xs text-greyText">Blog</p>
      <h1 className="mt-3 font-medium text-2xl leading-snug tracking-tight">
        Notes from the build
      </h1>
      <p className="mt-3 font-medium text-greyText leading-relaxed">
        Agents, machine money, Solana, and running a company without a
        traditional org chart.
      </p>

      {featured && (
        <Link
          href={`/blog/${featured.slug}`}
          className="mt-10 block group rounded-lg bg-backgroundCard px-4 py-5 transition-colors duration-200 hover:bg-cardHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text"
        >
          <div className="flex items-center justify-between gap-3 font-mono text-[11px] text-greyText">
            <span className="inline-flex items-center gap-2">
              <span
                className="size-1.5 rounded-full bg-highlight"
                aria-hidden
              />
              {featured.label ?? "Latest"}
            </span>
            <span>
              {featured.displayDate} · {readingMinutes(featured)} min
            </span>
          </div>
          <h2 className="mt-3 font-medium text-lg leading-snug tracking-tight group-hover:text-greyText">
            {featured.title}
          </h2>
          <p className="mt-2 font-medium text-greyText leading-relaxed">
            {featured.summary}
          </p>
          <p className="mt-4 font-mono text-xs text-greyText">
            Read note
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
              {" "}
              →
            </span>
          </p>
        </Link>
      )}

      {rest.length > 0 && (
        <section className="mt-12">
          <div className="flex items-baseline justify-between gap-3 border-b border-outline pb-3">
            <p className="font-mono text-xs text-greyText">All notes</p>
            <p className="font-mono text-[11px] text-greyText">
              {posts.length} posts
            </p>
          </div>

          <ul className="mt-2">
            {rest.map((post, index) => {
              const number = String(index + 2).padStart(2, "0");

              return (
                <li key={post.slug} className="border-b border-outline">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col gap-2 py-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text"
                  >
                    <div className="flex items-center justify-between gap-3 font-mono text-[11px] text-greyText">
                      <span className="inline-flex items-center gap-2">
                        <span aria-hidden>{number}</span>
                        {post.label ? (
                          <>
                            <span aria-hidden>·</span>
                            <span>{post.label}</span>
                          </>
                        ) : null}
                      </span>
                      <span className="shrink-0">
                        {post.displayDate} · {readingMinutes(post)} min
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between gap-3">
                      <h2 className="font-medium leading-snug group-hover:text-greyText group-hover:underline group-hover:underline-offset-4 group-hover:decoration-outline">
                        {post.title}
                      </h2>
                      <span
                        className="shrink-0 font-mono text-xs text-greyText opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                        aria-hidden
                      >
                        ↗
                      </span>
                    </div>
                    <p className="font-medium text-greyText leading-relaxed">
                      {post.summary}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}

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

export default BlogPage;
