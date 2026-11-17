import type { Metadata } from 'next';

const validSiteEnvironments = ['development', 'staging', 'production'] as const;

export type SiteEnvironment = (typeof validSiteEnvironments)[number];

type PageMetadataInput = {
  title: string;
  description?: string;
  path?: string;
};

const getSiteEnvironment = (): SiteEnvironment => {
  const value = process.env.SITE_ENV;

  if (validSiteEnvironments.includes(value as SiteEnvironment)) {
    return value as SiteEnvironment;
  }

  return 'staging';
};

const getCanonicalUrl = (): URL | undefined => {
  const value = process.env.SITE_URL?.trim();

  if (!value) {
    return undefined;
  }

  try {
    const url = new URL(value);
    const isIpAddress = /^\d{1,3}(\.\d{1,3}){3}$/.test(url.hostname);

    if (
      url.protocol !== 'https:' ||
      url.username ||
      url.password ||
      url.port ||
      url.search ||
      url.hash ||
      url.hostname === 'localhost' ||
      url.hostname.endsWith('.local') ||
      isIpAddress ||
      url.pathname !== '/'
    ) {
      return undefined;
    }

    return url;
  } catch {
    return undefined;
  }
};

const environment = getSiteEnvironment();
const canonicalUrl = getCanonicalUrl();
const isIndexable =
  environment === 'production' &&
  process.env.SITE_INDEXABLE === 'true' &&
  canonicalUrl !== undefined;

export const siteConfig = {
  name: process.env.SITE_NAME?.trim() || 'Next.js Institucional Starter',
  description:
    process.env.SITE_DESCRIPTION?.trim() ||
    'Template reutilizável para desenvolvimento de sites institucionais com Next.js, TypeScript e SCSS Modules.',
  locale: process.env.SITE_LOCALE?.trim() || 'pt-BR',
  environment,
  canonicalUrl,
  isIndexable,
} as const;

export const siteRobots = {
  index: siteConfig.isIndexable,
  follow: siteConfig.isIndexable,
  googleBot: {
    index: siteConfig.isIndexable,
    follow: siteConfig.isIndexable,
  },
} satisfies NonNullable<Metadata['robots']>;

export const getSiteUrl = (path = '/') => {
  if (!siteConfig.canonicalUrl) {
    return undefined;
  }

  return new URL(path, siteConfig.canonicalUrl).toString();
};

export const withSiteIndexing = (metadata: Metadata): Metadata => ({
  ...metadata,
  robots: siteRobots,
});

export const siteMetadata: Metadata = withSiteIndexing({
  metadataBase: siteConfig.isIndexable ? siteConfig.canonicalUrl : undefined,
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates:
    siteConfig.isIndexable && siteConfig.canonicalUrl
      ? { canonical: '/' }
      : undefined,
  openGraph:
    siteConfig.isIndexable && siteConfig.canonicalUrl
      ? {
          type: 'website',
          title: siteConfig.name,
          description: siteConfig.description,
          url: siteConfig.canonicalUrl,
          siteName: siteConfig.name,
        }
      : undefined,
  twitter: siteConfig.isIndexable
    ? {
        card: 'summary',
        title: siteConfig.name,
        description: siteConfig.description,
      }
    : undefined,
});

export const createPageMetadata = ({
  title,
  description,
  path,
}: PageMetadataInput): Metadata =>
  withSiteIndexing({
    title,
    description: description ?? siteConfig.description,
    alternates:
      siteConfig.isIndexable && path ? { canonical: path } : undefined,
  });
