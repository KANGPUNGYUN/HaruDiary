import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: ["Yeti", "Googlebot"],
      allow: "/",
      disallow: ["/user/", "/*.webp"],
    },
    sitemap: "https://harudiary.vercel.app/sitemap.xml",
  };
}
