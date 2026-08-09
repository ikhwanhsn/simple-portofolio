import Link from "next/link";
import BrandMark from "@/components/BrandMark";

export default function NotFound() {
  return (
    <main className="mt-16 mb-20">
      <div className="flex items-center gap-2 text-greyText">
        <BrandMark className="size-5" />
        <p className="font-mono text-xs">404 · route missing</p>
      </div>

      <h1 className="mt-4 font-medium text-2xl tracking-tight">
        Agent couldn&apos;t find that route.
      </h1>
      <p className="mt-3 font-medium text-greyText leading-relaxed">
        The path you asked for isn&apos;t in the map. Headcount is still one.
        Try a known surface instead.
      </p>

      <nav className="mt-8 flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs text-greyText">
        <Link
          href="/"
          className="hover:border-b hover:border-greyText focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text"
        >
          Work
        </Link>
        <Link
          href="/about"
          className="hover:border-b hover:border-greyText focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text"
        >
          About
        </Link>
        <Link
          href="/blog"
          className="hover:border-b hover:border-greyText focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text"
        >
          Blog
        </Link>
        <Link
          href="/now"
          className="hover:border-b hover:border-greyText focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text"
        >
          Now
        </Link>
      </nav>
    </main>
  );
}
