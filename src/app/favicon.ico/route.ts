const faviconSvg = `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="2" y="2" width="60" height="60" rx="12" fill="#9a3412"/>
  <rect x="4" y="4" width="56" height="56" rx="10" fill="#c2410c"/>
  <rect x="7" y="7" width="50" height="50" rx="8" fill="none" stroke="rgba(255,247,237,0.22)" stroke-width="1"/>
  <text x="32" y="40" text-anchor="middle" fill="#fff7ed" font-size="28" font-family="Georgia, 'Times New Roman', serif" font-weight="700" letter-spacing="-1">KW</text>
</svg>`;

export function GET() {
  return new Response(faviconSvg, {
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Type": "image/svg+xml",
    },
  });
}
