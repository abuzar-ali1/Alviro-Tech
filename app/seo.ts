export const SITE_URL = "https://alvirotech.com";
export const SITE_NAME = "Alviro Tech";
export const SITE_ALTERNATE_NAME = "AlviroTech";
export const SITE_TITLE = "Alviro Tech | Digital Growth, AI & Web Agency";
export const SITE_DESCRIPTION =
  "Alviro Tech is a digital growth and AI agency delivering websites, SEO, automation, paid media and brand systems for ambitious businesses worldwide.";
export const SITE_TAGLINE = "Connected digital growth systems built to scale.";
export const SITE_UPDATED_AT = "2026-09-01";
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const WEBPAGE_ID = `${SITE_URL}/#webpage`;

export const SOCIAL_IMAGE_SIZE = {
  width: 1200,
  height: 630,
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}
