import type { MetadataRoute } from 'next';

import { getSiteUrl, siteConfig } from '@/config/site';

// Compatível com output: 'export' (Next.js 16) e build com servidor.
export const dynamic = 'force-static';

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
