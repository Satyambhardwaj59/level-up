import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/cart/'],
    },
    sitemap: 'http://localhost:3000/day-45/sitemap.xml',
  };
}