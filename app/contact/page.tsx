import Link from "next/link";
import { StructuredData } from "@/components/ui/structured-data";
import { breadcrumbItems, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contact & customer care",
  description:
    "Get in touch with Serein Studio for help with an order, thoughtful product advice, sizing, shipping, returns, or anything else we can help with.",
  path: "/contact",
});

const faqs = [
  {
    question: "When will my order arrive?",
    answer:
      "Orders are prepared with care and usually leave our studio within two business days. Delivery times vary by destination; your dispatch confirmation will include tracking details.",
  },
  {
    question: "Can I return a piece?",
    answer:
      "Of course. If your piece is not quite right, contact us within 15 days of delivery. Items should be unworn, in their original condition, and returned with their tags.",
  },
  {
    question: "How do I find my size?",
    answer:
      "Each product page includes fit notes. If you are between sizes or would like a second opinion, write to the studio with the piece you are considering and we will help.",
  },
  {
    question: "How should I care for my clothes?",
    answer:
      "Care depends on the fabric. As a gentle starting point, wash less often, use a cool cycle with like colors, and air dry where possible. Follow the individual garment label for the best results.",
  },
];

export default function ContactPage() {
  return (
    <main className="inner-page contact-page" id="main-content">
      <StructuredData data={[
        breadcrumbItems([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]),
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        },
      ]} />
      <header className="inner-page-heading">
        <p className="eyebrow">A real person, just over here</p>
        <h1 className="display-heading">Say hello.</h1>
        <p>Questions about a piece, an order, or finding the right fit? The studio is happy to help.</p>
      </header>
      <div className="contact-grid section-pad">
        <section className="contact-card">
          <p className="eyebrow">Write to the studio</p>
          <h2 className="display-heading">We are listening.</h2>
          <p>Send us a note and we will get back to you within two working days.</p>
          <a className="contact-email" href="mailto:hello@sereinstudio.example">hello@sereinstudio.example</a>
          <span className="eyebrow">Monday–Friday · 9am–5pm</span>
        </section>
        <section aria-labelledby="faq-heading" className="faq-section" id="faq">
          <p className="eyebrow">A few useful things</p>
          <h2 className="display-heading" id="faq-heading">Good to know.</h2>
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </section>
      </div>
      <section aria-labelledby="shipping-heading" className="contact-policy section-pad" id="shipping">
        <div>
          <p className="eyebrow">Shipping &amp; returns</p>
          <h2 className="display-heading" id="shipping-heading">Room to get it right.</h2>
        </div>
        <p>
          We offer complimentary shipping on orders over $150. If something
          does not feel right, you have 15 days from delivery to request a
          return. Email the studio before sending a parcel so we can share the
          correct return details.
        </p>
      </section>
      <div className="contact-size-note section-pad" id="size-guide">
        <p className="eyebrow">Fit &amp; sizing</p>
        <p>Each product page includes individual fit notes. For personal sizing help, <Link href="mailto:hello@sereinstudio.example">write to us</Link> with your usual size and the piece you have in mind.</p>
      </div>
    </main>
  );
}
