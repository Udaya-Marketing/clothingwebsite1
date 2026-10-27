import Image from "next/image";
import Link from "next/link";
import { posts } from "@/data/posts";
import { StructuredData } from "@/components/ui/structured-data";
import { breadcrumbItems, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "The Serein Journal",
  description:
    "A journal about getting dressed with intention: stories on natural materials, thoughtful care, and building a wardrobe that feels like your own.",
  path: "/blog",
});

export default function BlogPage() {
  const [featured, ...stories] = posts;

  return (
    <main className="inner-page journal-page" id="main-content">
      <StructuredData data={breadcrumbItems([{ name: "Home", path: "/" }, { name: "Journal", path: "/blog" }])} />
      <header className="inner-page-heading">
        <p className="eyebrow">The Serein journal · Notes on getting dressed</p>
        <h1 className="display-heading">Thoughts to keep.</h1>
        <p>Stories, small guides, and thoughtful notes from a slower corner of fashion.</p>
      </header>
      <article className="journal-feature">
        <Link className="journal-feature-image" href={`/blog/${featured.slug}`}>
          <Image alt={featured.alt} fill priority sizes="(max-width: 800px) 100vw, 55vw" src={featured.image} />
        </Link>
        <div className="journal-feature-copy">
          <p className="eyebrow">{featured.category} · {featured.readTime}</p>
          <h2 className="display-heading"><Link href={`/blog/${featured.slug}`}>{featured.title}</Link></h2>
          <p>{featured.excerpt}</p>
          <Link className="text-link" href={`/blog/${featured.slug}`}>Read the story <span aria-hidden="true">↗</span></Link>
        </div>
      </article>
      <section aria-labelledby="journal-stories" className="journal-stories section-pad">
        <div className="section-heading"><div><p className="eyebrow">A few more notes</p><h2 className="display-heading" id="journal-stories">From the journal.</h2></div></div>
        <div className="journal-grid">
          {stories.map((post) => (
            <article className="journal-card" key={post.slug}>
              <Link className="journal-card-image" href={`/blog/${post.slug}`}>
                <Image alt={post.alt} fill sizes="(max-width: 600px) 88vw, 32vw" src={post.image} />
              </Link>
              <p className="eyebrow">{post.category} · {post.readTime}</p>
              <h3 className="display-heading"><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
              <p>{post.excerpt}</p>
              <Link className="text-link" href={`/blog/${post.slug}`}>Read the story <span aria-hidden="true">↗</span></Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
