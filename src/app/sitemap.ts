import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/profile";
import { getAllPosts } from "@/data/blog";
import { now } from "@/data/now";

const SITE_UPDATED = new Date("2026-08-09");

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latestPostDate = posts.reduce((latest, post) => {
    const d = new Date(post.date);
    return d > latest ? d : latest;
  }, new Date(0));

  const blogUrls = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: SITE_UPDATED,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: latestPostDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/now`,
      lastModified: new Date(now.updated),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    ...blogUrls,
    {
      url: `${SITE_URL}/llms.txt`,
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/llms-full.txt`,
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/profile.json`,
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}
