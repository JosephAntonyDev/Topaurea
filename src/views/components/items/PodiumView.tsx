import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Sparkles, ChevronRight } from 'lucide-react';
import type { TopItem } from '../../../domain/models/TopItem';
import { ImageWithFallback } from '../ui/ImageWithFallback';
import { Badge } from '../ui/Badge';
import { RankPill } from '../ui/RankPill';

interface PodiumViewProps {
  items: TopItem[];
  onOpenDetail: (item: TopItem) => void;
}

export const PodiumView: React.FC<PodiumViewProps> = ({ items, onOpenDetail }) => {
  const top1 = items.find((i) => i.rank === 1 && !i.isHonorary);
  const top2 = items.find((i) => i.rank === 2 && !i.isHonorary);
  const top3 = items.find((i) => i.rank === 3 && !i.isHonorary);
  const remaining = items.filter((i) => i.rank > 3 || i.isHonorary);

  return (
    <div className="space-y-10 py-4">
      {/* 3D-Like Olympic Podium with Accessible Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end max-w-5xl mx-auto">
        {/* RANK #2 (Silver) */}
        {top2 && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onClick={() => onOpenDetail(top2)}
            aria-label={`Puesto 2 de plata: ${top2.title}. Clic para ver análisis completo.`}
            className="order-2 md:order-1 w-full glass-panel rounded-3xl p-5 border border-slate-400/40 flex flex-col items-center text-center cursor-pointer hover:border-slate-300 transition-all shadow-[0_15px_30px_rgba(0,0,0,0.5)] focus-visible:ring-2 focus-visible:ring-slate-300"
          >
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden mb-4 border-2 border-slate-300/70 shadow-[0_0_20px_rgba(203,213,225,0.3)]">
              <ImageWithFallback
                src={top2.imageUrl}
                fallbackSrc={top2.fallbackImageUrl}
                alt={top2.title}
                themeColor={top2.themeColor}
                title={top2.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mb-2">
              <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-slate-300/25 text-slate-100 border border-slate-300/50">
                <Sparkles className="w-4 h-4 text-slate-200" aria-hidden="true" />
                <span>PLATA #02</span>
              </div>
            </div>
            <h3 className="font-bold text-lg text-white">{top2.title}</h3>
            <span className="text-xs text-zinc-300 font-mono">{top2.work}</span>
            <p className="mt-3 font-quote text-xs text-zinc-200 line-clamp-2 italic">
              «{top2.quote}»
            </p>
            <div className="w-full mt-4 pt-3 border-t border-white/10 text-xs text-indigo-300 font-semibold flex items-center justify-center gap-1">
              <span>Explorar</span>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </div>
          </motion.button>
        )}

        {/* RANK #1 (Gold - Center & Elevated) */}
        {top1 && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => onOpenDetail(top1)}
            aria-label={`Puesto 1 de oro supremo: ${top1.title}. Clic para ver análisis completo.`}
            className="order-1 md:order-2 w-full glass-panel rounded-3xl p-6 border-2 border-amber-400/60 flex flex-col items-center text-center cursor-pointer hover:border-amber-300 transition-all shadow-[0_0_40px_rgba(251,191,36,0.25)] md:-translate-y-6 relative overflow-hidden focus-visible:ring-2 focus-visible:ring-amber-300"
          >
            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500" aria-hidden="true" />

            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-3xl overflow-hidden mb-4 border-2 border-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.4)]">
              <ImageWithFallback
                src={top1.imageUrl}
                fallbackSrc={top1.fallbackImageUrl}
                alt={top1.title}
                themeColor={top1.themeColor}
                title={top1.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mb-2">
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black bg-amber-400/30 text-amber-200 border border-amber-400/70 shadow-[0_0_20px_rgba(251,191,36,0.35)]">
                <Crown className="w-4 h-4 fill-amber-300 text-amber-300" aria-hidden="true" />
                <span className="tracking-wider">ORO ABSOLUTO #01</span>
              </div>
            </div>
            <h3 className="font-extrabold text-xl sm:text-2xl text-white">{top1.title}</h3>
            <span className="text-xs text-indigo-300 font-mono font-semibold">{top1.work}</span>
            <p className="mt-3 font-quote text-sm text-zinc-100 line-clamp-3 italic">
              «{top1.quote}»
            </p>
            <div className="w-full mt-5 pt-3 border-t border-amber-400/30 text-xs text-amber-200 font-bold flex items-center justify-center gap-1">
              <span>Ver análisis del Campeón</span>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </div>
          </motion.button>
        )}

        {/* RANK #3 (Bronze) */}
        {top3 && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => onOpenDetail(top3)}
            aria-label={`Puesto 3 de bronce: ${top3.title}. Clic para ver análisis completo.`}
            className="order-3 w-full glass-panel rounded-3xl p-5 border border-amber-700/50 flex flex-col items-center text-center cursor-pointer hover:border-amber-600 transition-all shadow-[0_15px_30px_rgba(0,0,0,0.5)] focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden mb-4 border-2 border-amber-600/70 shadow-[0_0_20px_rgba(217,119,6,0.3)]">
              <ImageWithFallback
                src={top3.imageUrl}
                fallbackSrc={top3.fallbackImageUrl}
                alt={top3.title}
                themeColor={top3.themeColor}
                title={top3.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mb-2">
              <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-700/30 text-amber-200 border border-amber-600/50">
                <Sparkles className="w-4 h-4 text-amber-400" aria-hidden="true" />
                <span>BRONCE #03</span>
              </div>
            </div>
            <h3 className="font-bold text-lg text-white">{top3.title}</h3>
            <span className="text-xs text-zinc-300 font-mono">{top3.work}</span>
            <p className="mt-3 font-quote text-xs text-zinc-200 line-clamp-2 italic">
              «{top3.quote}»
            </p>
            <div className="w-full mt-4 pt-3 border-t border-white/10 text-xs text-indigo-300 font-semibold flex items-center justify-center gap-1">
              <span>Explorar</span>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </div>
          </motion.button>
        )}
      </div>

      {/* Ranks 04 - 10 + Honorary */}
      {remaining.length > 0 && (
        <div className="max-w-4xl mx-auto space-y-3 pt-4">
          <div className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold px-2">
            Ranks Clasificados & Menciones
          </div>

          <div className="space-y-2">
            {remaining.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => onOpenDetail(item)}
                aria-label={`Puesto ${item.rank}: ${item.title} (${item.work}). Ver análisis.`}
                className="w-full glass-panel rounded-2xl p-4 border border-white/10 flex items-center justify-between gap-4 text-left hover:border-white/20 transition-all focus-visible:ring-2 focus-visible:ring-indigo-400"
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <RankPill rank={item.rank} isHonorary={item.isHonorary} size="sm" />
                  <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-white/15">
                    <ImageWithFallback
                      src={item.imageUrl}
                      fallbackSrc={item.fallbackImageUrl}
                      alt={item.title}
                      themeColor={item.themeColor}
                      title={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm sm:text-base font-bold text-white truncate">
                        {item.title}
                      </h4>
                      <span className="text-xs text-indigo-300 font-mono hidden sm:inline">
                        • {item.work}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-300 line-clamp-1 font-quote italic">
                      «{item.quote}»
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="hidden md:flex gap-1.5">
                    {item.badges.slice(0, 2).map((b, idx) => (
                      <Badge key={idx} size="xs">
                        {b}
                      </Badge>
                    ))}
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-400" aria-hidden="true" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
