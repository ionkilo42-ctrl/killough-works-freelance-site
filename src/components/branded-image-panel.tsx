"use client";

import { useState } from "react";

type BrandedImagePanelProps = {
  imagePath?: string;
  title: string;
  category: string;
};

export function BrandedImagePanel({ imagePath, title, category }: BrandedImagePanelProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    imagePath ? "loading" : "error",
  );

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
