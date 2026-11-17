'use client';

import { useEffect } from 'react';

type SiteVersionLoggerProps = {
  siteName: string;
  version: string;
};

const loggedVersions = new Set<string>();

export default function SiteVersionLogger({
  siteName,
  version,
}: SiteVersionLoggerProps) {
  useEffect(() => {
    const logIdentifier = `${siteName}|${version}`;

    if (loggedVersions.has(logIdentifier)) {
      return;
    }

    console.log(`${siteName} | versão ${version}`);
    loggedVersions.add(logIdentifier);
  }, [siteName, version]);

  return null;
}
