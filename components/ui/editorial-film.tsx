"use client";

import { useEffect, useState } from "react";

export function EditorialFilm() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  return (
    <>
      <button
        aria-label="Open the Serein Studio film"
        className="film-play"
        onClick={() => setIsOpen(true)}
        type="button"
      >
        <span aria-hidden="true">▶</span>
        <span className="eyebrow">Play our film</span>
      </button>
      {isOpen && (
        <div className="film-modal-layer">
          <button aria-label="Close film" className="film-modal-backdrop" onClick={() => setIsOpen(false)} type="button" />
          <section aria-label="Serein Studio short film" aria-modal="true" className="film-modal" role="dialog">
            <button aria-label="Close film" className="film-modal-close" onClick={() => setIsOpen(false)} type="button">×</button>
            <p className="eyebrow">Serein Studio presents</p>
            <h2 className="display-heading">The art of<br />slowing down.</h2>
            <p>Our first short film is in the making. A small ode to natural light, thoughtful craft, and the beauty of wearing something often.</p>
            <span className="eyebrow">A film coming soon · Autumn / Winter 2025</span>
          </section>
        </div>
      )}
    </>
  );
}
