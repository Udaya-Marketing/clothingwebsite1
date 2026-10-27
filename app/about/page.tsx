import Image from "next/image";
import Link from "next/link";
import { StructuredData } from "@/components/ui/structured-data";
import { breadcrumbItems, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About the studio",
  description:
    "Meet Serein Studio, an independent clothing label creating considered everyday essentials with natural textures, thoughtful design, and a lighter touch.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main className="inner-page about-page" id="main-content">
      <StructuredData data={breadcrumbItems([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
      <header className="about-heading">
        <p className="eyebrow">A little about us</p>
        <h1 className="display-heading">Clothes for the life you are living.</h1>
        <p>
          Serein is an independent clothing studio looking for a softer way to
          get dressed: less noise, more meaning, and the pleasure of a piece you
          will reach for again.
        </p>
      </header>
      <div className="about-image">
        <Image
          alt="A calm, sunlit studio with natural fabrics and clothing being considered"
          fill
          priority
          sizes="(max-width: 800px) 100vw, 88vw"
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1800&q=85"
        />
        <span className="eyebrow">A slower point of view · Serein studio</span>
      </div>
      <section aria-labelledby="about-intention" className="about-story section-pad">
        <p className="eyebrow">Our point of view</p>
        <div>
          <h2 className="display-heading" id="about-intention">A good wardrobe should leave room for you.</h2>
          <p>
            Serein began with a familiar feeling: standing in front of a full
            wardrobe and still reaching for the same few things. We set out to
            make clothing that earns that place—easy to wear, considered in
            detail, and comfortable in its own skin.
          </p>
          <p>
            We work in small, thoughtful edits rather than chasing a newness
            calendar. Each piece begins with the way it will live: how it feels
            against the body, how it fits into the morning, and how it might
            soften with time.
          </p>
          <Link className="text-link" href="/shop">Explore the wardrobe <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
      <section aria-labelledby="about-materials" className="materials-section section-pad" id="materials">
        <div className="materials-copy">
          <p className="eyebrow">Materials &amp; making</p>
          <h2 className="display-heading" id="about-materials">Thoughtful at every touch.</h2>
          <p>
            We favor natural-feeling fabrics, enduring colors, and construction
            that makes everyday care feel simple. We are still learning, asking
            better questions, and working toward a lighter footprint with each
            collection.
          </p>
          <p>
            We make considered quantities and share the materials and care
            information we have for each piece. We believe care is not a
            campaign; it is a practice, improved one decision at a time.
          </p>
        </div>
        <div className="materials-image">
          <Image
            alt="Natural linen and cotton fabric textures arranged in soft daylight"
            fill
            sizes="(max-width: 800px) 88vw, 40vw"
            src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=1200&q=85"
          />
        </div>
      </section>
    </main>
  );
}
