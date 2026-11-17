import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api/', '/acesso', '/perfil', '/encomendas'],
    },
    sitemap: 'https://3gwine.pt/sitemap.xml',
  };
}
