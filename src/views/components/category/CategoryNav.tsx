import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Gamepad2, Film, Sparkles, FolderHeart, Trash2 } from 'lucide-react';
import type { Category } from '../../../domain/models/Category';

interface CategoryNavProps {
  categories: Category[];
  activeCategoryId: string;
  onSelectCategory: (id: string) => void;
  onDeleteCategory?: (id: string) => void;
}

const getCategoryIcon = (iconName: string) => {
  switch (iconName.toLowerCase()) {
    case 'flame':
      return <Flame className="w-4 h-4" aria-hidden="true" />;
    case 'gamepad2':
      return <Gamepad2 className="w-4 h-4" aria-hidden="true" />;
    case 'film':
      return <Film className="w-4 h-4" aria-hidden="true" />;
    default:
      return <FolderHeart className="w-4 h-4" aria-hidden="true" />;
  }
};

export const CategoryNav: React.FC<CategoryNavProps> = ({
  categories,
  activeCategoryId,
  onSelectCategory,
  onDeleteCategory
}) => {
  const isCustomCategory = (id: string) => !['characters', 'videogames', 'cinema'].includes(id);

  const handleDelete = (e: React.MouseEvent, cat: Category) => {
    e.stopPropagation();
    if (window.confirm(`¿Estás seguro de que deseas eliminar la categoría personalizada "${cat.name}"?`)) {
      onDeleteCategory?.(cat.id);
    }
  };

  return (
    <nav aria-label="Categorías disponibles" className="w-full max-w-7xl mx-auto px-4 sm:px-8 pt-4 pb-2">
      <div className="flex items-center justify-between gap-4 overflow-x-auto pb-2 scrollbar-none">
        <div role="tablist" aria-label="Pestañas de Tops" className="flex items-center gap-2 p-1.5 rounded-2xl glass-panel border border-white/10">
          {categories.map((cat) => {
            const isActive = cat.id === activeCategoryId;
            const custom = isCustomCategory(cat.id);

            return (
              <div key={cat.id} className="relative flex items-center">
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  id={`tab-${cat.id}`}
                  aria-controls={`panel-${cat.id}`}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`relative flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                    isActive ? 'text-white font-semibold' : 'text-zinc-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryIndicator"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 border border-indigo-400/40 shadow-[0_0_20px_rgba(99,102,241,0.3)]"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{getCategoryIcon(cat.icon)}</span>
                  <span className="relative z-10">{cat.shortName || cat.name}</span>
                  <span
                    className={`relative z-10 text-xs font-mono px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-white/10 text-zinc-300'
                    }`}
                  >
                    {cat.items.length}
                  </span>
                </button>

                {/* Delete button for custom categories */}
                {custom && onDeleteCategory && (
                  <button
                    type="button"
                    onClick={(e) => handleDelete(e, cat)}
                    title={`Eliminar categoría ${cat.name}`}
                    aria-label={`Eliminar categoría personalizada ${cat.name}`}
                    className="relative z-10 -ml-2 p-2 text-zinc-400 hover:text-rose-400 focus-visible:ring-2 focus-visible:ring-rose-400 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center gap-2 text-xs text-zinc-400 font-mono">
          <Sparkles className="w-4 h-4 text-indigo-400" aria-hidden="true" />
          <span>Curaduría activa</span>
        </div>
      </div>
    </nav>
  );
};
