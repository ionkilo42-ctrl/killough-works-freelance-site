import type { FeaturedVisual } from "@/data/site";

import { BrandedImagePanel } from "@/components/branded-image-panel";

type FeaturedVisualCardProps = {
  item: FeaturedVisual;
};

export function FeaturedVisualCard({ item }: FeaturedVisualCardProps) {
  return (
    <article className="visual-card">
      <BrandedImagePanel imagePath={item.imagePath} title={item.title} category={item.category} />
      <div className="card-copy">
        <p className="card-kicker">{item.category}</p>
        <h3>{item.title}</h3>
        <p>{item.excerpt}</p>
        {item.cta ? <span className="card-cta">{item.cta}</span> : null}
      </div>
    </article>
  );
}
