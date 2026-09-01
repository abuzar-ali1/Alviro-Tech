import type { Metadata } from "next";
import AlviroSite from "./components/AlviroSite";
import { CONTACT, SERVICES } from "./data";
import {
  ORGANIZATION_ID,
  SITE_ALTERNATE_NAME,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_TITLE,
  SITE_UPDATED_AT,
  SITE_URL,
  WEBPAGE_ID,
  WEBSITE_ID,
  absoluteUrl,
} from "./seo";

export const metadata: Metadata = {
  title: { absolute: SITE_TITLE },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

const organizationLogo = {
  "@type": "ImageObject",
  url: absoluteUrl("/Alviro-Tech-Logo-Black.png"),
  width: 937,
  height: 823,
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: SITE_URL,
      name: SITE_NAME,
      alternateName: SITE_ALTERNATE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "en",
      publisher: { "@id": ORGANIZATION_ID },
    },
    {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: SITE_NAME,
      alternateName: SITE_ALTERNATE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      slogan: SITE_TAGLINE,
      logo: organizationLogo,
      image: organizationLogo,
      email: CONTACT.email,
      telephone: CONTACT.phone,
      sameAs: [CONTACT.facebook, CONTACT.instagram, CONTACT.linkedin],
      areaServed: "Worldwide",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: CONTACT.email,
        telephone: CONTACT.phone,
        areaServed: "Worldwide",
        availableLanguage: ["English"],
      },
      knowsAbout: SERVICES.map((service) => service.title),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Digital growth services",
        itemListElement: SERVICES.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            description: service.description,
            provider: { "@id": ORGANIZATION_ID },
            areaServed: "Worldwide",
          },
        })),
      },
    },
    {
      "@type": "WebPage",
      "@id": WEBPAGE_ID,
      url: SITE_URL,
      name: SITE_TITLE,
      description: SITE_DESCRIPTION,
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": ORGANIZATION_ID },
      mainEntity: { "@id": ORGANIZATION_ID },
      primaryImageOfPage: organizationLogo,
      inLanguage: "en",
      dateModified: SITE_UPDATED_AT,
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <AlviroSite />
    </>
  );
}
