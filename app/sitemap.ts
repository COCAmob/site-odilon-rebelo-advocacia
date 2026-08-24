import type { MetadataRoute } from "next";
import { articleCategories, articleHref, articles, brand, serviceHref, services } from "./site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const institutionalPaths = [
    "/",
    "/advogado-odilon-rebelo/",
    "/advogado-em-itajai/",
    "/atuacao/",
    "/blog/",
    "/contato/",
    "/simulador-distrato-imobiliario/",
    "/baixar-check-list/",
    "/politica-de-privacidade/",
    "/mapa-do-site/",
  ];

  return [
    ...institutionalPaths.map((path) => ({
      url: `${brand.website}${path}`,
      changeFrequency: path === "/blog/" ? "weekly" as const : "monthly" as const,
      priority: path === "/" ? 1 : path === "/atuacao/" || path === "/contato/" ? 0.9 : 0.7,
    })),
    ...services.map((service) => ({
      url: `${brand.website}${serviceHref(service)}`,
      changeFrequency: "monthly" as const,
      priority: service.featured ? 0.9 : 0.8,
    })),
    ...articleCategories.map((category) => ({
      url: `${brand.website}/blog/${category.slug}/`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...articles.map((article) => ({
      url: `${brand.website}${articleHref(article)}`,
      lastModified: new Date(article.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
