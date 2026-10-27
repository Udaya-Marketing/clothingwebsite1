import { CartPageContent } from "@/components/ui/cart-page-content";
import { StructuredData } from "@/components/ui/structured-data";
import { breadcrumbItems, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Your bag",
  description: "Review your considered Serein Studio pieces, check your selected sizes, and prepare your wardrobe for checkout.",
  path: "/cart",
  noIndex: true,
});

export default function CartPage() {
  return (
    <main className="inner-page cart-page" id="main-content">
      <StructuredData data={breadcrumbItems([{ name: "Home", path: "/" }, { name: "Your bag", path: "/cart" }])} />
      <header className="inner-page-heading cart-heading">
        <p className="eyebrow">Your Serein Studio edit</p>
        <h1 className="display-heading">Your bag.</h1>
      </header>
      <CartPageContent />
    </main>
  );
}
