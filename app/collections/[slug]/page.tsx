import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ui/product-card";
import { collections, getCollection } from "@/data/collections";
import { products } from "@/data/products";
import { absoluteUrl, breadcrumbItems, createPageMetadata } from "@/lib/seo";
import { StructuredData } from "@/components/ui/structured-data";

export const revalidate = 3600;

export function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({ params }: PageProps<"/collections/[slug]">) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return createPageMetadata({
    title: "Collection not found",
    description: "Discover thoughtful clothing and considered everyday essentials from Serein Studio in the complete collection.",
    path: "/shop",
  });

  return createPageMetadata({
    title: collection.title,
    description: `${collection.description} Discover the Serein Studio ${collection.title.toLowerCase()} collection.`,
    path: `/collections/${collection.slug}`,
    image: `/collections/${collection.slug}/opengraph-image`,
  });
}

export default async function CollectionPage({ params }: PageProps<"/collections/[slug]">) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();
  const collectionProducts = products.filter((product) =>
    collection.categories.includes(product.category),
  );

  return (
    <main className="inner-page collection-page" id="main-content">
      <StructuredData data={[
        breadcrumbItems([
          { name: "Home", path: "/" },
          { name: "Collections", path: "/collections/soft-forms" },
          { name: collection.title, path: `/collections/${collection.slug}` },
        ]),
        {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: collection.title,
          description: collection.description,
          numberOfItems: collectionProducts.length,
          itemListElement: collectionProducts.map((product, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: absoluteUrl(`/shop/${product.slug}`),
            name: product.name,
          })),
        },
      ]} />
      <nav aria-label="Breadcrumb" className="breadcrumbs">
        <Link href="/">Home</Link><span aria-hidden="true">/</span>
        <Link href="/shop">Collections</Link><span aria-hidden="true">/</span>
        <span aria-current="page">{collection.title}</span>
      </nav>
      <header className="collection-hero">
        <div className="collection-hero-image">
          <Image alt={collection.alt} fill priority sizes="100vw" src={collection.image} />
        </div>
        <div className="collection-hero-scrim" />
        <div className="collection-hero-copy">
          <p className="eyebrow">{collection.subtitle}</p>
          <h1 className="display-heading">{collection.title}</h1>
          <p>{collection.description}</p>
          <a className="hero-discover" href="#collection-pieces">Discover the edit <span aria-hidden="true">↓</span></a>
        </div>
      </header>
      <section aria-labelledby="collection-pieces" className="collection-products section-pad" id="collection-pieces">
        <div className="section-heading">
          <div><p className="eyebrow">Thoughtfully chosen</p><h2 className="display-heading" id="collection-pieces">The collection.</h2></div>
          <span className="eyebrow">{collectionProducts.length} pieces</span>
        </div>
        <div className="shop-product-grid">
          {collectionProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>
    </main>
  );
}
