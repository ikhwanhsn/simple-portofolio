import Link from "next/link";
import type { BlogPost } from "@/data/blog";
import { getAllPosts } from "@/data/blog";
import { profile } from "@/data/profile";

const linkify = (text: string) => {
  const parts = text.split(/(Syra AI|Agentrail|S3Labs)/g);
  return parts.map((part, index) => {
    if (part === "Syra AI") {
      return (
        <a
          key={index}
          href={profile.products.syra.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:border-b hover:text-greyText hover:border-greyText"
        >
          Syra AI
        </a>
      );
    }
    if (part === "Agentrail") {
      return (
        <a
          key={index}
          href={profile.products.agentrail.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:border-b hover:text-greyText hover:border-greyText"
        >
          Agentrail
        </a>
      );
    }
    if (part === "S3Labs") {
      return (
        <a
          key={index}
          href={profile.products.s3labs.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:border-b hover:text-greyText hover:border-greyText"
        >
          S3Labs
        </a>
      );
    }
    return <span key={index}>{part}</span>;
  });
};

const readingMinutes = (post: BlogPost) => {
  const words = post.sections.reduce((total, section) => {
    const headingWords = section.heading?.split(/\s+/).length ?? 0;
    const bodyWords = section.paragraphs.join(" ").split(/\s+/).length;
    return total + headingWords + bodyWords;
  }, 0);
  return Math.max(1, Math.round(words / 200));
};

const BlogArticle = ({ post }: { post: BlogPost }) => {
  const posts = getAllPosts();
  const index = posts.findIndex((item) => item.slug === post.slug);
  const previous = index >= 0 ? posts[index + 1] : undefined;
  const next = index > 0 ? posts[index - 1] : undefined;

  return (
    <main className="mt-12 min-h-screen mb-4">
      <p className="font-mono text-xs text-greyText">
        <Link
          href="/blog"
          className="hover:border-b hover:border-greyText focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text"
        >
          Blog
        </Link>
        <span className="mx-1.5">/</span>
        {post.label ?? "Note"}
      </p>

      <h1 className="mt-4 font-medium text-2xl leading-snug tracking-tight">
        {post.title}
      </h1>
      <p className="mt-3 font-mono text-[11px] text-greyText">
        {post.displayDate} · {readingMinutes(post)} min read
      </p>
      <p className="mt-4 font-medium text-greyText leading-relaxed">
        {post.summary}
      </p>

      <hr className="mt-8 border-outline" />

      <article className="mt-8 font-medium">
        {post.sections.map((section, sectionIndex) => (
          <section key={sectionIndex}>
            {section.heading && (
              <h2
                className={`font-medium text-base tracking-tight ${
                  sectionIndex === 0 ? "mt-0" : "mt-10"
                }`}
              >
                {section.heading}
              </h2>
            )}
            {section.paragraphs.map((paragraph, paragraphIndex) => (
              <p
                key={paragraphIndex}
                className={`text-justify leading-relaxed ${
                  sectionIndex === 0 && paragraphIndex === 0 && !section.heading
                    ? "mt-0"
                    : section.heading && paragraphIndex === 0
                      ? "mt-3"
                      : "mt-4"
                }`}
              >
                {linkify(paragraph)}
              </p>
            ))}
          </section>
        ))}
      </article>

      <hr className="mt-12 border-outline" />

      <nav
        className="mt-6 grid gap-6 sm:grid-cols-2"
        aria-label="More notes"
      >
        <div>
          {previous ? (
            <Link
              href={`/blog/${previous.slug}`}
              className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text"
            >
              <p className="font-mono text-[11px] text-greyText">Previous</p>
              <p className="mt-1 font-medium leading-snug group-hover:text-greyText">
                ← {previous.title}
              </p>
            </Link>
          ) : (
            <p className="font-mono text-[11px] text-greyText">Previous</p>
          )}
        </div>
        <div className="sm:text-right">
          {next ? (
            <Link
              href={`/blog/${next.slug}`}
              className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text"
            >
              <p className="font-mono text-[11px] text-greyText">Next</p>
              <p className="mt-1 font-medium leading-snug group-hover:text-greyText">
                {next.title} →
              </p>
            </Link>
          ) : (
            <p className="font-mono text-[11px] text-greyText">Next</p>
          )}
        </div>
      </nav>

      <p className="mt-10 font-mono text-xs text-greyText">
        <Link
          href="/blog"
          className="hover:border-b hover:border-greyText focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text"
        >
          ← All notes
        </Link>
      </p>
    </main>
  );
};

export default BlogArticle;
