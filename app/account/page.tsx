import Link from "next/link";
import { StructuredData } from "@/components/ui/structured-data";
import { breadcrumbItems, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Your account",
  description: "Manage your Serein Studio customer account, review order details, and get help with your wardrobe and purchases.",
  path: "/account",
  noIndex: true,
});

export default function AccountPage() {
  return (
    <main className="inner-page simple-page" id="main-content">
      <StructuredData data={breadcrumbItems([{ name: "Home", path: "/" }, { name: "Account", path: "/account" }])} />
      <p className="eyebrow">A familiar place</p>
      <h1 className="display-heading">Your account.</h1>
      <p>Customer accounts are not connected in this preview. For help with an order, the studio is here.</p>
      <Link className="button-dark" href="/contact">Contact the studio <span aria-hidden="true">↗</span></Link>
    </main>
  );
}
