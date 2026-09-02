// 1. Icon in Dark Squircle (App Icon / Favicon / PWA)
export const SVG_ICON_DARK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <defs>
    <linearGradient id="sqBg" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#12131f" />
      <stop offset="100%" stop-color="#08080d" />
    </linearGradient>
    <linearGradient id="sqBorder" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.18" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.04" />
    </linearGradient>
    <linearGradient id="auricGradient" x1="20" y1="15" x2="80" y2="85" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#818cf8" />
      <stop offset="50%" stop-color="#c084fc" />
      <stop offset="100%" stop-color="#38bdf8" />
    </linearGradient>
    <linearGradient id="starGlow" x1="40" y1="12" x2="60" y2="32" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#c084fc" />
    </linearGradient>
    <filter id="auraGlow" x="15" y="5" width="70" height="85" filterUnits="userSpaceOnUse">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Squircle Base Canvas -->
  <rect x="2" y="2" width="96" height="96" rx="24" fill="url(#sqBg)" stroke="url(#sqBorder)" stroke-width="1.5" />

  <!-- Ambient Golden Ratio Aura Core -->
  <circle cx="50" cy="42" r="22" fill="#818cf8" opacity="0.18" filter="url(#auraGlow)" />

  <!-- The T-Apex Symbol (Vault & Top Structure) -->
  <!-- Horizontal Vault Beam with Golden Ratio Taper -->
  <path d="M 22 41 C 22 39 24 38 27 38 L 73 38 C 76 38 78 39 78 41 C 78 43.5 76 45 73 45 L 27 45 C 24 45 22 43.5 22 41 Z" fill="url(#auricGradient)" />

  <!-- Vertical Sanctuary Pillar -->
  <rect x="46" y="44" width="8" height="32" rx="4" fill="url(#auricGradient)" />

  <!-- Radiant Áurea Star (4-Point Hyperbolic Diamond) -->
  <path d="M 50 12 C 50 18 53.5 21.5 59.5 22 C 53.5 22.5 50 26 50 32 C 50 26 46.5 22.5 40.5 22 C 46.5 21.5 50 18 50 12 Z" fill="url(#starGlow)" />
  <circle cx="50" cy="22" r="1.5" fill="#ffffff" />
</svg>`;

// 2. Icon Transparent (Glyph only)
export const SVG_ICON_TRANSPARENT = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <defs>
    <linearGradient id="auricGlyph" x1="20" y1="12" x2="80" y2="76" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#818cf8" />
      <stop offset="50%" stop-color="#c084fc" />
      <stop offset="100%" stop-color="#38bdf8" />
    </linearGradient>
    <linearGradient id="starGlyph" x1="40" y1="12" x2="60" y2="32" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#c084fc" />
    </linearGradient>
  </defs>
  <!-- Beam -->
  <path d="M 22 41 C 22 39 24 38 27 38 L 73 38 C 76 38 78 39 78 41 C 78 43.5 76 45 73 45 L 27 45 C 24 45 22 43.5 22 41 Z" fill="url(#auricGlyph)" />
  <!-- Pillar -->
  <rect x="46" y="44" width="8" height="32" rx="4" fill="url(#auricGlyph)" />
  <!-- Star -->
  <path d="M 50 12 C 50 18 53.5 21.5 59.5 22 C 53.5 22.5 50 26 50 32 C 50 26 46.5 22.5 40.5 22 C 46.5 21.5 50 18 50 12 Z" fill="url(#starGlyph)" />
  <circle cx="50" cy="22" r="1.5" fill="#ffffff" />
</svg>`;

// 3. Full Wordmark Dark (Horizontal Logo for dark UI, 360x80)
export const SVG_WORDMARK_DARK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 80" fill="none">
  <defs>
    <linearGradient id="wmBg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#131422" />
      <stop offset="100%" stop-color="#08080d" />
    </linearGradient>
    <linearGradient id="wmBorder" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.16" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.04" />
    </linearGradient>
    <linearGradient id="wmGradient" x1="16" y1="12" x2="52" y2="52" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#818cf8" />
      <stop offset="50%" stop-color="#c084fc" />
      <stop offset="100%" stop-color="#38bdf8" />
    </linearGradient>
    <linearGradient id="starWm" x1="28" y1="12" x2="44" y2="28" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#c084fc" />
    </linearGradient>
  </defs>

  <!-- Left Icon Emblem -->
  <g transform="translate(8, 8)">
    <rect x="0" y="0" width="64" height="64" rx="18" fill="url(#wmBg)" stroke="url(#wmBorder)" stroke-width="1.2" />
    <path d="M 16 28 C 16 26.5 17.5 26 19.5 26 L 44.5 26 C 46.5 26 48 26.5 48 28 C 48 29.5 46.5 30.5 44.5 30.5 L 19.5 30.5 C 17.5 30.5 16 29.5 16 28 Z" fill="url(#wmGradient)" />
    <rect x="29" y="30" width="6" height="22" rx="3" fill="url(#wmGradient)" />
    <path d="M 32 10 C 32 14 34.5 16.5 38.5 17 C 34.5 17.5 32 20 32 24 C 32 20 29.5 17.5 25.5 17 C 29.5 16.5 32 14 32 10 Z" fill="url(#starWm)" />
    <circle cx="32" cy="17" r="1.2" fill="#ffffff" />
  </g>

  <!-- Typography: Topáurea -->
  <text x="86" y="47" font-family="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', 'Segoe UI', sans-serif" font-size="30" font-weight="800" fill="#ffffff" letter-spacing="-0.03em">Top<tspan fill="#818cf8" font-weight="700">áurea</tspan></text>

  <!-- Subtitle Badge -->
  <rect x="250" y="27" width="46" height="18" rx="4" fill="#6366f1" fill-opacity="0.15" stroke="#6366f1" stroke-opacity="0.3" stroke-width="1" />
  <text x="273" y="39.5" font-family="'JetBrains Mono', 'Fira Code', monospace" font-size="9" font-weight="700" fill="#a5b4fc" text-anchor="middle" letter-spacing="0.08em">VAULT</text>

  <!-- Tagline -->
  <text x="88" y="62" font-family="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', sans-serif" font-size="10.5" font-weight="500" fill="#94a3b8" letter-spacing="0.06em">SANTUARIO DE COSAS FAVORITAS</text>
