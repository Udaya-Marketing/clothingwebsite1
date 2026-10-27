import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { products, formatPrice } from "@/data/products";
import { StructuredData } from "@/components/ui/structured-data";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";

const ProductCarousel = dynamic(() =>
  import("@/components/ui/product-carousel").then((module) => module.ProductCarousel),
);
const EditorialFilm = dynamic(() =>
  import("@/components/ui/editorial-film").then((module) => module.EditorialFilm),
);
const TestimonialSlider = dynamic(() =>
  import("@/components/ui/testimonial-slider").then((module) => module.TestimonialSlider),
);
const Reveal = dynamic(() =>
  import("@/components/ui/reveal").then((module) => module.Reveal),
);

export const metadata = {
  title: "Serein Studio — Considered clothing for everyday",
  description:
    "Discover Serein Studio, an independent clothing label creating thoughtful everyday essentials in natural textures, considered shapes, and quiet, enduring tones.",
};

const photo = (id: string, width = 1100) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

const trustItems = [
  { title: "Free shipping", description: "On orders over $150", icon: "shipping" },
  { title: "Secure payment", description: "A considered checkout, always", icon: "secure" },
  { title: "15 days returns", description: "A little more time to find your fit", icon: "returns" },
  { title: "Online support", description: "A real person, when you need us", icon: "support" },
] as const;

const icons = {
  shipping: <><path d="M2.5 5.5h11v9h-11zM13.5 8h3l3 3v3.5h-6z" /><circle cx="6.5" cy="16" r="1.5" /><circle cx="16.5" cy="16" r="1.5" /></>,
  secure: <><rect height="13" rx="1.5" width="12" x="4" y="9" /><path d="M7 9V6a3 3 0 0 1 6 0v3M10 13v3" /></>,
  returns: <><path d="M4 8h11a4 4 0 0 1 0 8H8" /><path d="m7 5-3 3 3 3" /></>,
  support: <><path d="M4 11a6 6 0 0 1 12 0v5H4z" /><path d="M4 12H2.5v3H4m12-3h1.5v3H16m-6 2h2" /></>,
};

function TrustIcon({ name }: { name: keyof typeof icons }) {
  return (
    <svg aria-hidden="true" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1" viewBox="0 0 20 20" width="24">
      {icons[name]}
    </svg>
  );
}

