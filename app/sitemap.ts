import type { MetadataRoute } from "next";
import { SITE_UPDATED_AT, SITE_URL, absoluteUrl } from "./seo";

const lastModified = new Date(`${SITE_UPDATED_AT}T00:00:00.000Z`);

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      images: [absoluteUrl("/Alviro-Tech-Logo-Black.png")],
    },
    {
      url: absoluteUrl("/privacy"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
