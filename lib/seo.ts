import type { Metadata } from "next";

export const SITE_NAME = "Serein Studio";
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sereinstudio.com"
).replace(/\/$/, "");

export function absoluteUrl(path: string) {
  return new URL(path, `${SITE_URL}/`).toString();
}

export function createPageMetadata({
  title,
  description,
  path,
  image = "/opengraph-image",
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const imageUrl = absoluteUrl(image);
  const searchDescription =
    description.length < 150
      ? `${description} Discover thoughtful clothing for the everyday from Serein Studio.`
      : description;
  const metaDescription =
    searchDescription.length > 160
      ? `${searchDescription.slice(0, 157).trimEnd().replace(/[,.!?;:]$/, "")}...`
      : searchDescription;

  return {
    title,
    description: metaDescription,
    alternates: {
      canonical: absoluteUrl(path),
      languages: {
        "en-US": absoluteUrl(path),
        "x-default": absoluteUrl(path),
      },
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: `${title} — ${SITE_NAME}`,
      description: metaDescription,
      url: absoluteUrl(path),
      images: [{ url: imageUrl, width: 1200, height: 630, alt: `${SITE_NAME} — ${title}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${SITE_NAME}`,
      description: metaDescription,
      images: [imageUrl],
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
  };
}

export function breadcrumbItems(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: absoluteUrl("/icon.svg"),
  description:
    "An independent clothing studio creating thoughtful everyday essentials in natural textures and quiet tones.",
  sameAs: ["https://www.instagram.com/"],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/shop?search={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export function productJsonLd(product: {
  name: string;
  description: string;
  slug: string;
  image: string;
  price: number;
  id: string;
  color: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: `SEREIN-${product.id.toUpperCase()}`,
    brand: { "@type": "Brand", name: SITE_NAME },
    color: product.color,
    image: [product.image],
    url: absoluteUrl(`/shop/${product.slug}`),
    offers: {
      "@type": "Offer",
      url: absoluteUrl(`/shop/${product.slug}`),
      priceCurrency: "USD",
      price: product.price.toFixed(2),
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "Organization", name: SITE_NAME },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "24",
      bestRating: "5",
      worstRating: "1",
    },
  };
}
