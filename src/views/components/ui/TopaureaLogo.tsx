import React from 'react';

interface TopaureaLogoProps {
  variant?: 'icon' | 'wordmark' | 'compact' | 'monogram' | 'glyph';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBadge?: boolean;
}

export const TopaureaLogo: React.FC<TopaureaLogoProps> = ({
  variant = 'wordmark',
  className = '',
  size = 'md',
  showBadge = true
}) => {
  // Dimension maps
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20'
  };

  // Pure SVG Glyph (The T-Sanctuary & Áurea Star)
  const renderGlyph = (width: number | string = 100, height: number | string = 100) => (
    <svg
      viewBox="0 0 100 100"
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="topaurea-auric" x1="20" y1="12" x2="80" y2="76" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="50%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>
        <linearGradient id="topaurea-star" x1="40" y1="12" x2="60" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#c084fc" />
        </linearGradient>
      </defs>

      {/* The Horizontal Vault Beam */}
      <path
        d="M 22 41 C 22 39 24 38 27 38 L 73 38 C 76 38 78 39 78 41 C 78 43.5 76 45 73 45 L 27 45 C 24 45 22 43.5 22 41 Z"
        fill="url(#topaurea-auric)"
      />

      {/* The Vertical Sanctuary Pillar */}
      <rect x="46" y="44" width="8" height="32" rx="4" fill="url(#topaurea-auric)" />

      {/* The Radiant Áurea Star (4-Point Hyperbolic Diamond) */}
      <path
        d="M 50 12 C 50 18 53.5 21.5 59.5 22 C 53.5 22.5 50 26 50 32 C 50 26 46.5 22.5 40.5 22 C 46.5 21.5 50 18 50 12 Z"
        fill="url(#topaurea-star)"
      />
      <circle cx="50" cy="22" r="1.5" fill="#ffffff" />
    </svg>
  );

  // 1. Pure Icon in Dark Squircle
  if (variant === 'icon') {
    return (
      <div
        className={`relative rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#141525] to-[#08080d] border border-white/15 p-1 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.25)] ${iconSizes[size]} ${className}`}
        aria-label="Logo Topáurea"
      >
        <div className="w-full h-full flex items-center justify-center">
          {renderGlyph('100%', '100%')}
        </div>
      </div>
    );
  }

  // 2. Pure Glyph (Without squircle container)
  if (variant === 'glyph') {
    return (
      <div className={`flex items-center justify-center ${iconSizes[size]} ${className}`}>
        {renderGlyph('100%', '100%')}
      </div>
    );
  }

  // 3. Monogram / Avatar (Circular with golden ratio border)
  if (variant === 'monogram') {
    return (
      <div
        className={`relative rounded-full bg-gradient-to-br from-[#161729] via-[#0b0b12] to-[#050508] border border-indigo-400/40 p-2 flex items-center justify-center shadow-[0_0_25px_rgba(129,140,248,0.3)] ${iconSizes[size]} ${className}`}
      >
        <div className="w-full h-full flex items-center justify-center">
          {renderGlyph('100%', '100%')}
        </div>
      </div>
    );
  }

  // 4. Compact Navbar version (mobile friendly)
  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-2.5 ${className}`}>
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#141525] to-[#08080d] border border-white/15 p-1 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.2)]">
          {renderGlyph('100%', '100%')}
        </div>
        <span className="font-extrabold tracking-tight text-white text-base">
          Top<span className="text-indigo-400">áurea</span>
        </span>
      </div>
    );
  }

  // 5. Full Wordmark (Default Horizontal)
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <div className={`${iconSizes[size]} rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#141525] to-[#08080d] border border-white/15 p-1.5 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.25)]`}>
        {renderGlyph('100%', '100%')}
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="font-extrabold tracking-tight text-white text-lg sm:text-xl">
            Top<span className="text-indigo-400">áurea</span>
          </span>
          {showBadge && (
            <span className="text-[10px] sm:text-xs uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              VAULT
            </span>
          )}
        </div>
        <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 hidden sm:block">
          Santuario de Cosas Favoritas
        </span>
      </div>
    </div>
  );
};
