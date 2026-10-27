"use client";

import { useState } from "react";

const testimonials = [
  {
    quote: "The kind of clothes you reach for without thinking — and feel entirely yourself in all day.",
    author: "Anna R.",
    detail: "Verified customer · Linen collection",
  },
  {
    quote: "Beautifully considered in every way. The fabric, the fit, the quiet confidence of it.",
    author: "Milan S.",
    detail: "Verified customer · Everyday edit",
  },
  {
    quote: "Fewer things, worn more. Serein somehow made getting dressed feel simple again.",
    author: "Clara W.",
    detail: "Verified customer · Studio essentials",
  },
];

export function TestimonialSlider() {
  const [active, setActive] = useState(0);
  const previous = () => setActive((index) => (index + testimonials.length - 1) % testimonials.length);
  const next = () => setActive((index) => (index + 1) % testimonials.length);
  const testimonial = testimonials[active];

  return (
    <div aria-roledescription="carousel" className="testimonial-slider">
      <div aria-live="polite" className="testimonial-copy">
        <span className="quote-mark" aria-hidden="true">“</span>
        <blockquote>
          <p>{testimonial.quote}</p>
          <footer>
            <strong>{testimonial.author}</strong>
            <span>{testimonial.detail}</span>
          </footer>
        </blockquote>
      </div>
      <div className="testimonial-controls">
        <button aria-label="Previous testimonial" onClick={previous} type="button">←</button>
        <span className="eyebrow">0{active + 1} <span aria-hidden="true">/</span> 0{testimonials.length}</span>
        <button aria-label="Next testimonial" onClick={next} type="button">→</button>
      </div>
    </div>
  );
}
