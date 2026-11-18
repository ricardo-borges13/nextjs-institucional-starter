import type { MetadataRoute } from 'next';

import { getSiteUrl, siteConfig } from '@/config/site';

// Compatível com output: 'export' (Next.js 16) e build com servidor.
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const homeUrl = getSiteUrl('/');

  if (!siteConfig.isIndexable || !homeUrl) {
    return [];
  }

  return [
    {
      url: homeUrl,
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
