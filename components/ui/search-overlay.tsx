"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { formatPrice, products } from "@/data/products";

export function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const matches = query.trim()
    ? products.filter((product) =>
        `${product.name} ${product.category} ${product.color}`.toLowerCase().includes(query.trim().toLowerCase()),
      )
    : [];

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  return (
    <div className="search-layer">
      <button aria-label="Close search" className="search-backdrop" onClick={onClose} type="button" />
      <section aria-label="Product search" aria-modal="true" className="search-panel" role="dialog">
        <div className="search-panel__top">
          <label className="eyebrow" htmlFor="site-search">What are you looking for?</label>
          <button aria-label="Close search" className="icon-button" onClick={onClose} type="button">×</button>
        </div>
        <input
          autoComplete="off"
          autoFocus
          id="site-search"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try linen, cotton, everyday…"
          type="search"
          value={query}
        />
        <div aria-live="polite" className="search-results">
          {!query.trim() ? (
            <p className="eyebrow">A few good things to start with — linen, cotton, easy layers</p>
          ) : matches.length === 0 ? (
            <p>No pieces found. Try another word.</p>
          ) : (
            matches.slice(0, 5).map((product) => (
              <Link href={`/shop/${product.slug}`} key={product.id} onClick={onClose}>
                <span className="search-result-image">
                  <Image alt={product.alt} fill sizes="58px" src={product.image} />
                </span>
                <span>{product.name}<small>{product.category} · {product.color}</small></span>
                <span>{formatPrice(product.price)}</span>
              </Link>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
