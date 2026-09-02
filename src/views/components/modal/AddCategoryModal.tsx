import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Code, Sparkles, Check, AlertCircle } from 'lucide-react';
import type { Category } from '../../../domain/models/Category';

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCategory: (category: Category) => Promise<void>;
}

const SAMPLE_JSON_TEMPLATE = `{
  "id": "anime-music",
  "name": "Soundtracks & Openings Épicos",
  "shortName": "Música",
  "subtitle": "Canciones que aceleran el pulso y reviven emociones",
  "description": "Una recopilación de las melodías más impactantes de la ficción y la vida real.",
  "icon": "Flame",
  "accentColor": "#ec4899",
  "gradient": "from-pink-500 to-rose-600",
  "tags": ["Anime", "OST", "Épico"],
  "lastUpdated": "2026-09-02",
  "items": [
    {
      "id": "guren-no-yumiya",
      "rank": 1,
      "title": "Guren no Yumiya",
      "subtitle": "Linked Horizon",
      "work": "Attack on Titan (Shingeki no Kyojin)",
      "quote": "¡Si no luchas, no puedes ganar!",
      "whyFavorite": "La energía coral y la ferocidad instrumental definieron una década de animación.",
      "imageUrl": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop",
      "themeColor": "#f43f5e",
      "accentGradient": "from-rose-500 to-amber-600",
      "badges": ["Atemporal", "Orquestal", "Hype"],
      "personalityTraits": ["Épico", "Feroz"],
      "tier": "S+",
      "stats": { "impact": 100, "depth": 90, "aura": 98 }
    }
  ]
}`;

export const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  isOpen,
  onClose,
  onAddCategory
}) => {
  const [mode, setMode] = useState<'form' | 'json'>('json');
  const [jsonContent, setJsonContent] = useState(SAMPLE_JSON_TEMPLATE);
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Simple form state
  const [categoryName, setCategoryName] = useState('');
  const [categorySubtitle, setCategorySubtitle] = useState('');
  const [categoryIcon, setCategoryIcon] = useState('Flame');

  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleJsonSubmit = async () => {
    try {
      setJsonError(null);
      const parsed = JSON.parse(jsonContent);

      if (!parsed.id || !parsed.name || !Array.isArray(parsed.items)) {
        throw new Error('El JSON debe contener "id", "name" y un array de "items".');
      }

      setIsSubmitting(true);
      await onAddCategory(parsed);
      setIsSubmitting(false);
      onClose();
    } catch (err: any) {
      setJsonError(err.message || 'Error de sintaxis en el JSON proporcionado.');
      setIsSubmitting(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryName.trim()) return;

    const newCat: Category = {
      id: categoryName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      name: categoryName,
      shortName: categoryName.slice(0, 15),
      subtitle: categorySubtitle || 'Colección personalizada de favoritos',
      description: 'Categoría agregada dinámicamente.',
      icon: categoryIcon,
      accentColor: '#818cf8',
      gradient: 'from-indigo-500 to-purple-600',
      tags: ['Personal', 'Top'],
      items: []
    };

    setIsSubmitting(true);
    await onAddCategory(newCat);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
          aria-hidden="true"
        />

        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-category-title"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl glass-panel rounded-3xl border border-white/15 p-6 sm:p-8 space-y-6 shadow-[0_25px_70px_rgba(0,0,0,0.9)] z-10 my-auto"
        >
          {/* Top Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white">
                <Plus className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h2 id="add-category-title" className="text-xl font-bold text-white">
                  Agregar Nueva Categoría
                </h2>
                <p className="text-xs text-zinc-300">
                  Arquitectura escalable: añade tus tops de música, comida, animes o libros
                </p>
              </div>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Cerrar ventana de agregar categoría (Escape)"
              className="min-w-[44px] min-h-[44px] rounded-full bg-white/5 text-zinc-300 hover:text-white border border-white/10 flex items-center justify-center focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {/* Mode Selector with accessible pressed states */}
          <div role="group" aria-label="Método de creación" className="flex items-center p-1 rounded-2xl bg-zinc-900/80 border border-white/10 max-w-xs mx-auto">
            <button
              type="button"
              onClick={() => setMode('json')}
              aria-pressed={mode === 'json'}
              className={`flex-1 min-h-[38px] py-1.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                mode === 'json'
                  ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              <Code className="w-4 h-4" aria-hidden="true" />
              <span>Pegar JSON (Pro)</span>
            </button>
            <button
              type="button"
              onClick={() => setMode('form')}
              aria-pressed={mode === 'form'}
              className={`flex-1 min-h-[38px] py-1.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                mode === 'form'
                  ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>Formulario Rápido</span>
            </button>
          </div>

          {/* JSON Mode with Label and High Visibility */}
          {mode === 'json' ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-zinc-300">
                <label htmlFor="json-category-input" className="font-semibold">
                  Estructura JSON de la Categoría y sus Items:
                </label>
                <span className="font-mono text-xs text-indigo-300">Validación instantánea</span>
              </div>
              <textarea
                id="json-category-input"
                aria-label="Editor de código JSON para categoría"
                value={jsonContent}
                onChange={(e) => setJsonContent(e.target.value)}
                rows={11}
                className="w-full font-mono text-xs text-zinc-100 bg-zinc-950/90 border border-white/15 rounded-2xl p-4 resize-none focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 scrollbar-thin"
              />
              {jsonError && (
                <div role="alert" className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" aria-hidden="true" />
                  <span>{jsonError}</span>
                </div>
              )}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="min-h-[44px] px-4 py-2 text-xs sm:text-sm font-medium text-zinc-300 hover:text-white focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleJsonSubmit}
                  className="min-h-[44px] px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-indigo-400 disabled:opacity-50"
                >
                  <Check className="w-4 h-4" aria-hidden="true" />
                  <span>{isSubmitting ? 'Guardando...' : 'Crear Categoría'}</span>
                </button>
              </div>
            </div>
          ) : (
            /* Form Mode with Proper Linked Labels */
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="new-cat-name" className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold block">
                  Nombre de la Categoría
                </label>
                <input
                  id="new-cat-name"
                  type="text"
                  required
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="Ej: Animes que me Marcaron, Mis Comidas Favoritas..."
                  className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-zinc-950/80 border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="new-cat-subtitle" className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold block">
                  Subtítulo / Frase Inspiradora
                </label>
                <input
                  id="new-cat-subtitle"
                  type="text"
                  value={categorySubtitle}
                  onChange={(e) => setCategorySubtitle(e.target.value)}
                  placeholder="Ej: Obras que todo buen amigo debería experimentar..."
                  className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-zinc-950/80 border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="new-cat-icon" className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold block">
                  Ícono Representativo
                </label>
                <select
                  id="new-cat-icon"
                  value={categoryIcon}
                  onChange={(e) => setCategoryIcon(e.target.value)}
                  className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-zinc-950/80 border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30"
                >
                  <option value="Flame">Fuego / Pasión (Flame)</option>
                  <option value="Gamepad2">Videojuegos (Gamepad2)</option>
                  <option value="Film">Cine / Películas (Film)</option>
                  <option value="Sparkles">Estrellas / General (Sparkles)</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="min-h-[44px] px-4 py-2 text-xs sm:text-sm font-medium text-zinc-300 hover:text-white focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="min-h-[44px] px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-indigo-400 disabled:opacity-50"
                >
                  <Check className="w-4 h-4" aria-hidden="true" />
                  <span>{isSubmitting ? 'Guardando...' : 'Crear y Continuar'}</span>
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
