import Link from "next/link";
import { StructuredData } from "@/components/ui/structured-data";
import { breadcrumbItems, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Privacy policy",
  description: "Learn how Serein Studio handles personal information, newsletter subscriptions, customer details, and your privacy choices.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main className="inner-page policy-page" id="main-content">
      <StructuredData data={breadcrumbItems([{ name: "Home", path: "/" }, { name: "Privacy", path: "/privacy" }])} />
      <p className="eyebrow">Last updated · October 2026</p>
      <h1 className="display-heading">Privacy, with care.</h1>
      <p>
        This preview does not process orders or store customer accounts. If you
        subscribe to studio notes after the newsletter integration is
        configured, your email address will be sent to the selected email
        marketing provider for confirmation and delivery.
      </p>
      <h2 className="display-heading">Information we may collect</h2>
      <p>
        A live store may collect contact, delivery, and order details needed
        to fulfil purchases, answer questions, and meet legal obligations.
        Configure your commerce, analytics, and marketing providers to collect
        only what is needed and disclose their use here before launch.
      </p>
      <h2 className="display-heading">Your choices</h2>
      <p>
        You may request access to, correction of, or deletion of personal
        information where applicable. Contact the studio at{" "}
        <a href="mailto:hello@sereinstudio.example">hello@sereinstudio.example</a>.
      </p>
      <p>For questions, <Link href="/contact">get in touch with the studio</Link>.</p>
    </main>
  );
}
