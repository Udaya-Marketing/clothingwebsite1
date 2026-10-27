"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice, products } from "@/data/products";

export function CartPageContent() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const lines = items.flatMap((item) => {
    const product = products.find((entry) => entry.id === item.productId);
    return product ? [{ ...item, product }] : [];
  });
  const subtotal = lines.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (!lines.length) {
    return (
      <div className="cart-empty">
        <p className="eyebrow">A little space for something good</p>
        <h2 className="display-heading">Your bag is taking a quiet moment.</h2>
        <p>There is nothing in it just yet. Take a look around; your next favorite may be waiting.</p>
        <Link className="button-dark" href="/shop">Explore the collection <span aria-hidden="true">↗</span></Link>
      </div>
    );
  }

  return (
    <div className="cart-page-layout">
      <div className="cart-page-lines">
        {lines.map(({ product, quantity, size }) => (
          <article className="cart-page-line" key={`${product.id}-${size}`}>
            <div className="cart-page-image">
              <Image alt={product.alt} fill sizes="150px" src={product.image} />
            </div>
            <div className="cart-page-info">
              <Link href={`/shop/${product.slug}`}><h2>{product.name}</h2></Link>
              <p>{product.color} · Size {size}</p>
              <p>Quantity: {quantity}</p>
              <button onClick={() => removeItem(product.id, size)} type="button">Remove</button>
            </div>
            <span>{formatPrice(product.price * quantity)}</span>
          </article>
        ))}
      </div>
      <aside className="cart-page-summary">
        <h2 className="eyebrow">A considered checkout</h2>
        <p><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></p>
        <small>Shipping and any applicable taxes are calculated at checkout.</small>
        <button className="button-dark" disabled type="button">Checkout coming soon <span aria-hidden="true">↗</span></button>
        <p className="cart-demo-note">Online checkout is not connected in this preview. Connect your commerce provider to accept orders.</p>
        <Link className="text-link" href="/shop">Continue browsing <span aria-hidden="true">↗</span></Link>
      </aside>
    </div>
  );
}
