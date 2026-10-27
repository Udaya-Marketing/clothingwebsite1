import Link from "next/link";
import { StructuredData } from "@/components/ui/structured-data";
import { breadcrumbItems, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Terms of use",
  description: "Read the terms for browsing Serein Studio, understanding product information, using this preview, and preparing for a future purchase.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <main className="inner-page policy-page" id="main-content">
      <StructuredData data={breadcrumbItems([{ name: "Home", path: "/" }, { name: "Terms", path: "/terms" }])} />
      <p className="eyebrow">Last updated · October 2026</p>
      <h1 className="display-heading">A few terms.</h1>
      <p>
        This site is a storefront preview. Product availability, pricing,
        shipping, checkout, and customer accounts are not live until connected
        to a commerce provider. Do not submit payment details through this
        preview.
      </p>
      <h2 className="display-heading">Product information</h2>
      <p>
        We make a sincere effort to describe each piece clearly. Colors may
        appear differently from screen to screen, and measurements can vary
        slightly between garments. Availability and prices should be confirmed
        before a live store opens.
      </p>
      <h2 className="display-heading">Questions</h2>
      <p>
        If you need help, please <Link href="/contact">contact the studio</Link>.
      </p>
    </main>
  );
}
