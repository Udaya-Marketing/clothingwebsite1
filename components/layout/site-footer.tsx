import Link from "next/link";
import { NewsletterForm } from "@/components/ui/newsletter-form";

const footerGroups = [
  {
    title: "The studio",
    links: [
      ["Our story", "/about"],
      ["Materials & care", "/about#materials"],
      ["Journal", "/blog"],
      ["Contact", "/contact"],
    ],
  },
  {
    title: "Explore",
    links: [
      ["All pieces", "/shop"],
      ["Women's wear", "/collections/womenswear"],
      ["Men's wear", "/collections/menswear"],
      ["Everyday objects", "/collections/accessories"],
    ],
  },
  {
    title: "A little help",
    links: [
      ["Shipping & returns", "/contact#shipping"],
      ["Size guide", "/contact#size-guide"],
      ["FAQs", "/contact#faq"],
      ["Say hello", "/contact"],
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div aria-hidden="true" className="footer-marquee">
        <div className="footer-marquee-track">
          Get offer today! <span>✳</span> Get offer today! <span>✳</span>
        </div>
      </div>
      <div className="footer-main">
        <div className="footer-intro">
          <Link aria-label="Serein Studio home" className="footer-logo" href="/">SEREIN</Link>
          <p>Thoughtful clothes<br />for the everyday.</p>
        </div>
        {footerGroups.map((group) => (
          <div className="footer-column" key={group.title}>
            <p className="eyebrow">{group.title}</p>
            {group.links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
          </div>
        ))}
        <div className="footer-newsletter">
          <p className="eyebrow">A note from the studio</p>
          <h2 className="display-heading">Good things,<br />occasionally.</h2>
          <p>New pieces, considered thoughts, and the odd invitation. Nothing more.</p>
          <NewsletterForm />
        </div>
      </div>
      <div className="footer-bottom">
        <p>© Serein Studio · Thoughtfully made, meant to be worn.</p>
        <div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div>
        <a href="https://www.instagram.com/" rel="noreferrer" target="_blank">Instagram ↗</a>
      </div>
    </footer>
  );
}
