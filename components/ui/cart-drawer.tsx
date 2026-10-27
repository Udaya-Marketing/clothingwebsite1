"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { formatPrice, products } from "@/data/products";
import { useCartStore } from "@/lib/cart-store";

export function CartDrawer() {
  const isOpen = useCartStore((state) => state.isOpen);
  const items = useCartStore((state) => state.items);
  const setOpen = useCartStore((state) => state.setOpen);
  const removeItem = useCartStore((state) => state.removeItem);
  const lines = items.flatMap((item) => {
    const product = products.find((entry) => entry.id === item.productId);
    return product ? [{ ...item, product }] : [];
  });
  const subtotal = lines.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isOpen, setOpen]);

  if (!isOpen) return null;

  return (
    <div className="drawer-layer">
      <button
        aria-label="Close shopping bag"
        className="drawer-backdrop"
        onClick={() => setOpen(false)}
        type="button"
      />
      <section aria-label="Shopping bag" aria-modal="true" className="cart-drawer" role="dialog">
        <div className="drawer-heading">
          <div>
            <p className="eyebrow">A few good things</p>
            <h2 className="display-heading">Your bag</h2>
          </div>
          <button aria-label="Close shopping bag" className="icon-button" onClick={() => setOpen(false)} type="button">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        {lines.length === 0 ? (
          <div className="drawer-empty">
            <p>Your bag is taking a quiet moment.</p>
            <button className="button-dark" onClick={() => setOpen(false)} type="button">
              Explore the collection <span aria-hidden="true">↗</span>
            </button>
          </div>
        ) : (
          <>
            <div className="drawer-items">
              {lines.map(({ product, quantity, size }) => (
                <article className="drawer-item" key={`${product.id}-${size}`}>
                  <div className="drawer-item__image">
                    <Image alt={product.alt} fill sizes="100px" src={product.image} />
                  </div>
                  <div className="drawer-item__details">
                    <h3>{product.name}</h3>
                    <p>{product.color} · {size}</p>
                    <p>{quantity} × {formatPrice(product.price)}</p>
                    <button className="drawer-remove" onClick={() => removeItem(product.id, size)} type="button">
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>
            <div className="drawer-summary">
              <p><span>Subtotal</span><span>{formatPrice(subtotal)}</span></p>
              <small>Shipping and taxes calculated at checkout.</small>
              <Link className="button-dark" href="/cart" onClick={() => setOpen(false)}>
                View your bag <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
