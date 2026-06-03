"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import type { StarterFix } from "@/data/site";

type SampleFixGalleryProps = {
  items: StarterFix[];
};

export function SampleFixGallery({ items }: SampleFixGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (selectedIndex === null) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedIndex(null);
      }
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex]);

  const selectedItem = selectedIndex === null ? null : items[selectedIndex];

  return (
    <>
      <div className="category-grid sample-fix-grid">
        {items.map((item, index) => (
          <article className="category-card sample-fix-card" key={item.title}>
            <button
              type="button"
              className="sample-fix-trigger"
              onClick={() => setSelectedIndex(index)}
              aria-label={`View full image for ${item.title}`}
            >
              <div className="sample-fix-image-wrap">
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  width={1448}
                  height={1086}
                  className="sample-fix-image"
                  sizes="(max-width: 760px) 100vw, (max-width: 1080px) 50vw, 540px"
                />
              </div>
              <span className="sample-fix-expand-note">Click to expand</span>
            </button>
            <p className="panel-label">{item.label}</p>
            <h3>{item.title}</h3>
            <p className="sample-fix-explainer">{item.explanation}</p>
          </article>
        ))}
      </div>

      {selectedItem ? (
        <div
          className="sample-fix-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Expanded image for ${selectedItem.title}`}
          onClick={() => setSelectedIndex(null)}
        >
          <div
            className="sample-fix-lightbox-panel"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="sample-fix-lightbox-close"
              onClick={() => setSelectedIndex(null)}
              aria-label="Close full-screen image"
            >
              Close
            </button>
            <div className="sample-fix-lightbox-image-wrap">
              <Image
                src={selectedItem.imageSrc}
                alt={selectedItem.imageAlt}
                width={1448}
                height={1086}
                className="sample-fix-lightbox-image"
                sizes="100vw"
                priority
              />
            </div>
            <p className="sample-fix-lightbox-caption">{selectedItem.imageAlt}</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
