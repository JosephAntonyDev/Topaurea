import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, MessageSquare, Sparkles, Send } from 'lucide-react';
import type { Category } from '../../../domain/models/Category';
import type { TopItem } from '../../../domain/models/TopItem';
import confetti from 'canvas-confetti';

interface ShareTopModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: Category | null;
  items: TopItem[];
  onCopySummary: (category: Category | null, items: TopItem[]) => Promise<boolean>;
  hasCopied: boolean;
  generateText: (category: Category | null, items: TopItem[]) => string;
}

export const ShareTopModal: React.FC<ShareTopModalProps> = ({
  isOpen,
  onClose,
  category,
  items,
  onCopySummary,
  hasCopied,
  generateText
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
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

  if (!isOpen || !category) return null;

  const fullText = generateText(category, items);

  const handleCopy = async () => {
    await onCopySummary(category, items);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const handleCopyCurrentUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const encoded = encodeURIComponent(fullText);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
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
          aria-labelledby="share-modal-title"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl glass-panel rounded-3xl border border-white/15 p-6 sm:p-8 space-y-6 shadow-[0_25px_70px_rgba(0,0,0,0.9)] z-10 my-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
                <Send className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h2 id="share-modal-title" className="text-xl font-bold text-white">
                  Compartir {category.name}
                </h2>
                <p className="text-xs text-zinc-300">
                  Ideal para enviar a amigos, comunidades o compartir en grupos
                </p>
              </div>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Cerrar ventana de compartir (Escape)"
              className="min-w-[44px] min-h-[44px] rounded-full bg-white/5 text-zinc-300 hover:text-white border border-white/10 flex items-center justify-center focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {/* Formatted Text Preview with Accessible Label */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-300">
              <label htmlFor="share-text-preview" className="font-mono uppercase tracking-wider font-semibold">
                Vista previa del mensaje:
              </label>
              <span className="text-xs text-zinc-400 font-mono">
                {items.length} elementos seleccionados
              </span>
            </div>
            <div className="relative">
              <textarea
                id="share-text-preview"
                readOnly
                value={fullText}
                rows={8}
                className="w-full font-mono text-xs text-zinc-200 bg-zinc-950/90 border border-white/10 rounded-2xl p-4 resize-none focus:outline-none scrollbar-thin"
              />
            </div>
          </div>

          {/* Sharing Actions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center justify-center gap-2 min-h-[48px] py-3 px-4 rounded-2xl bg-white text-zinc-950 font-semibold text-xs sm:text-sm hover:bg-zinc-200 transition-all shadow-[0_0_25px_rgba(255,255,255,0.2)] focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              {hasCopied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                  <span>¡Copiado al Portapapeles!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" aria-hidden="true" />
                  <span>Copiar Resumen Completo</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="flex items-center justify-center gap-2 min-h-[48px] py-3 px-4 rounded-2xl bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/40 font-semibold text-xs sm:text-sm hover:bg-[#25D366]/30 transition-all focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <MessageSquare className="w-4 h-4" aria-hidden="true" />
              <span>Enviar por WhatsApp</span>
            </button>
          </div>

          {/* Copy Direct Link */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
            <span className="text-zinc-300">Enlace directo a esta página:</span>
            <button
              type="button"
              onClick={handleCopyCurrentUrl}
              className="min-h-[40px] px-3 py-1.5 font-mono text-indigo-300 hover:text-white flex items-center gap-1.5 rounded-lg focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" aria-hidden="true" /> : <Sparkles className="w-4 h-4" aria-hidden="true" />}
              <span>{copiedLink ? 'Enlace copiado' : 'Copiar URL'}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
