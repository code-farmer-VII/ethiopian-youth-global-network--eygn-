import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SITE_URL } from '../lib/siteConfig';

interface SEOProps {
  title: string;
  description: string;
  path: string;
  /** JSON-LD structured data object(s) to embed, e.g. an Organization or Article schema. */
  structuredData?: object | object[];
}

const SITE_NAME = 'Ethiopian Youth Global Network (EYGN)';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export const SEO: React.FC<SEOProps> = ({ title, description, path, structuredData }) => {
  const url = `${SITE_URL}${path}`;
  const fullTitle = path === '/' ? title : `${title} | ${SITE_NAME}`;
  const schemas = structuredData ? (Array.isArray(structuredData) ? structuredData : [structuredData]) : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={DEFAULT_OG_IMAGE} />
      <meta property="og:site_name" content={SITE_NAME} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />

      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};
