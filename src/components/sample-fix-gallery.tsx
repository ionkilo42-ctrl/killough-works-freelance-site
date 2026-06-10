"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import type { StarterFix } from "@/data/site";

type SampleFixGalleryProps = {
  items: StarterFix[];
  variant?: "gallery" | "compact" | "editorial" | "preview";
};

function SampleFixLightbox({
  item,
  onClose,
}: {
  item: StarterFix;
  onClose: () => void;
}) {
  return (
    <div
      className="sample-fix-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`Expanded image for ${item.title}`}
      onClick={onClose}
    >
      <div className="sample-fix-lightbox-panel" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          className="sample-fix-lightbox-close"
          onClick={onClose}
          aria-label="Close full-screen image"
        >
          Close
        </button>
        <div className="sample-fix-lightbox-image-wrap">
          <Image
            src={item.imageSrc}
            alt={item.imageAlt}
            width={1448}
            height={1086}
            className="sample-fix-lightbox-image"
            sizes="100vw"
            priority
          />
        </div>
        <p className="sample-fix-lightbox-caption">{item.imageAlt}</p>
      </div>
    </div>
  );
}

export function SampleFixGallery({ items, variant = "gallery" }: SampleFixGalleryProps) {
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

  if (variant === "preview") {
    return (
      <>
        <ul className="study-preview-list">
          {items.map((item, index) => (
            <li key={item.title}>
              <button
                type="button"
                className="study-preview-card"
                onClick={() => setSelectedIndex(index)}
                aria-label={`View design study for ${item.title}`}
              >
                <span className="study-preview-media">
                  <Image
                    src={item.imageSrc}
                    alt=""
                    width={1448}
                    height={1086}
                    className="study-preview-image"
                    sizes="(max-width: 680px) 100vw, 680px"
                  />
                </span>
                <span className="study-preview-copy">
                  <span className="study-preview-title">{item.title}</span>
                  <span className="study-preview-summary">{item.explanation}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>

        {selectedItem ? <SampleFixLightbox item={selectedItem} onClose={() => setSelectedIndex(null)} /> : null}
      </>
    );
  }

  if (variant === "editorial") {
    return (
      <>
        <ul className="work-entry-list">
          {items.map((item, index) => (
            <li key={item.title}>
              <article className="work-entry">
                <button
                  type="button"
                  className="work-entry-media"
                  onClick={() => setSelectedIndex(index)}
                  aria-label={`View design study for ${item.title}`}
                >
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    width={1448}
                    height={1086}
                    className="work-entry-image"
                    sizes="(max-width: 680px) 100vw, 680px"
                  />
                </button>
                <div className="work-entry-body">
                  <p className="work-entry-eyebrow">{item.label}</p>
                  <h3 className="work-entry-title">{item.title}</h3>
                  <p className="work-entry-summary">{item.explanation}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>

        {selectedItem ? <SampleFixLightbox item={selectedItem} onClose={() => setSelectedIndex(null)} /> : null}
      </>
    );
  }

  if (variant === "compact") {
    return (
      <>
        <ul className="work-sample-list">
          {items.map((item, index) => (
            <li key={item.title}>
              <button
                type="button"
                className="work-sample-row"
                onClick={() => setSelectedIndex(index)}
                aria-label={`View design study for ${item.title}`}
              >
                <span className="work-sample-thumb-wrap">
                  <Image
                    src={item.imageSrc}
                    alt=""
                    width={1448}
                    height={1086}
                    className="work-sample-thumb"
                    sizes="96px"
                  />
                </span>
                <span className="work-sample-copy">
                  <span className="work-sample-label">{item.label}</span>
                  <span className="work-sample-title">{item.title}</span>
                  <span className="work-sample-explainer">{item.explanation}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>

        {selectedItem ? <SampleFixLightbox item={selectedItem} onClose={() => setSelectedIndex(null)} /> : null}
      </>
    );
  }

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

      {selectedItem ? <SampleFixLightbox item={selectedItem} onClose={() => setSelectedIndex(null)} /> : null}
    </>
  );
}