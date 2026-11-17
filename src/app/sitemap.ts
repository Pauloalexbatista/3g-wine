import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://3gwine.pt';
  const now = new Date();

  const routes = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/loja', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/vinho-virtual', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/sobre', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/contactos', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/envios-e-devolucoes', priority: 0.4, changeFrequency: 'yearly' as const },
    { path: '/termos', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/privacidade', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/ral', priority: 0.3, changeFrequency: 'yearly' as const },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
