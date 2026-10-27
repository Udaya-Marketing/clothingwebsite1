# Serein Studio

A responsive editorial fashion storefront built with Next.js App Router, React, TypeScript, Tailwind CSS v4, Framer Motion, Lenis, Embla Carousel, and Zustand. Product, collection, and journal content currently comes from typed local data in `data/`, ready to replace with a commerce API or CMS.

## Run locally

Requirements: Node.js 20.9 or newer and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). For a production check, run `npm run lint`, `npm run build`, then `npm run start`.

## Environment

Copy `.env.example` to `.env.local` for local work. No environment variable is required to browse the storefront.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production | Public origin used for canonical links, social metadata, structured data, robots, and the sitemap. Set to the deployed HTTPS origin. |
| `MAILCHIMP_API_KEY` | Newsletter integration | Server-only Mailchimp API key. Never expose this as a `NEXT_PUBLIC_` variable. |
| `MAILCHIMP_AUDIENCE_ID` | Newsletter integration | Audience/list identifier. |
| `MAILCHIMP_SERVER_PREFIX` | Newsletter integration | Mailchimp data-center prefix, such as `us21`. |

Newsletter submissions validate the email and consent on the server. Without Mailchimp credentials, the form clearly reports that the integration is not connected. The preview does not accept orders or payment details.

## Content and photography

- Products and image URLs: `data/products.ts`
- Collections: `data/collections.ts`
- Journal posts: `data/posts.ts`
- Homepage editorial image URLs: `app/page.tsx`

The current images are Unsplash development placeholders served through `next/image`. Before launch, replace them with commissioned, brand-owned photography and descriptive alt text. Keep portrait source imagery near a 3:4 crop and optimize uploaded assets to AVIF or WebP. The allowed remote image host is configured in `next.config.ts`; add a narrowly scoped `remotePatterns` entry if using a managed image CDN.

## Fonts and design

The site loads Instrument Serif for display and Hanken Grotesk for body/UI through `next/font/google`. To use a licensed local font, add the licensed font files under `app/fonts/` and use `next/font/local` in `app/layout.tsx`. PP Editorial New, Canela, or Tiempos Headline are suitable drop-in licensed display upgrades. Update the CSS font variables in `app/globals.css` when changing the family.

Design tokens, responsive rules, and component styles live in `app/globals.css`. Shared layout components live in `components/layout/`; reusable interface pieces live in `components/ui/`.

## Commerce and CMS integration

The current typed mock-data boundary is `data/products.ts` and `data/collections.ts`. For Shopify Storefront API:

1. Add server-only Storefront API credentials to environment variables.
2. Replace data lookups with typed server-side query functions in `lib/`.
3. Keep the existing product and collection shapes as view models, mapping the API response at the data boundary.
4. Replace the in-memory Zustand cart with a server-backed cart ID and Shopify cart mutations; do not treat the current client cart as an order.
5. Connect checkout to Shopify's hosted checkout and configure webhook/order handling.
6. Replace sample product reviews and their structured-data values with verified review-provider data before enabling review markup.

For a headless CMS, use the same boundary pattern: map CMS responses to the `Product`, `Collection`, and `JournalPost` TypeScript types, then keep route components independent of the provider. Add the provider's preview and revalidation webhook only when the CMS is connected.

The newsletter Server Action is in `app/actions.ts`. Replace or complete its Mailchimp integration before production; do not place API credentials in browser code.

## SEO and launch configuration

`NEXT_PUBLIC_SITE_URL` must match the canonical production origin. Dynamic product, collection, and journal routes use `generateStaticParams`, `generateMetadata`, and hourly ISR. `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`, structured data helpers, and `opengraph-image.tsx` files provide the SEO baseline.

The hreflang map currently advertises only `en-US` and `x-default` as scaffolding. Add each real localized route and language code before publishing translated content. Privacy and terms copy is starter copy and should be reviewed for the operating jurisdiction. Search and Open Graph previews should be checked against the real production domain and photography.

Product aggregate-rating JSON-LD and testimonial content are sample preview data. Replace them with verified review data or remove the rating markup before launch; never publish fabricated ratings or reviews.

## Deploy to Vercel

1. Import the project into Vercel and select the Next.js framework preset.
2. Add `NEXT_PUBLIC_SITE_URL` and, after integration, the Mailchimp environment variables for Preview and Production.
3. Deploy a preview and test mobile layouts, product image loading, newsletter consent, generated social cards, and all navigation.
4. Add the production domain, set `NEXT_PUBLIC_SITE_URL` to its HTTPS URL, and redeploy.
5. Connect the commerce provider before accepting orders. Configure provider credentials, checkout, tax/shipping rules, and order notifications.
6. Submit `/sitemap.xml` in Google Search Console and Bing Webmaster Tools after launch.

## Scripts

- `npm run dev` — local development server
- `npm run lint` — ESLint
- `npm run build` — optimized production build
- `npm run start` — serve the production build
