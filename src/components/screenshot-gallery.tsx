"use client";

import { useEffect, useState } from "react";

const screens = [
  { id: "library", label: "Plan library", file: "plan-library", description: "Search and manage approved product context across an evolving portfolio." },
  { id: "new-plan", label: "New Plan", file: "new-plan", description: "Start from a product outcome and let the Plan agent establish the first artifact set." },
  { id: "workspace", label: "Design workspace", file: "design-workspace", description: "Review documents and realistic interactive screens in one focused workspace." },
  { id: "activity", label: "Live Codex activity", file: "live-codex", description: "See what Codex is doing, interrupt safely, and handle approval requests in context." },
  { id: "comments", label: "Element comments", file: "comments", description: "Select a design element, anchor feedback, and carry it into the next candidate revision." },
] as const;

export function ScreenshotGallery() {
  const [active, setActive] = useState(2);
  const [paused, setPaused] = useState(false);
  const screen = screens[active];

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % screens.length), 6500);
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <div className="mosaic-gallery" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div aria-label="Product screenshots" className="mosaic-gallery-tabs" role="tablist">
        {screens.map((item, index) => (
          <button
            aria-controls="mosaic-gallery-panel"
            aria-selected={index === active}
            className={index === active ? "is-active" : ""}
            id={`gallery-tab-${item.id}`}
            key={item.id}
            onClick={() => setActive(index)}
            onFocus={() => setPaused(true)}
            role="tab"
            tabIndex={index === active ? 0 : -1}
            type="button"
          >
            <span>{String(index + 1).padStart(2, "0")}</span>{item.label}
          </button>
        ))}
      </div>
      <div
        aria-labelledby={`gallery-tab-${screen.id}`}
        className="mosaic-gallery-panel"
        id="mosaic-gallery-panel"
        role="tabpanel"
      >
        <div className="mosaic-window mosaic-gallery-window">
          <div className="mosaic-window-bar"><i /><i /><i /><span>{screen.label}</span></div>
          <picture key={screen.id}>
            <source srcSet={`/product/${screen.file}.avif`} type="image/avif" />
            <source srcSet={`/product/${screen.file}.webp`} type="image/webp" />
            <img alt={`${screen.label} in Mosaic Plan Studio`} height="1502" loading="lazy" src={`/product/${screen.file}.webp`} width="2400" />
          </picture>
        </div>
        <p aria-live="polite">{screen.description}</p>
      </div>
    </div>
  );
}
