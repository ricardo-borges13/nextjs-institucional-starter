import type { MetadataRoute } from 'next';

import { getSiteUrl, siteConfig } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
  if (!siteConfig.isIndexable) {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
      },
    };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: getSiteUrl('/sitemap.xml'),
  };
}
