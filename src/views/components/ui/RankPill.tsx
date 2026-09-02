import React from 'react';
import { Crown, Sparkles, Star } from 'lucide-react';

interface RankPillProps {
  rank: number;
  isHonorary?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const RankPill: React.FC<RankPillProps> = ({ rank, isHonorary = false, size = 'md' }) => {
  if (isHonorary) {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-200 border border-rose-500/40 backdrop-blur-md shadow-[0_0_15px_rgba(244,63,94,0.2)]">
        <Star className="w-4 h-4 fill-rose-400 text-rose-400" />
        <span className="tracking-wider uppercase">Mención de Honor</span>
      </div>
    );
  }

  // Top 1 Gold
  if (rank === 1) {
    return (
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-400/20 text-amber-200 border border-amber-400/50 backdrop-blur-md shadow-[0_0_20px_rgba(251,191,36,0.3)]">
        <Crown className="w-4 h-4 fill-amber-300 text-amber-300" />
        <span className="tracking-widest">TOP #01</span>
      </div>
    );
  }

  // Top 2 Silver
  if (rank === 2) {
    return (
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-slate-300/20 text-slate-100 border border-slate-300/40 backdrop-blur-md shadow-[0_0_15px_rgba(203,213,225,0.2)]">
        <Sparkles className="w-4 h-4 text-slate-200" />
        <span className="tracking-widest">TOP #02</span>
      </div>
    );
  }

  // Top 3 Bronze
  if (rank === 3) {
    return (
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-700/25 text-amber-300 border border-amber-600/40 backdrop-blur-md">
        <Sparkles className="w-4 h-4 text-amber-400" />
        <span className="tracking-widest">TOP #03</span>
      </div>
    );
  }

  const sizeClass = size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-xs';

  return (
    <div className={`inline-flex items-center gap-1.5 rounded-full font-mono font-semibold bg-white/10 text-zinc-200 border border-white/15 backdrop-blur-sm ${sizeClass}`}>
      <span className="text-zinc-400">#</span>
      <span>{rank.toString().padStart(2, '0')}</span>
    </div>
  );
};
