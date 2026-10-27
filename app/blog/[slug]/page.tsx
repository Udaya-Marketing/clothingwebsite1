import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, posts } from "@/data/posts";
import { breadcrumbItems, createPageMetadata, absoluteUrl } from "@/lib/seo";
import { StructuredData } from "@/components/ui/structured-data";

export const revalidate = 3600;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return createPageMetadata({
    title: "Story not found",
    description: "This journal story is not available. Explore thoughtful notes on natural materials, everyday style, and considered clothing from Serein Studio.",
    path: "/blog",
  });
  const metadata = createPageMetadata({
      title: post.title,
      description: post.excerpt,
      path: `/blog/${post.slug}`,
      image: `/blog/${post.slug}/opengraph-image`,
    });

  return {
    ...metadata,
    authors: [{ name: "Serein Studio" }],
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
      authors: ["Serein Studio"],
    },
  };
}

export default async function JournalPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main className="inner-page article-page" id="main-content">
      <StructuredData data={[
        breadcrumbItems([
          { name: "Home", path: "/" },
          { name: "Journal", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]),
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          image: [post.image],
          datePublished: new Date(post.date).toISOString(),
          dateModified: new Date(post.date).toISOString(),
          author: { "@type": "Organization", name: "Serein Studio", url: absoluteUrl("/about") },
          publisher: { "@type": "Organization", name: "Serein Studio", logo: { "@type": "ImageObject", url: absoluteUrl("/icon.svg") } },
          mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
        },
      ]} />
      <nav aria-label="Breadcrumb" className="breadcrumbs">
        <Link href="/">Home</Link><span aria-hidden="true">/</span>
        <Link href="/blog">Journal</Link><span aria-hidden="true">/</span>
        <span aria-current="page">{post.title}</span>
      </nav>
      <article>
        <header className="article-heading">
          <p className="eyebrow">{post.category} · {post.date} · {post.readTime}</p>
          <h1 className="display-heading">{post.title}</h1>
          <p>{post.excerpt}</p>
        </header>
        <div className="article-image">
          <Image alt={post.alt} fill priority sizes="(max-width: 900px) 100vw, 80vw" src={post.image} />
        </div>
        <div className="article-body">
          {post.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <p className="article-signoff">With care,<br /><span className="display-heading">The Serein studio</span></p>
        </div>
      </article>
      <div className="article-back"><Link className="text-link" href="/blog">Back to the journal <span aria-hidden="true">↗</span></Link></div>
    </main>
  );
}
