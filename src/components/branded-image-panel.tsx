"use client";

import { useEffect, useRef, useState } from "react";

type BrandedImagePanelProps = {
  imagePath?: string;
  title: string;
  category: string;
};

export function BrandedImagePanel({ imagePath, title, category }: BrandedImagePanelProps) {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    imagePath ? "loading" : "error",
  );

  useEffect(() => {
    if (!imagePath) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    const image = imageRef.current;
    if (!image) {
      return;
    }

    let cancelled = false;
    const markLoaded = () => {
      if (!cancelled) {
        setStatus("loaded");
      }
    };
    const markError = () => {
      if (!cancelled) {
        setStatus("error");
      }
    };

    if (image.complete && image.naturalWidth > 0) {
      markLoaded();
    } else {
      image.addEventListener("load", markLoaded);
      image.addEventListener("error", markError);
      image.decode?.().then(markLoaded).catch(() => {
        if (image.complete && image.naturalWidth === 0) {
          markError();
        }
      });
    }

    return () => {
      cancelled = true;
      image.removeEventListener("load", markLoaded);
      image.removeEventListener("error", markError);
    };
  }, [imagePath]);

  const showImage = status === "loaded";
  const showFallback = status !== "loaded";

  return (
    <div className="branded-image-panel">
      {showFallback ? (
        <div className="image-fallback" role="img" aria-label={title}>
          <span className="image-fallback-label">{category}</span>
          <strong>{title}</strong>
        </div>
      ) : null}

      {showImage ? (
        <img className="image-panel-media is-visible" src={imagePath} alt={title} />
      ) : imagePath ? (
        <img
          ref={imageRef}
          className="image-panel-media"
          src={imagePath}
          alt={title}
          aria-hidden="true"
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
        />
      ) : null}
    </div>
  );
}