</svg>`;

// 4. Compact Mobile Logo (Navbar mobile, 200x48)
export const SVG_MOBILE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 48" fill="none">
  <defs>
    <linearGradient id="mobBg" x1="0" y1="0" x2="38" y2="38" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#141524" />
      <stop offset="100%" stop-color="#09090e" />
    </linearGradient>
    <linearGradient id="mobGrad" x1="8" y1="6" x2="32" y2="32" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#818cf8" />
      <stop offset="100%" stop-color="#38bdf8" />
    </linearGradient>
  </defs>
  <!-- Mini Icon -->
  <g transform="translate(4, 5)">
    <rect x="0" y="0" width="38" height="38" rx="11" fill="url(#mobBg)" stroke="#ffffff" stroke-opacity="0.12" stroke-width="1" />
    <path d="M 10 17 L 28 17" stroke="url(#mobGrad)" stroke-width="3" stroke-linecap="round" />
    <path d="M 19 17 L 19 30" stroke="url(#mobGrad)" stroke-width="3" stroke-linecap="round" />
    <path d="M 19 7 C 19 9.5 20.5 11 23 11 C 20.5 11 19 12.5 19 15 C 19 12.5 17.5 11 15 11 C 17.5 11 19 9.5 19 7 Z" fill="#ffffff" />
  </g>
  <!-- Text -->
  <text x="50" y="31" font-family="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', sans-serif" font-size="21" font-weight="800" fill="#ffffff" letter-spacing="-0.02em">Top<tspan fill="#818cf8" font-weight="700">áurea</tspan></text>
</svg>`;

// 5. Monogram (Avatar / Social icon, 120x120)
export const SVG_MONOGRAM = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none">
  <defs>
    <linearGradient id="monoBg" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#141524" />
      <stop offset="100%" stop-color="#07070a" />
    </linearGradient>
    <linearGradient id="ringGrad" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#818cf8" stop-opacity="0.6" />
      <stop offset="50%" stop-color="#c084fc" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.6" />
    </linearGradient>
    <linearGradient id="coreGrad" x1="30" y1="20" x2="90" y2="100" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#818cf8" />
      <stop offset="50%" stop-color="#c084fc" />
      <stop offset="100%" stop-color="#38bdf8" />
    </linearGradient>
  </defs>
  <circle cx="60" cy="60" r="56" fill="url(#monoBg)" stroke="url(#ringGrad)" stroke-width="1.8" />
  <circle cx="60" cy="60" r="50" stroke="#ffffff" stroke-opacity="0.05" stroke-width="1" />
  <path d="M 28 50 C 28 47.5 30 46 34 46 L 86 46 C 90 46 92 47.5 92 50 C 92 52.5 90 54 86 54 L 34 54 C 30 54 28 52.5 28 50 Z" fill="url(#coreGrad)" />
  <rect x="55" y="52" width="10" height="38" rx="5" fill="url(#coreGrad)" />
  <path d="M 60 17 C 60 25 64 29 72 30 C 64 31 60 35 60 43 C 60 35 56 31 48 30 C 56 29 60 25 60 17 Z" fill="#ffffff" />
  <circle cx="60" cy="30" r="2" fill="#c084fc" />
</svg>`;

// 6. Monochrome Pure White
export const SVG_MONO_WHITE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <path d="M 22 41 C 22 39 24 38 27 38 L 73 38 C 76 38 78 39 78 41 C 78 43.5 76 45 73 45 L 27 45 C 24 45 22 43.5 22 41 Z" fill="#ffffff" />
  <rect x="46" y="44" width="8" height="32" rx="4" fill="#ffffff" />
  <path d="M 50 12 C 50 18 53.5 21.5 59.5 22 C 53.5 22.5 50 26 50 32 C 50 26 46.5 22.5 40.5 22 C 46.5 21.5 50 18 50 12 Z" fill="#ffffff" />
</svg>`;

// 7. Monochrome Pure Black
export const SVG_MONO_BLACK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <path d="M 22 41 C 22 39 24 38 27 38 L 73 38 C 76 38 78 39 78 41 C 78 43.5 76 45 73 45 L 27 45 C 24 45 22 43.5 22 41 Z" fill="#000000" />
  <rect x="46" y="44" width="8" height="32" rx="4" fill="#000000" />
  <path d="M 50 12 C 50 18 53.5 21.5 59.5 22 C 53.5 22.5 50 26 50 32 C 50 26 46.5 22.5 40.5 22 C 46.5 21.5 50 18 50 12 Z" fill="#000000" />
</svg>`;
