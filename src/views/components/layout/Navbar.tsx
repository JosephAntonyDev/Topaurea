import React from 'react';
import { Share2, Plus, Search, Palette } from 'lucide-react';
import { TopaureaLogo } from '../ui/TopaureaLogo';

interface NavbarProps {
  onOpenShare: () => void;
  onOpenAddCategory: () => void;
  onFocusSearch: () => void;
  onOpenBrandKit?: () => void;
  currentCategoryName: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenShare,
  onOpenAddCategory,
  onFocusSearch,
  onOpenBrandKit,
  currentCategoryName
}) => {
  return (
    <header className="sticky top-4 z-40 w-full px-4 sm:px-8 max-w-7xl mx-auto">
      <nav
        aria-label="Barra de navegación principal"
        className="glass-panel rounded-2xl px-4 py-3 flex items-center justify-between shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] border border-white/10"
      >
        {/* Brand & Active Category */}
        <button
          type="button"
          onClick={onOpenBrandKit}
          title="Ver y descargar Kit de Marca oficial (SVG & PNG)"
          aria-label="Topáurea — Ver Kit de Marca oficial"
          className="flex items-center gap-3 text-left group rounded-xl p-1 -m-1 focus-visible:ring-2 focus-visible:ring-indigo-400 transition-all hover:opacity-90"
        >
          <TopaureaLogo variant="icon" size="md" className="group-hover:scale-105 transition-transform" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-tight text-white text-base sm:text-lg">
                Top<span className="text-indigo-400">áurea</span>
              </span>
              <span className="text-xs uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 group-hover:bg-indigo-500/30 transition-colors">
                PRO
              </span>
            </div>
            <p className="text-xs text-zinc-300 hidden sm:block">
              Santuario de Cosas Favoritas • <span className="text-white font-medium">{currentCategoryName}</span>
            </p>
          </div>
        </button>

        {/* Action Buttons with minimum 44px touch targets */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onFocusSearch}
            className="flex items-center gap-2 min-h-[44px] px-3.5 py-2 text-xs font-medium text-zinc-200 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all focus-visible:ring-2 focus-visible:ring-indigo-400"
            title="Buscar en este Top (Presiona / para buscar)"
            aria-label="Buscar personajes y citas en este top"
          >
            <Search className="w-4 h-4 text-zinc-300" aria-hidden="true" />
            <span className="hidden md:inline">Buscar</span>
            <kbd className="hidden md:inline-block text-xs font-mono px-1.5 py-0.5 rounded bg-black/50 text-zinc-300 border border-white/10">
              /
            </kbd>
          </button>

          <button
            type="button"
            onClick={onOpenAddCategory}
            className="flex items-center gap-2 min-h-[44px] px-3.5 py-2 text-xs font-medium text-zinc-200 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all focus-visible:ring-2 focus-visible:ring-indigo-400"
            title="Crear o Agregar nueva categoría"
            aria-label="Agregar nueva categoría"
          >
            <Plus className="w-4 h-4 text-indigo-400" aria-hidden="true" />
            <span className="hidden sm:inline">Nueva Categoría</span>
          </button>

          {onOpenBrandKit && (
            <button
              type="button"
              onClick={onOpenBrandKit}
              className="flex items-center gap-2 min-h-[44px] px-3.5 py-2 text-xs font-medium text-zinc-200 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all focus-visible:ring-2 focus-visible:ring-indigo-400"
              title="Ver y descargar logos oficiales (SVG & PNG)"
              aria-label="Descargar logos y recursos de marca"
            >
              <Palette className="w-4 h-4 text-purple-400" aria-hidden="true" />
              <span className="hidden lg:inline">Kit de Marca</span>
            </button>
          )}

          <button
            type="button"
            onClick={onOpenShare}
            className="flex items-center gap-2 min-h-[44px] px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all transform hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-indigo-400"
            aria-label="Abrir modal para compartir este top"
          >
            <Share2 className="w-4 h-4" aria-hidden="true" />
            <span>Compartir Top</span>
          </button>
        </div>
      </nav>
    </header>
  );
};
