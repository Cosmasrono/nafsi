import type { MetadataRoute } from "next";
import { involvementTypes, nav, programmes, site, stories } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = new Set<string>(["/", "/donate", "/privacy", "/safeguarding", "/terms"]);
  for (const item of nav) {
    paths.add(item.href);
    item.children?.forEach((child) => paths.add(child.href));
  }
  programmes.forEach((p) => paths.add(`/programmes/${p.slug}`));
  stories.forEach((s) => paths.add(`/stories/${s.slug}`));
  Object.keys(involvementTypes).forEach((type) => paths.add(`/get-involved/${type}`));

  return [...paths].map((path) => ({ url: `${site.url}${path === "/" ? "" : path}`, lastModified: new Date() }));
}
