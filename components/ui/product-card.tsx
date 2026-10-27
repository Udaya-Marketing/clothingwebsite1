"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Product } from "@/data/products";
import { useCartStore } from "@/lib/cart-store";

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const isSaved = useCartStore((state) => state.wishlist.includes(product.id));
  const toggleItem = useCartStore((state) => state.toggleItem);

  return (
    <article className="product-card">
      <div className="product-card__image">
        <Link aria-label={`View ${product.name}`} className="product-card__link" href={`/shop/${product.slug}`}>
          <Image
            alt={product.alt}
            className="product-image"
            fill
            sizes="(max-width: 600px) 68vw, (max-width: 1000px) 38vw, 20vw"
            src={product.image}
            unoptimized
          />
        </Link>
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <button
          aria-label={isSaved ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={isSaved}
          className={`wishlist-button${isSaved ? " is-saved" : ""}`}
          onClick={() => toggleItem(product.id)}
          type="button"
        >
          <svg aria-hidden="true" fill={isSaved ? "currentColor" : "none"} height="17" viewBox="0 0 20 20" width="17">
            <path d="M10 17s-7-4.4-7-9.2A3.8 3.8 0 0 1 10 5.2a3.8 3.8 0 0 1 7 2.6C17 12.6 10 17 10 17Z" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </button>
        <button
          aria-label={`Quick add ${product.name} in ${product.sizes[0]}`}
          className="quick-add"
          onClick={() => addItem(product.id, product.sizes[0])}
          type="button"
        >
          Quick add <span aria-hidden="true">+</span>
        </button>
      </div>
      <div className="product-card__meta">
        <div>
          <h3><Link href={`/shop/${product.slug}`}>{product.name}</Link></h3>
          <p>{product.color}</p>
        </div>
        <p className="product-price">
          <span>{formatPrice(product.price)}</span>
          {product.compareAtPrice && <del>{formatPrice(product.compareAtPrice)}</del>}
        </p>
      </div>
    </article>
  );
}
