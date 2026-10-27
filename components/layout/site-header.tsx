"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useCartStore } from "@/lib/cart-store";

const CartDrawer = dynamic(() =>
  import("@/components/ui/cart-drawer").then((module) => module.CartDrawer),
);
const SearchOverlay = dynamic(() =>
  import("@/components/ui/search-overlay").then((module) => module.SearchOverlay),
);

const navigation = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Collection", href: "/collections/soft-forms" },
  { label: "Pages", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const itemCount = useCartStore((state) =>
    state.items.reduce((count, item) => count + item.quantity, 0),
  );
  const setCartOpen = useCartStore((state) => state.setOpen);

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 24);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isMenuOpen]);

  return (
    <>
      <header className="site-header">
        <div className={`header-pill${isScrolled ? " is-scrolled" : ""}`}>
          <button
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="menu-toggle"
            onClick={() => setIsMenuOpen((open) => !open)}
            type="button"
          >
            <svg aria-hidden="true" fill="none" height="18" viewBox="0 0 20 20" width="18">
              {isMenuOpen ? (
                <path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.2" />
              ) : (
                <path d="M2 6h16M2 14h16" stroke="currentColor" strokeWidth="1.2" />
              )}
            </svg>
          </button>
          <Link
            aria-label="Serein Studio home"
            className="brand-mark"
            href="/"
            onClick={() => setIsMenuOpen(false)}
          >
            SEREIN
          </Link>
          <nav aria-label="Main navigation" className="primary-nav">
            {navigation.map((item) => (
              <Link href={item.href} key={item.label}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <button aria-label="Search" className="search-trigger" onClick={() => setIsSearchOpen(true)} type="button">
              <svg aria-hidden="true" fill="none" height="16" viewBox="0 0 20 20" width="16">
                <circle cx="8.8" cy="8.8" r="5.8" stroke="currentColor" strokeWidth="1.25" />
                <path d="m13.2 13.2 4 4" stroke="currentColor" strokeWidth="1.25" />
              </svg>
              <span>Search</span>
            </button>
            <Link href="/account">Account</Link>
            <button
              aria-label={`Open shopping bag, ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
              className="cart-link"
              onClick={() => setCartOpen(true)}
              type="button"
            >
              Bag <span aria-hidden="true">({itemCount})</span>
            </button>
          </div>
        </div>
      </header>
      {isMenuOpen && (
        <div className="mobile-menu">
          <nav aria-label="Mobile navigation">
            {navigation.map((item) => (
              <Link href={item.href} key={item.label} onClick={() => setIsMenuOpen(false)}>
                {item.label}
              </Link>
            ))}
          </nav>
          <p className="eyebrow">Considered pieces, made for every day.</p>
        </div>
      )}
      <CartDrawer />
      {isSearchOpen && <SearchOverlay onClose={() => setIsSearchOpen(false)} />}
    </>
  );
}
