import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/ui/product-detail";
import { products } from "@/data/products";
import { breadcrumbItems, createPageMetadata, productJsonLd } from "@/lib/seo";
import { StructuredData } from "@/components/ui/structured-data";

export const revalidate = 3600;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps<"/shop/[slug]">) {
  const { slug } = await params;
  const product = products.find((entry) => entry.slug === slug);
  if (!product) return createPageMetadata({
    title: "Piece not found",
    description: "We could not find this Serein Studio piece. Discover thoughtful clothing, easy layers, and considered everyday essentials in the full collection.",
    path: "/shop",
  });

  return createPageMetadata({
    title: product.name,
    description: `${product.description} Discover the ${product.name.toLowerCase()} from Serein Studio, thoughtfully designed for everyday wear.`,
    path: `/shop/${product.slug}`,
    image: `/shop/${product.slug}/opengraph-image`,
  });
}

export default async function ProductPage({ params }: PageProps<"/shop/[slug]">) {
  const { slug } = await params;
  const product = products.find((entry) => entry.slug === slug);
  if (!product) notFound();

  const related = products.filter(
    (entry) => entry.id !== product.id && entry.category === product.category,
  );

  return (
    <main className="inner-page product-page" id="main-content">
      <StructuredData data={[
        breadcrumbItems([
          { name: "Home", path: "/" },
          { name: "Shop", path: "/shop" },
          { name: product.name, path: `/shop/${product.slug}` },
        ]),
        productJsonLd({
          name: product.name,
          description: product.description,
          slug: product.slug,
          image: product.image,
          price: product.price,
          id: product.id,
          color: product.color,
        }),
      ]} />
      <nav aria-label="Breadcrumb" className="breadcrumbs">
        <Link href="/">Home</Link><span aria-hidden="true">/</span>
        <Link href="/shop">Shop</Link><span aria-hidden="true">/</span>
        <span aria-current="page">{product.name}</span>
      </nav>
      <ProductDetail product={product} />
      {related.length > 0 && (
        <section aria-labelledby="related-title" className="related-products">
          <div className="section-heading">
            <div><p className="eyebrow">A few things that go well together</p><h2 className="display-heading" id="related-title">Keep in good company.</h2></div>
            <Link className="text-link" href="/shop">Shop all <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="shop-product-grid related-grid">
            {related.slice(0, 4).map((relatedProduct) => (
              <Link className="related-card" href={`/shop/${relatedProduct.slug}`} key={relatedProduct.id}>
                <div className="related-card-image">
                  <Image alt={relatedProduct.alt} fill sizes="(max-width: 600px) 45vw, 22vw" src={relatedProduct.image} />
                </div>
                <p>{relatedProduct.name} <span aria-hidden="true">↗</span></p>
              </Link>
            ))}
          </div>
        </section>
      )}
      <div className="product-back-link"><Link className="text-link" href="/shop">Back to the collection <span aria-hidden="true">↗</span></Link></div>
    </main>
  );
}
