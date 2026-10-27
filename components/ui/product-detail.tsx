"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/data/products";
import { formatPrice } from "@/data/products";
import { useCartStore } from "@/lib/cart-store";

export function ProductDetail({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState("");
  const [message, setMessage] = useState("");
  const addItem = useCartStore((state) => state.addItem);
  const isSaved = useCartStore((state) => state.wishlist.includes(product.id));
  const toggleItem = useCartStore((state) => state.toggleItem);

  const handleAdd = () => {
    if (!selectedSize) {
      setMessage("Please choose a size before adding this piece to your bag.");
      return;
    }
    setMessage("");
    addItem(product.id, selectedSize);
  };

  return (
    <div className="product-detail">
      <div className="product-gallery">
        <div className="product-gallery-main">
          <Image alt={product.alt} fill priority sizes="(max-width: 800px) 100vw, 55vw" src={product.image} />
        </div>
        <div className="product-gallery-secondary">
          <Image alt={`${product.alt}, second view`} fill sizes="(max-width: 800px) 48vw, 26vw" src={product.hoverImage} />
        </div>
      </div>
      <div className="product-detail-copy">
        <p className="eyebrow">{product.category} · {product.color}</p>
        <h1 className="display-heading">{product.name}</h1>
        <div className="detail-price">
          <span>{formatPrice(product.price)}</span>
          {product.compareAtPrice && <del>{formatPrice(product.compareAtPrice)}</del>}
          <span className="eyebrow">USD · Taxes included</span>
        </div>
        <p className="product-description">{product.description}</p>
        <div className="size-picker">
          <div className="size-picker-heading">
            <span className="eyebrow">Choose your size</span>
            <a href="/contact#size-guide">Size guide ↗</a>
          </div>
          <div aria-label="Available sizes" className="size-options" role="group">
            {product.sizes.map((size) => (
              <button
                aria-pressed={selectedSize === size}
                className={selectedSize === size ? "is-selected" : ""}
                key={size}
                onClick={() => { setSelectedSize(size); setMessage(""); }}
                type="button"
              >
                {size}
              </button>
            ))}
          </div>
          <p aria-live="polite" className="size-message">{message || (selectedSize ? `Selected: ${selectedSize}` : "Please select a size.")}</p>
        </div>
        <div className="product-detail-actions">
          <button className="button-dark" onClick={handleAdd} type="button">
            Add to bag <span>{formatPrice(product.price)}</span>
          </button>
          <button
            aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={isSaved}
            className={`detail-wishlist${isSaved ? " is-saved" : ""}`}
            onClick={() => toggleItem(product.id)}
            type="button"
          >
            <svg aria-hidden="true" fill={isSaved ? "currentColor" : "none"} height="20" viewBox="0 0 20 20" width="20">
              <path d="M10 17s-7-4.4-7-9.2A3.8 3.8 0 0 1 10 5.2a3.8 3.8 0 0 1 7 2.6C17 12.6 10 17 10 17Z" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </button>
        </div>
        <div className="product-accordions">
          <details>
            <summary>Details &amp; fit</summary>
            <p>Designed for an easy, relaxed fit. Choose your usual size for a soft drape, or size down for a closer feel. Our pieces are measured by hand; allow for small variations.</p>
          </details>
          <details>
            <summary>Fabric &amp; care</summary>
            <p>Made with thoughtfully selected fibres. Wash gently with like colors, reshape while damp, and air dry where possible. Full care information is included with your piece.</p>
          </details>
          <details>
            <summary>Shipping &amp; returns</summary>
            <p>Complimentary shipping on orders over $150. If it is not quite right, return it within 15 days in its original condition. <a href="/contact#shipping">Read our shipping and returns notes.</a></p>
          </details>
        </div>
      </div>
    </div>
  );
}
