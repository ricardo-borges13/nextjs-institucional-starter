import type { MetadataRoute } from 'next';

import { getSiteUrl, siteConfig } from '@/config/site';

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
