import { ShopCatalog } from "@/components/ui/shop-catalog";
import { StructuredData } from "@/components/ui/structured-data";
import { breadcrumbItems, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Shop the collection",
  description:
    "Discover considered everyday clothing from Serein Studio: natural textures, easy layers, and thoughtfully designed pieces for women, men, and home.",
  path: "/shop",
});

export default function ShopPage() {
  return (
    <main className="inner-page" id="main-content">
      <StructuredData data={breadcrumbItems([{ name: "Home", path: "/" }, { name: "Shop", path: "/shop" }])} />
      <header className="inner-page-heading shop-page-heading">
        <p className="eyebrow">The Serein wardrobe · 01</p>
        <h1 className="display-heading">Pieces to come back to.</h1>
        <p>
          Thoughtful clothing in natural textures and quiet tones. Discover easy
          layers, considered essentials, and a wardrobe made to feel like your own.
        </p>
      </header>
      <ShopCatalog />
    </main>
  );
}
