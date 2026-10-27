"use client";

import useEmblaCarousel from "embla-carousel-react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ui/product-card";

export function ProductCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  });

  return (
    <div className="product-carousel">
      <div aria-label="Trending products" className="embla-viewport" ref={emblaRef}>
        <div className="embla-container">
          {products.slice(0, 5).map((product) => (
            <div className="embla-slide" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
      <div className="carousel-controls">
        <span className="eyebrow">Drag to discover</span>
        <div>
          <button aria-label="Previous products" onClick={() => emblaApi?.scrollPrev()} type="button">←</button>
          <button aria-label="Next products" onClick={() => emblaApi?.scrollNext()} type="button">→</button>
        </div>
      </div>
    </div>
  );
}
