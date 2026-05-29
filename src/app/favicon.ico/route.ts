const faviconSvg = `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="64" height="64" rx="12" fill="#081A2A"/>
  <rect x="4" y="4" width="56" height="56" rx="10" stroke="rgba(223,204,170,0.26)" stroke-width="1"/>
  <circle cx="32" cy="32" r="22.5" stroke="#DFCCAA" stroke-width="1.8"/>
  <circle cx="32" cy="32" r="17.5" stroke="rgba(156,205,196,0.22)" stroke-width="1" stroke-dasharray="2.6 2.6"/>
  <path d="M32 8.5V16.5" stroke="#DFCCAA" stroke-width="1.2"/>
  <path d="M8.5 32H15.5" stroke="#DFCCAA" stroke-width="1.2"/>
  <path d="M48.5 32H55.5" stroke="#DFCCAA" stroke-width="1.2"/>
  <path d="M32 49V55.5" stroke="rgba(223,204,170,0.6)" stroke-width="1"/>
  <text x="22" y="31" fill="#F2E7D4" font-size="25" font-family="Georgia, 'Times New Roman', serif" font-weight="700">K</text>
  <text x="28" y="44" fill="#F2E7D4" font-size="21" font-family="Georgia, 'Times New Roman', serif" font-weight="700">W</text>
  <path d="M32 10V15.5" stroke="#F2E7D4" stroke-width="1"/>
  <path d="M29.25 12.75H34.75" stroke="#F2E7D4" stroke-width="1"/>
</svg>`;

export function GET() {
  return new Response(faviconSvg, {
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Type": "image/svg+xml",
    },
  });
}
