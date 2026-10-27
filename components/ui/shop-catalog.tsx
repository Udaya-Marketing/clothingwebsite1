"use client";

import { useMemo, useState } from "react";
import { products, type Product } from "@/data/products";
import { ProductCard } from "@/components/ui/product-card";

const PAGE_SIZE = 6;
const categories = ["Women", "Men", "Accessories"] as const;
const sizes = ["XS", "S", "M", "L", "XL", "One size"];
const colors = [...new Set(products.map((product) => product.color))];

export function ShopCatalog({ initialCategory }: { initialCategory?: Product["category"] }) {
  const [category, setCategory] = useState(initialCategory ?? "All");
  const [size, setSize] = useState("All");
  const [color, setColor] = useState("All");
  const [price, setPrice] = useState("All");
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const result = products.filter((product) => {
      if (category !== "All" && product.category !== category) return false;
      if (size !== "All" && !product.sizes.includes(size)) return false;
      if (color !== "All" && product.color !== color) return false;
      if (price === "under-50" && product.price >= 50) return false;
      if (price === "50-100" && (product.price < 50 || product.price > 100)) return false;
      if (price === "over-100" && product.price <= 100) return false;
      return true;
    });

    if (sort === "price-low") result.sort((a, b) => a.price - b.price);
    if (sort === "price-high") result.sort((a, b) => b.price - a.price);
    if (sort === "name") result.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "newest") result.sort((a, b) => Number(Boolean(b.badge)) - Number(Boolean(a.badge)));
    return result;
  }, [category, color, price, size, sort]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const resetFilters = () => {
    setCategory("All");
    setSize("All");
    setColor("All");
    setPrice("All");
    setPage(1);
  };

  return (
    <>
      <div className="shop-toolbar">
        <p className="eyebrow">{filtered.length} considered pieces</p>
        <label className="shop-sort">
          <span className="eyebrow">Sort</span>
          <select onChange={(event) => setSort(event.target.value)} value={sort}>
            <option value="featured">Featured</option>
            <option value="newest">New arrivals</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
            <option value="name">Name</option>
          </select>
        </label>
      </div>
      <div className="shop-layout">
        <aside aria-label="Filter products" className="shop-filters">
          <div className="shop-filter-heading">
            <h2 className="eyebrow">Refine your edit</h2>
            <button onClick={resetFilters} type="button">Clear all</button>
          </div>
          <label className="filter-field">
            <span>Category</span>
            <select onChange={(event) => { setCategory(event.target.value); setPage(1); }} value={category}>
              <option value="All">All categories</option>
              {categories.map((entry) => <option key={entry} value={entry}>{entry}</option>)}
            </select>
          </label>
          <label className="filter-field">
            <span>Size</span>
            <select onChange={(event) => { setSize(event.target.value); setPage(1); }} value={size}>
              <option value="All">All sizes</option>
              {sizes.map((entry) => <option key={entry} value={entry}>{entry}</option>)}
            </select>
          </label>
          <label className="filter-field">
            <span>Color</span>
            <select onChange={(event) => { setColor(event.target.value); setPage(1); }} value={color}>
              <option value="All">All colors</option>
              {colors.map((entry) => <option key={entry} value={entry}>{entry}</option>)}
            </select>
          </label>
          <label className="filter-field">
            <span>Price</span>
            <select onChange={(event) => { setPrice(event.target.value); setPage(1); }} value={price}>
              <option value="All">Any price</option>
              <option value="under-50">Under $50</option>
              <option value="50-100">$50 — $100</option>
              <option value="over-100">Over $100</option>
            </select>
          </label>
        </aside>
        <div className="shop-results">
          {visible.length > 0 ? (
            <div className="shop-product-grid">
              {visible.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          ) : (
            <div className="shop-empty">
              <h2 className="display-heading">Nothing just yet.</h2>
              <p>Try easing one of your filters to find your next favorite.</p>
              <button className="text-link" onClick={resetFilters} type="button">Clear filters <span aria-hidden="true">↗</span></button>
            </div>
          )}
          {pageCount > 1 && (
            <nav aria-label="Product pages" className="pagination">
              <button aria-label="Previous page" disabled={page === 1} onClick={() => setPage((current) => current - 1)} type="button">←</button>
              <span className="eyebrow">{String(page).padStart(2, "0")} / {String(pageCount).padStart(2, "0")}</span>
              <button aria-label="Next page" disabled={page === pageCount} onClick={() => setPage((current) => current + 1)} type="button">→</button>
            </nav>
          )}
        </div>
      </div>
    </>
  );
}
