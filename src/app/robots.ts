import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/user/",
    },
    sitemap: "https://harudiary.vercel.app/sitemap.xml",
  };
}
