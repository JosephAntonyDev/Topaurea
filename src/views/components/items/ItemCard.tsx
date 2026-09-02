import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Copy, Check, ChevronRight } from 'lucide-react';
import type { TopItem } from '../../../domain/models/TopItem';
import { RankPill } from '../ui/RankPill';
import { Badge } from '../ui/Badge';
import { ImageWithFallback } from '../ui/ImageWithFallback';

interface ItemCardProps {
  item: TopItem;
  onOpenDetail: (item: TopItem) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onCopyQuote: (quote: string, author: string, work: string) => void;
  hasCopied: boolean;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  item,
  onOpenDetail,
  isFavorite,
  onToggleFavorite,
  onCopyQuote,
  hasCopied
}) => {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col justify-between rounded-3xl glass-panel glass-panel-hover overflow-hidden border border-white/10"
      style={{
        boxShadow: `0 10px 30px -15px ${item.themeColor}20`
      }}
    >
      {/* Top Media / Portrait Button */}
      <button
        type="button"
        onClick={() => onOpenDetail(item)}
        aria-label={`Ver análisis completo de ${item.title}`}
        className="relative w-full aspect-[16/10] overflow-hidden text-left focus-visible:ring-2 focus-visible:ring-indigo-400 block"
      >
        <ImageWithFallback
          src={item.imageUrl}
          fallbackSrc={item.fallbackImageUrl}
          alt={item.title}
          themeColor={item.themeColor}
          title={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Ambient Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e14] via-transparent to-black/40" />

        {/* Big Watermark Rank Number */}
        <div className="absolute -bottom-6 right-4 text-7xl font-black font-mono text-white/[0.05] pointer-events-none select-none" aria-hidden="true">
          {item.isHonorary ? 'HONOR' : item.rank.toString().padStart(2, '0')}
        </div>
      </button>

      {/* Floating Rank and Favorite Bar */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
        <div className="pointer-events-auto">
          <RankPill rank={item.rank} isHonorary={item.isHonorary} />
        </div>
        
        {/* Favorite Button with 44x44px min touch target */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(item.id);
          }}
          title={isFavorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
          aria-label={isFavorite ? `Quitar a ${item.title} de mis favoritos` : `Agregar a ${item.title} a mis favoritos`}
          aria-pressed={isFavorite}
          className={`pointer-events-auto min-w-[44px] min-h-[44px] rounded-full backdrop-blur-md transition-all flex items-center justify-center focus-visible:ring-2 focus-visible:ring-rose-400 ${
            isFavorite
              ? 'bg-rose-500/25 text-rose-300 border border-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
              : 'bg-black/60 text-zinc-300 hover:text-white border border-white/20'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-400 text-rose-400' : ''}`} aria-hidden="true" />
        </button>
      </div>

      {/* Card Content Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          {/* Work / Origin & Title */}
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-indigo-300 font-semibold">
                {item.work}
              </span>
              {item.tier && (
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-zinc-300 border border-white/15">
                  TIER {item.tier}
                </span>
              )}
            </div>
            
            <button
              type="button"
              onClick={() => onOpenDetail(item)}
              aria-label={`Ver detalles de ${item.title}`}
              className="text-left text-xl sm:text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors mt-1 block focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-lg"
            >
              {item.title}
            </button>
            <p className="text-xs text-zinc-300 font-medium line-clamp-1">
              {item.subtitle}
            </p>
          </div>

          {/* Iconic Quote with high readability */}
          <div className="relative pl-3 py-2 border-l-2 border-indigo-400/80 bg-white/[0.03] rounded-r-xl">
            <p className="font-quote text-sm text-zinc-100 line-clamp-3 leading-relaxed">
              «{item.quote}»
            </p>
          </div>

          {/* Badges / Traits */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {item.badges.slice(0, 3).map((badge, idx) => (
              <Badge key={idx} variant="default" size="xs">
                {badge}
              </Badge>
            ))}
          </div>
        </div>

        {/* Footer Card Controls with 44px min touch targets */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => onCopyQuote(item.quote, item.title, item.work)}
            className="flex items-center gap-2 min-h-[44px] text-xs font-medium text-zinc-300 hover:text-white transition-colors py-2 px-3 rounded-xl hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-indigo-400"
            title="Copiar frase memorable"
            aria-label={`Copiar frase memorable de ${item.title}`}
          >
            {hasCopied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                <span className="text-emerald-300 font-semibold">Copiado</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" aria-hidden="true" />
                <span>Copiar frase</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => onOpenDetail(item)}
            className="flex items-center gap-1 min-h-[44px] text-xs sm:text-sm font-semibold text-indigo-300 hover:text-white transition-all py-2 px-3.5 rounded-xl hover:bg-indigo-500/20 focus-visible:ring-2 focus-visible:ring-indigo-400"
            aria-label={`Ver análisis completo de ${item.title}`}
          >
            <span>Ver análisis</span>
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </motion.article>
  );
};
