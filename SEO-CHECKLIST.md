# SEO launch checklist

## Implemented

- Next.js Metadata API with page titles, 150–160 character descriptions, canonical URLs, Open Graph and Twitter cards.
- English hreflang scaffolding (`en-US` and `x-default`) on metadata.
- Generated Open Graph images for the home page and dynamic product, collection, and journal pages.
- Organization and WebSite/SearchAction JSON-LD on the home page.
- BreadcrumbList on inner routes; Product/Offer, ItemList, Article, and FAQPage structured data on relevant pages.
- Dynamic `app/sitemap.ts` for public pages, products, collections, and journal posts.
- `app/robots.ts` blocks cart/account and query-parameter URLs.
- Cart/account set to `noindex`; filtered shop URLs inherit the unfiltered `/shop` canonical.
- Semantic page landmarks, skip link, descriptive image alt text, responsive image sizing, and generated icon/manifest assets.
- Product, collection, and journal detail routes use static params and hourly revalidation.

## Before launch

- [ ] Set `NEXT_PUBLIC_SITE_URL` to the canonical production HTTPS origin.
- [ ] Replace every Unsplash placeholder with licensed, brand-owned optimized imagery and confirm alt text.
- [ ] Replace the sample testimonials and mock aggregate rating/review count with verified review data, or remove rating markup.
- [ ] Review product availability, pricing, copy, shipping/returns, privacy, and terms for accuracy and local legal requirements.
- [ ] Connect Shopify or another commerce provider, complete checkout, and test order/payment/shipping flows.
- [ ] Connect Mailchimp (or a chosen consent-aware provider) and test server-side validation, confirmation, unsubscribe, and privacy handling.
- [ ] Add real language routes and hreflang codes if the site is translated.
- [ ] Verify canonical tags, metadata previews, JSON-LD with Rich Results Test, and mobile performance on the deployed domain.
- [ ] Add the production property to Google Search Console and Bing Webmaster Tools; submit `https://YOUR_DOMAIN/sitemap.xml`.
- [ ] Configure privacy-respecting analytics and consent requirements before enabling tracking.
- [ ] Monitor Search Console indexing, Core Web Vitals, and broken links after launch.
