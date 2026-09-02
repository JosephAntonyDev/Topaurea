import React from 'react';
import { Crown, Quote, Sparkles, Music2, ArrowUpRight } from 'lucide-react';
import type { TopItem } from '../../../domain/models/TopItem';
import { RankPill } from '../ui/RankPill';
import { Badge } from '../ui/Badge';
import { ImageWithFallback } from '../ui/ImageWithFallback';

interface HeroSpotlightProps {
  item: TopItem | null;
  onOpenDetail: (item: TopItem) => void;
}

export const HeroSpotlight: React.FC<HeroSpotlightProps> = ({ item, onOpenDetail }) => {
  if (!item) return null;

  return (
    <section aria-label="Elemento destacado número 1" className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 pt-4 sm:pt-8 pb-8 sm:pb-12 overflow-hidden">
      {/* Dynamic Ambient Background Glow */}
      <div
        className="ambient-glow -top-32 -left-32 w-[550px] h-[550px]"
        style={{
          background: `radial-gradient(circle, ${item.themeColor} 0%, transparent 70%)`,
          opacity: 0.18
        }}
        aria-hidden="true"
      />
      <div
        className="ambient-glow -bottom-32 -right-32 w-[500px] h-[500px]"
        style={{
          background: `radial-gradient(circle, #818cf8 0%, transparent 70%)`,
          opacity: 0.15
        }}
        aria-hidden="true"
      />

      {/* Hero Container */}
      <div className="relative glass-panel rounded-3xl p-5 sm:p-10 border border-white/10 overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          {/* Left Column: Editorial Information */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <RankPill rank={item.rank} isHonorary={item.isHonorary} />
              <Badge variant="accent">
                <Crown className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" />
                <span>Cúspide de la Lista</span>
              </Badge>
              {item.tier && (
                <Badge variant="outline" className="font-mono text-zinc-300">
                  TIER {item.tier}
                </Badge>
              )}
            </div>

            <div className="space-y-2">
              <div className="text-xs font-mono tracking-wider text-indigo-300 uppercase font-semibold">
                {item.work}
              </div>
              <h1 className="text-2xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                {item.title}
              </h1>
              <p className="text-sm sm:text-base text-zinc-300 font-medium">
                {item.subtitle}
              </p>
            </div>

            {/* Iconic Quote Callout with High Contrast */}
            <div className="relative pl-5 py-2.5 border-l-2 border-indigo-400 bg-gradient-to-r from-indigo-950/40 to-transparent rounded-r-2xl">
              <Quote className="w-6 h-6 text-indigo-400 mb-2" aria-hidden="true" />
              <blockquote className="font-quote text-base sm:text-2xl text-zinc-100 font-light leading-snug">
                «{item.quote}»
              </blockquote>
              {item.quoteContext && (
                <p className="mt-2 text-xs text-zinc-300 font-mono">
                  — {item.quoteContext}
                </p>
              )}
            </div>

            {/* Badges & Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {item.badges.map((badge, idx) => (
                <Badge key={idx} variant="default" size="sm" color={item.themeColor}>
                  <Sparkles className="w-3.5 h-3.5 opacity-80" aria-hidden="true" />
                  {badge}
                </Badge>
              ))}
              {item.vibeSong && (
                <Badge variant="outline" size="sm">
                  <Music2 className="w-3.5 h-3.5 text-pink-400" aria-hidden="true" />
                  <span className="text-zinc-200">{item.vibeSong.title}</span>
                </Badge>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => onOpenDetail(item)}
                className="flex items-center gap-2 min-h-[44px] px-6 py-2.5 rounded-2xl bg-white text-zinc-950 font-semibold text-sm hover:bg-zinc-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-indigo-400"
                aria-label={`Explorar análisis completo y filosofía de ${item.title}`}
              >
                <span>Explorar Filosofía & Razones</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <div className="text-xs text-zinc-400 max-w-xs leading-relaxed">
                Posición #1 inmutable. Máxima puntuación de impacto personal.
              </div>
            </div>
          </div>

          {/* Right Column: Hero Artwork Card - Accessible Button */}
          <div className="lg:col-span-5 flex justify-center">
            <button
              type="button"
              onClick={() => onOpenDetail(item)}
              aria-label={`Ver ficha y detalles de ${item.title}`}
              className="group relative w-full max-w-sm sm:max-w-md aspect-[16/10] sm:aspect-[4/5] rounded-3xl overflow-hidden glass-panel border border-white/15 text-left focus-visible:ring-2 focus-visible:ring-indigo-400 transition-transform"
            >
              <ImageWithFallback
                src={item.imageUrl}
                fallbackSrc={item.fallbackImageUrl}
                alt={item.title}
                themeColor={item.themeColor}
                title={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />

              {/* Floating Bottom Card Info */}
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-300">
                    Aura Dominante
                  </span>
                  <div
                    className="w-3 h-3 rounded-full shadow-[0_0_10px_currentColor]"
                    style={{ color: item.themeColor, backgroundColor: item.themeColor }}
                    aria-hidden="true"
                  />
                </div>
                <div className="text-lg sm:text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {item.title}
                </div>
                <p className="text-xs text-zinc-200 line-clamp-2 leading-relaxed">
                  {item.whyFavorite}
                </p>
              </div>

              {/* Top Right Aura Tag */}
              <div className="absolute top-4 right-4">
                <div className="px-3 py-1 rounded-full text-xs font-mono font-medium backdrop-blur-md bg-black/70 text-white border border-white/20">
                  {item.alignment || 'Top 1 Indiscutible'}
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
