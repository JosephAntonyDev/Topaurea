import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Quote, Heart, Copy, Check, Music, Sparkles, Shield, Compass } from 'lucide-react';
import type { TopItem } from '../../../domain/models/TopItem';
import { RankPill } from '../ui/RankPill';
import { Badge } from '../ui/Badge';
import { StatBar } from '../ui/StatBar';
import { ImageWithFallback } from '../ui/ImageWithFallback';

interface ItemDetailModalProps {
  item: TopItem | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onCopyQuote: (quote: string, author: string, work: string) => void;
  hasCopiedQuote: boolean;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  onClose,
  isFavorite,
  onToggleFavorite,
  onCopyQuote,
  hasCopiedQuote
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (item) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      // Autofocus close button for keyboard accessibility
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl transition-all"
          aria-hidden="true"
        />

        {/* Modal Window with Accessible Dialog Roles */}
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="detail-modal-title"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl glass-panel rounded-3xl border border-white/15 overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.9)] z-10 my-auto"
        >
          {/* Top Bar Actions */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
            <button
              type="button"
              onClick={() => onToggleFavorite(item.id)}
              className={`min-w-[44px] min-h-[44px] rounded-full backdrop-blur-md transition-all flex items-center justify-center focus-visible:ring-2 focus-visible:ring-rose-400 ${
                isFavorite
                  ? 'bg-rose-500/25 text-rose-300 border border-rose-500/50'
                  : 'bg-black/60 text-zinc-300 hover:text-white border border-white/20'
              }`}
              title={isFavorite ? 'En favoritos' : 'Añadir a favoritos'}
              aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
              aria-pressed={isFavorite}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-400 text-rose-400' : ''}`} aria-hidden="true" />
            </button>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Cerrar ventana de detalles (Escape)"
              className="min-w-[44px] min-h-[44px] rounded-full bg-black/60 text-zinc-300 hover:text-white border border-white/20 backdrop-blur-md transition-all flex items-center justify-center focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
            {/* Left Header Image */}
            <div className="md:col-span-5 relative min-h-[260px] md:min-h-full">
              <ImageWithFallback
                src={item.imageUrl}
                fallbackSrc={item.fallbackImageUrl}
                alt={item.title}
                themeColor={item.themeColor}
                title={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/85 via-black/30 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 space-y-2 z-10">
                <RankPill rank={item.rank} isHonorary={item.isHonorary} />
                <h2 id="detail-modal-title" className="text-white font-black text-2xl drop-shadow-md">
                  {item.title}
                </h2>
                <div className="text-xs text-indigo-300 font-mono drop-shadow">
                  {item.work}
                </div>
              </div>
            </div>

            {/* Right Information Details */}
            <div className="md:col-span-7 p-6 sm:p-8 space-y-6">
              {/* Header Badges */}
              <div className="flex flex-wrap items-center gap-2">
                {item.alignment && (
                  <Badge variant="accent">
                    <Compass className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{item.alignment}</span>
                  </Badge>
                )}
                {item.tier && (
                  <Badge variant="outline" className="font-mono">
                    Tier {item.tier}
                  </Badge>
                )}
              </div>

              {/* Iconic Quote with Copy */}
              <div className="relative p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-indigo-300">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-semibold">
                    <Quote className="w-4 h-4 text-indigo-400" aria-hidden="true" />
                    <span>Frase Memorable</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onCopyQuote(item.quote, item.title, item.work)}
                    aria-label="Copiar esta cita al portapapeles"
                    className="flex items-center gap-1.5 min-h-[36px] text-xs font-medium text-zinc-200 hover:text-white transition-colors px-2.5 py-1.5 rounded-lg hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-indigo-400"
                  >
                    {hasCopiedQuote ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                        <span className="text-emerald-300 font-semibold">Copiada</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" aria-hidden="true" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>
                <blockquote className="font-quote text-base sm:text-lg text-zinc-100 italic leading-relaxed">
                  «{item.quote}»
                </blockquote>
                {item.quoteContext && (
                  <p className="text-xs text-zinc-300 font-mono">
                    — {item.quoteContext}
                  </p>
                )}
              </div>

              {/* Personal Reflection / Why Favorite */}
              <div className="space-y-2">
                <div className="text-xs uppercase font-mono tracking-wider text-zinc-300 font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-400" aria-hidden="true" />
                  <span>Por qué ocupa este puesto en mi Top</span>
                </div>
                <p className="text-sm text-zinc-200 leading-relaxed bg-black/30 p-4 rounded-2xl border border-white/10">
                  {item.whyFavorite}
                </p>
              </div>

              {/* Personality Traits */}
              {item.personalityTraits && item.personalityTraits.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold block">
                    Rasgos & Arquetipo
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.personalityTraits.map((trait, idx) => (
                      <Badge key={idx} variant="default" size="xs">
                        <Shield className="w-3 h-3 text-zinc-300" aria-hidden="true" />
                        {trait}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Stats: Impact, Depth, Aura */}
              {item.stats && (
                <div className="space-y-3 pt-2 border-t border-white/10">
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold block">
                    Métricas de Resonancia
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4">
                    <StatBar label="Impacto" value={item.stats.impact} color="#6366f1" />
                    <StatBar label="Profundidad" value={item.stats.depth} color="#a855f7" />
                    <StatBar label="Aura" value={item.stats.aura} color="#ec4899" />
                  </div>
                </div>
              )}

              {/* Vibe Song */}
              {item.vibeSong && (
                <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center border border-pink-500/30">
                      <Music className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">
                        {item.vibeSong.title}
                      </div>
                      <div className="text-xs text-zinc-300">
                        {item.vibeSong.artist}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-300 px-2 py-1 rounded bg-white/10">
                    Soundtrack
                  </span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