export default function HomePage() {
  const featuredProducts = [products[0], products[3], products[2], products[6], products[4]];

  return (
    <main id="main-content">
      <StructuredData data={[organizationJsonLd, websiteJsonLd]} />
      <section aria-labelledby="hero-title" className="hero-section">
        <div className="hero-image-grid" aria-hidden="true">
          {[
            ["photo-1539109136881-3be0616acf4b", "Quiet tailoring in a sunlit studio"],
            ["photo-1529139574466-a303027c1d8b", "A considered silhouette against warm stone"],
            ["photo-1534528741775-53994a69daeb", "Soft natural light across a portrait"],
          ].map(([src, alt], index) => (
            <div className={`hero-image hero-image--${index + 1}`} key={src}>
              <Image
                alt={alt}
                fill
                priority={index === 0}
                sizes="(max-width: 700px) 100vw, 34vw"
                src={photo(src, 1500)}
              />
            </div>
          ))}
        </div>
        <div className="hero-scrim" />
        <div className="hero-side-links hero-side-links--left">
          <Link href="/collections/womenswear">Women collection <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="hero-center">
          <p className="eyebrow">A considered wardrobe · Serein Studio</p>
          <h1 className="display-heading" id="hero-title">A softer<br />way to dress.</h1>
          <Link className="hero-discover" href="/shop">
            Discover the collection <span aria-hidden="true">↓</span>
          </Link>
        </div>
        <div className="hero-side-links hero-side-links--right">
          <Link href="/collections/menswear">Men collection <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="hero-bottom">
          <span>Small-batch essentials for the everyday</span>
          <Link href="/shop">Black Friday — 50% off <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <section aria-label="Studio note" className="marquee marquee--light">
        <div className="marquee-track">
          {Array.from({ length: 4 }, (_, index) => (
            <span aria-hidden={index > 0} className="marquee-item" key={index}>
              Big discounts on fashion! <i aria-hidden="true">✳</i> Thoughtful pieces, made to be lived in <i aria-hidden="true">✳</i>
            </span>
          ))}
        </div>
      </section>

      <section aria-labelledby="category-title" className="category-section section-pad">
        <span aria-hidden="true" className="ghost-word">modern aesthetics</span>
        <div className="category-list">
          <p className="eyebrow">The Serein edit</p>
          {[
            ["01", "New arrivals", "/shop?sort=newest"],
            ["02", "Men's wear", "/collections/menswear"],
            ["03", "Women's wear", "/collections/womenswear"],
            ["04", "Everyday objects", "/collections/accessories"],
          ].map(([number, label, href]) => (
            <Link href={href} key={number}>
              <span>{number}</span>{label}<b aria-hidden="true">↗</b>
            </Link>
          ))}
        </div>
        <Reveal className="category-portrait-wrap">
          <div className="category-portrait">
            <Image
              alt="A Serein Studio linen look in a warm, sunlit courtyard"
              fill
              sizes="(max-width: 800px) 70vw, 28vw"
              src={photo("photo-1525507119028-ed4c629a60a3", 1000)}
            />
          </div>
          <div aria-label="Designed to return to, season after season" className="round-seal">
            <svg aria-hidden="true" viewBox="0 0 120 120">
              <defs><path d="M60,60 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0" id="seal-circle" /></defs>
              <text><textPath href="#seal-circle">SEREIN STUDIO · MADE FOR EVERY DAY · </textPath></text>
            </svg>
            <span aria-hidden="true">S</span>
          </div>
        </Reveal>
        <div className="category-copy">
          <p className="eyebrow">01 — A note on getting dressed</p>
          <h2 className="display-heading" id="category-title">Discover<br />the newest<br />look.</h2>
          <p>
            Serein Studio is an independent clothing label for considered
            everyday clothing. Explore women&apos;s and men&apos;s wear, natural
            textures, and modern wardrobe essentials designed to feel like your own.
          </p>
          <Link className="button-dark" href="/shop?price=under-49">
            Shop under $49 <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <section aria-labelledby="trending-title" className="trending-section section-pad">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 — New arrival</p>
            <h2 className="display-heading" id="trending-title">The pieces in rotation.</h2>
          </div>
          <Link className="text-link" href="/shop">Shop all pieces <span aria-hidden="true">↗</span></Link>
        </div>
        <ProductCarousel />
      </section>

      <section aria-labelledby="seasonal-title" className="seasonal-section">
        <div className="seasonal-heading">
          <p className="eyebrow">The autumn / winter 2026 edit</p>
          <h2 className="display-heading" id="seasonal-title">Soft forms, lasting feeling.</h2>
        </div>
        <div className="lookbook-grid">
          {[
            ["photo-1539109136881-3be0616acf4b", "Easy layers in warm natural tones", "01 / 03"],
            ["photo-1483985988355-763728e1935b", "A relaxed silhouette in late afternoon light", "02 / 03"],
            ["photo-1515886657613-9f3515b0c78f", "Thoughtful everyday tailoring in the city", "03 / 03"],
          ].map(([src, alt, label], index) => (
            <Link className={`lookbook-card lookbook-card--${index + 1}`} href="/collections/soft-forms" key={src}>
              <Image alt={alt} fill sizes="(max-width: 700px) 88vw, 34vw" src={photo(src, 1200)} />
              <span className="lookbook-index eyebrow">{label}</span>
              {index === 1 && (
                <span className="lookbook-overlay">
                  <span className="eyebrow">A/W 26 — New arrivals</span>
                  <strong className="display-heading">Modern men&apos;s<br />collection.</strong>
                  <span className="lookbook-link">View the collection <span aria-hidden="true">↗</span></span>
                </span>
              )}
            </Link>
          ))}
        </div>
      </section>

      <section aria-label="The Serein promise" className="trust-section">
        {trustItems.map((item) => (
          <div className="trust-item" key={item.title}>
            <TrustIcon name={item.icon} />
            <div><h3>{item.title}</h3><p>{item.description}</p></div>
          </div>
        ))}
      </section>

      <section aria-labelledby="editorial-title" className="editorial-section section-pad">
        <div className="editorial-copy">
          <p className="eyebrow">A wardrobe, with intention</p>
          <h2 className="display-heading" id="editorial-title">The future of fashion is here.</h2>
          <p>
            Less noise, more meaning. We are finding a gentler way forward through
            responsible materials, considered production, and clothes designed
            to stay in your life.
          </p>
          <Link className="text-link" href="/about">Get to know Serein <span aria-hidden="true">↗</span></Link>
          <div className="film-thumb">
            <Image
              alt="Soft sunlight falling across the studio where Serein pieces are made"
              fill
              sizes="(max-width: 800px) 90vw, 35vw"
              src={photo("photo-1485230895905-ec40ba36b9bc", 1000)}
            />
            <EditorialFilm />
          </div>
        </div>
        <div className="editorial-images">
          <div className="editorial-image editorial-image--tall">
            <Image alt="A quiet black and white portrait in soft tailoring" className="editorial-mono" fill sizes="(max-width: 800px) 55vw, 29vw" src={photo("photo-1534528741775-53994a69daeb", 1000)} />
          </div>
          <div className="editorial-image editorial-image--small">
            <Image alt="Black and white detail of a relaxed studio outfit" className="editorial-mono" fill sizes="(max-width: 800px) 48vw, 23vw" src={photo("photo-1529139574466-a303027c1d8b", 900)} />
          </div>
          <p className="eyebrow">Quiet by design. Considered in every detail.</p>
        </div>
      </section>

      <section aria-label="Selected studio notes" className="brand-strip">
        <p className="eyebrow">In good company</p>
        <div className="brand-wordmarks" aria-label="Serein studio collections">
          <span>FORME</span><span className="brand-wordmark-serif">atelier lune</span><span>STILL / FORM</span>
          <span className="brand-wordmark-serif">la maison douce</span><span>OBJECTS 01</span><span>COMMON ERA</span>
        </div>
      </section>

      <section aria-labelledby="featured-title" className="featured-section section-pad">
        <div className="section-heading">
          <div>
            <p className="eyebrow">02 — The Serein wardrobe</p>
            <h2 className="display-heading" id="featured-title">Made to meet the moment.</h2>
          </div>
          <Link className="text-link" href="/shop">Explore the wardrobe <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="featured-grid">
          {featuredProducts.map((product, index) => (
            <Link className={`featured-card featured-card--${index + 1}`} href={`/shop/${product.slug}`} key={product.id}>
              <div className="featured-image">
                <Image alt={product.alt} fill sizes={index === 0 ? "(max-width: 700px) 90vw, 48vw" : "(max-width: 700px) 43vw, 22vw"} src={product.image} />
                <span className="featured-card-label eyebrow">{product.category} — {product.color}</span>
              </div>
              <div className="featured-card-meta">
                <span>{product.name}</span>
                <span>{formatPrice(product.price)}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="testimonial-title" className="testimonial-section">
        <p className="eyebrow" id="testimonial-title">A few words from you</p>
        <TestimonialSlider />
      </section>

      <section aria-labelledby="instagram-title" className="instagram-section section-pad">
        <div className="instagram-heading">
          <div><p className="eyebrow">Notes from the community</p><h2 className="display-heading" id="instagram-title">A little everyday inspiration.</h2></div>
          <a className="text-link" href="https://www.instagram.com/" rel="noreferrer" target="_blank">@sereinstudio <span aria-hidden="true">↗</span></a>
        </div>
        <div className="instagram-grid">
          {[
            ["photo-1503342217505-b0a15ec3261c", "Soft white cotton worn in the afternoon sun"],
            ["photo-1483985988355-763728e1935b", "Friends sharing a slow morning in relaxed layers"],
            ["photo-1485230895905-ec40ba36b9bc", "Sunlit detail from the Serein autumn wardrobe"],
            ["photo-1515886657613-9f3515b0c78f", "An easy silhouette in a quiet city setting"],
            ["photo-1490481651871-ab68de25d43d", "Thoughtful wardrobe staples in natural shades"],
            ["photo-1496747611176-843222e1e57c", "A light summer look with understated detail"],
          ].map(([src, alt], index) => (
            <a className="instagram-card" href="https://www.instagram.com/" key={src} rel="noreferrer" target="_blank">
              <Image alt={alt} fill sizes="(max-width: 600px) 42vw, 16vw" src={photo(src, 650)} />
              <span aria-hidden="true" className="instagram-hover">View note <span>↗</span></span>
              <span className="sr-only">Open Serein Studio on Instagram, image {index + 1}</span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
