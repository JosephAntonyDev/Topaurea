import React from 'react';
import { Heart, ShieldCheck, Compass } from 'lucide-react';
import { TopaureaLogo } from '../ui/TopaureaLogo';

interface FooterProps {
  totalCategories: number;
  totalItems: number;
  onOpenBrandKit?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ totalCategories, totalItems, onOpenBrandKit }) => {
  return (
    <footer className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-12 mt-16 border-t border-white/10 text-zinc-300">
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center justify-between">
          <div className="md:col-span-7 space-y-3">
            <div className="flex items-center gap-2.5">
              <TopaureaLogo variant="icon" size="sm" />
              <span className="font-extrabold text-lg text-white tracking-tight">
                Top<span className="text-indigo-400">áurea</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-lg leading-relaxed">
              Un santuario interactivo de gustos, principios y filosofías personales. Diseñado tanto para
              conservar el mapa de mis pasiones que el tiempo suele desvanecer, como para
              compartir con amigos y mentes afines.
            </p>
          </div>

          <div className="md:col-span-5 flex flex-wrap gap-4 md:justify-end">
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 min-w-[120px]">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
                Categorías
              </span>
              <div className="text-2xl font-black text-white font-mono mt-1">{totalCategories}</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 min-w-[120px]">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
                Obras & Tops
              </span>
              <div className="text-2xl font-black text-white font-mono mt-1">{totalItems}</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 min-w-[120px]">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
                Arquitectura
              </span>
              <div className="text-xs font-bold text-indigo-300 mt-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                <span>SOLID / MVVM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-300 gap-4">
          <p>Curado con pasión por los detalles y convicciones inquebrantables.</p>
          <div className="flex items-center gap-4 text-xs font-mono text-zinc-300">
            {onOpenBrandKit && (
              <>
                <button
                  type="button"
                  onClick={onOpenBrandKit}
                  className="hover:text-white transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-indigo-400 focus-visible:ring-2 focus-visible:ring-indigo-400"
                >
                  Kit de Marca (SVG/PNG)
                </button>
                <span aria-hidden="true">•</span>
              </>
            )}
            <span className="flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-indigo-400" aria-hidden="true" />
              <span>Topáurea Core v2.5</span>
            </span>
            <span aria-hidden="true">•</span>
            <span className="flex items-center gap-1.5 text-rose-300">
              <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" aria-hidden="true" />
              <span>Personal Vault</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
