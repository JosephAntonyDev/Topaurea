import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Copy, Check } from 'lucide-react';
import type { TopItem } from '../../../domain/models/TopItem';
import { RankPill } from '../ui/RankPill';
import { Badge } from '../ui/Badge';
import { ImageWithFallback } from '../ui/ImageWithFallback';

interface CompactListViewProps {
  items: TopItem[];
  onOpenDetail: (item: TopItem) => void;
  onCopyQuote: (quote: string, author: string, work: string) => void;
  copiedItemId: string | null;
}

export const CompactListView: React.FC<CompactListViewProps> = ({
  items,
  onOpenDetail,
  onCopyQuote
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (e: React.MouseEvent, item: TopItem) => {
    e.stopPropagation();
    onCopyQuote(item.quote, item.title, item.work);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-2">
      <div className="glass-panel rounded-3xl overflow-hidden border border-white/10">
        <div className="divide-y divide-white/5">
          {items.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}
              className="p-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors"
            >
              {/* Accessible Main Button */}
              <button
                type="button"
                onClick={() => onOpenDetail(item)}
                aria-label={`Ver detalles de ${item.title}, puesto ${item.rank}`}
                className="flex items-center gap-4 min-w-0 text-left flex-1 focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-xl p-1 -m-1"
              >
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
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-bold text-white text-base truncate">{item.title}</h4>
                    <span className="text-xs text-indigo-300 font-mono">({item.work})</span>
                  </div>
                  <p className="text-xs text-zinc-300 font-quote italic line-clamp-1">
                    «{item.quote}»
                  </p>
                </div>
              </button>

              {/* Action Group with min 44px touch targets */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
                <div className="hidden lg:flex items-center gap-1.5">
                  {item.badges.slice(0, 2).map((b, i) => (
                    <Badge key={i} size="xs">
                      {b}
                    </Badge>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={(e) => handleCopy(e, item)}
                  aria-label={`Copiar frase de ${item.title}`}
                  className="flex items-center gap-1.5 min-h-[44px] text-xs font-medium text-zinc-300 hover:text-white px-3 py-2 rounded-xl hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-400"
                  title="Copiar cita célebre"
                >
                  {copiedId === item.id ? (
                    <Check className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                  ) : (
                    <Copy className="w-4 h-4" aria-hidden="true" />
                  )}
                  <span>
                    {copiedId === item.id ? 'Copiado' : 'Cita'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => onOpenDetail(item)}
                  aria-label={`Abrir ficha de ${item.title}`}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center text-zinc-400 hover:text-white rounded-xl focus-visible:ring-2 focus-visible:ring-indigo-400"
                >
                  <ChevronRight className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
