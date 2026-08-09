import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogArticle from "@/components/BlogArticle";
import { getAllPosts, getPost } from "@/data/blog";
import { SITE_URL } from "@/data/profile";

type PageProps = {
  params: { slug: string };
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getPost(params.slug);
  if (!post) {
    return { title: "Blog" };
  }

  const url = `${SITE_URL}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      url,
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
    },
  };
}

const BlogPostPage = ({ params }: PageProps) => {
  const post = getPost(params.slug);
  if (!post) notFound();
  return <BlogArticle post={post} />;
};

export default BlogPostPage;
