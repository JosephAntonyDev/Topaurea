import React, { useRef, useEffect } from 'react';
import { Search, SlidersHorizontal, LayoutGrid, Trophy, List, X, Heart } from 'lucide-react';
import type { ViewMode } from '../../../domain/models/TopItem';

interface CategoryFilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  tags: string[];
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
  sortBy: 'rank' | 'name' | 'work';
  onSortChange: (sort: 'rank' | 'name' | 'work') => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  itemCount: number;
  showFavoritesOnly: boolean;
  onToggleFavoritesOnly: () => void;
  favoritesCount: number;
}

export const CategoryFilterBar: React.FC<CategoryFilterBarProps> = ({
  searchQuery,
  onSearchChange,
  tags,
  selectedTag,
  onSelectTag,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  itemCount,
  showFavoritesOnly,
  onToggleFavoritesOnly,
  favoritesCount
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut "/" to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-4 space-y-4">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Bar with Accessible Label & Compliant Contrast */}
        <div className="relative flex-1 max-w-lg">
          <label htmlFor="top-search-input" className="sr-only">
            Buscar personajes, obras o citas
          </label>
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300" aria-hidden="true" />
          <input
            id="top-search-input"
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por personaje, obra, frase célebre o aura..."
            aria-label="Buscar en este Top"
            className="w-full min-h-[44px] pl-10 pr-9 py-2.5 rounded-2xl bg-zinc-900/90 border border-white/15 text-white placeholder-zinc-400 text-xs sm:text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              aria-label="Limpiar campo de búsqueda"
              className="absolute right-2 top-1/2 -translate-y-1/2 min-w-[36px] min-h-[36px] flex items-center justify-center text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Controls: Favorites Toggle, Sort & View Mode Switcher */}
        <div className="flex items-center gap-3 justify-between md:justify-end flex-wrap">
          {/* Favorites Only Filter Toggle */}
          <button
            type="button"
            onClick={onToggleFavoritesOnly}
            aria-pressed={showFavoritesOnly}
            className={`flex items-center gap-2 min-h-[44px] px-3.5 py-2 rounded-2xl border text-xs sm:text-sm font-semibold transition-all focus-visible:ring-2 focus-visible:ring-indigo-400 ${
              showFavoritesOnly
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-[0_0_15px_rgba(244,63,94,0.2)]'
                : 'bg-zinc-900/80 text-zinc-300 border-white/10 hover:text-white hover:bg-white/5'
            }`}
          >
            <Heart className={`w-4 h-4 ${showFavoritesOnly ? 'fill-rose-400 text-rose-400' : 'text-zinc-400'}`} aria-hidden="true" />
            <span>Favoritos</span>
            <span className="font-mono text-xs px-1.5 py-0.5 rounded-full bg-white/10">
              {favoritesCount}
            </span>
          </button>

          {/* Sort Selector with aria-label */}
          <div className="flex items-center gap-2 min-h-[44px] px-3.5 py-2 rounded-2xl bg-zinc-900/80 border border-white/10 text-xs sm:text-sm text-zinc-300">
            <SlidersHorizontal className="w-4 h-4 text-zinc-400" aria-hidden="true" />
            <label htmlFor="sort-select" className="hidden sm:inline text-zinc-400">
              Orden:
            </label>
            <select
              id="sort-select"
              aria-label="Criterio de ordenamiento"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as 'rank' | 'name' | 'work')}
              className="bg-transparent text-white font-medium focus:outline-none cursor-pointer pr-2"
            >
              <option value="rank" className="bg-zinc-900 text-white">
                Rango Oficial
              </option>
              <option value="name" className="bg-zinc-900 text-white">
                Nombre (A-Z)
              </option>
              <option value="work" className="bg-zinc-900 text-white">
                Obra / Origen
              </option>
            </select>
          </div>

          {/* View Mode Toggle with 44px min touch targets */}
          <div role="group" aria-label="Modo de visualización" className="flex items-center p-1 rounded-2xl bg-zinc-900/80 border border-white/10">
            <button
              type="button"
              onClick={() => onViewModeChange('cards')}
              title="Vista Cards Editorial"
              aria-label="Vista de tarjetas editorial"
              aria-pressed={viewMode === 'cards'}
              className={`min-w-[40px] min-h-[40px] p-2.5 rounded-xl transition-all flex items-center justify-center focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                viewMode === 'cards'
                  ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('podium')}
              title="Vista Podio & Clasificación"
              aria-label="Vista de podio y clasificación"
              aria-pressed={viewMode === 'podium'}
              className={`min-w-[40px] min-h-[40px] p-2.5 rounded-xl transition-all flex items-center justify-center focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                viewMode === 'podium'
                  ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Trophy className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('compact')}
              title="Vista Lista Compacta"
              aria-label="Vista de lista compacta"
              aria-pressed={viewMode === 'compact'}
              className={`min-w-[40px] min-h-[40px] p-2.5 rounded-xl transition-all flex items-center justify-center focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                viewMode === 'compact'
                  ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <List className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Tags Filter Row with Accessible Minimum Height */}
      {tags.length > 0 && (
        <div role="group" aria-label="Filtro por etiquetas" className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="text-zinc-400 font-medium">Filtrar por:</span>
          <button
            type="button"
            onClick={() => onSelectTag(null)}
            className={`min-h-[36px] px-3.5 py-1.5 rounded-full border transition-all flex items-center focus-visible:ring-2 focus-visible:ring-indigo-400 ${
              selectedTag === null
                ? 'bg-white text-zinc-950 border-white font-semibold'
                : 'bg-white/5 text-zinc-300 border-white/15 hover:text-white hover:bg-white/10'
            }`}
          >
            Todos ({itemCount})
          </button>
          {tags.map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => onSelectTag(selectedTag === t ? null : t)}
              className={`min-h-[36px] px-3.5 py-1.5 rounded-full border transition-all whitespace-nowrap flex items-center focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                selectedTag === t
                  ? 'bg-indigo-500/25 text-indigo-200 border-indigo-500/50 font-semibold'
                  : 'bg-white/5 text-zinc-300 border-white/15 hover:text-white hover:bg-white/10'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
