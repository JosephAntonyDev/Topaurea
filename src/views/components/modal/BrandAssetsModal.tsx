import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Copy, Check, Palette, Sparkles, Layers, FileCode } from 'lucide-react';
import {
  SVG_ICON_DARK,
  SVG_WORDMARK_DARK,
  SVG_MOBILE,
  SVG_MONOGRAM,
  SVG_MONO_WHITE,
  SVG_MONO_BLACK
} from '../../../data/assets/logoDefinitions';

interface BrandAssetsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LogoAsset {
  id: string;
  name: string;
  category: 'Primario' | 'Horizontal' | 'Móvil' | 'Monocromo';
  description: string;
  svgContent: string;
  filename: string;
  aspectRatio: string;
  bgColor: string;
}

export const BrandAssetsModal: React.FC<BrandAssetsModalProps> = ({ isOpen, onClose }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const assets: LogoAsset[] = [
    {
      id: 'icon-dark',
      name: 'Isotipo / App Icon (Oficial)',
      category: 'Primario',
      description: 'Squircle oscuro con resplandor áureo. Ideal para Favicon, PWA, apps móviles y avatar.',
      svgContent: SVG_ICON_DARK,
      filename: 'topaurea-icon.svg',
      aspectRatio: 'aspect-square',
      bgColor: 'bg-[#0b0c14]'
    },
    {
      id: 'wordmark-dark',
      name: 'Logotipo Horizontal Completo',
      category: 'Horizontal',
      description: 'Icono + Wordmark tipográfico con tracking refinado y badge. Para headers, banners y web.',
      svgContent: SVG_WORDMARK_DARK,
      filename: 'topaurea-wordmark.svg',
      aspectRatio: 'aspect-[360/80]',
      bgColor: 'bg-[#090a10]'
    },
    {
      id: 'mobile-compact',
      name: 'Versión Móvil / Compacta',
      category: 'Móvil',
      description: 'Relación de aspecto ajustada para pantallas pequeñas y barras de navegación compactas.',
      svgContent: SVG_MOBILE,
      filename: 'topaurea-mobile.svg',
      aspectRatio: 'aspect-[200/48]',
      bgColor: 'bg-[#090a10]'
    },
    {
      id: 'monogram',
      name: 'Monograma / Avatar Circular',
      category: 'Primario',
      description: 'Emblema circular con anillo de refracción áurea. Para perfiles de Discord, GitHub, X.',
      svgContent: SVG_MONOGRAM,
      filename: 'topaurea-monogram.svg',
      aspectRatio: 'aspect-square',
      bgColor: 'bg-[#0b0c14]'
    },
    {
      id: 'mono-white',
      name: 'Monocromático Blanco Puro',
      category: 'Monocromo',
      description: 'Sin degradados. Para serigrafía, prendas oscuras, marcas de agua y grabado láser.',
      svgContent: SVG_MONO_WHITE,
      filename: 'topaurea-mono-white.svg',
      aspectRatio: 'aspect-square',
      bgColor: 'bg-zinc-950'
    },
    {
      id: 'mono-black',
      name: 'Monocromático Negro Puro',
      category: 'Monocromo',
      description: 'Para documentos oficiales, fondos claros, papelería, timbres y sellos legales.',
      svgContent: SVG_MONO_BLACK,
      filename: 'topaurea-mono-black.svg',
      aspectRatio: 'aspect-square',
      bgColor: 'bg-zinc-100'
    }
  ];

  // Copy SVG XML code
  const handleCopySvg = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Download SVG directly
  const handleDownloadSvg = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Export to high-res PNG using Canvas
  const handleDownloadPng = (filename: string, svgContent: string, resolution = 1024) => {
    const canvas = document.createElement('canvas');
    canvas.width = resolution;
    canvas.height = resolution;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    const svgBlob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      ctx.clearRect(0, 0, resolution, resolution);
      ctx.drawImage(img, 0, 0, resolution, resolution);
      URL.revokeObjectURL(url);

      const pngUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = pngUrl;
      link.download = filename.replace('.svg', `-${resolution}px.png`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    img.src = url;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
          aria-hidden="true"
        />

        {/* Modal Window */}
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="brand-modal-title"
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          className="relative w-full max-w-5xl glass-panel rounded-3xl border border-white/15 p-6 sm:p-8 space-y-6 shadow-[0_25px_70px_rgba(0,0,0,0.9)] z-10 my-auto max-h-[92vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
                <Palette className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h2 id="brand-modal-title" className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                  <span>Kit de Marca Oficial — Top</span>
                  <span className="text-indigo-400">áurea</span>
                </h2>
                <p className="text-xs sm:text-sm text-zinc-300">
                  Identidad vectorial matemática (sin IA, estética pura, proporciones áureas).
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar Kit de Marca (Escape)"
              className="min-w-[44px] min-h-[44px] rounded-full bg-white/5 text-zinc-300 hover:text-white border border-white/10 flex items-center justify-center focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {/* Golden Ratio Concept Explainer */}
          <section className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-zinc-300">
            <div className="flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <strong className="text-white block font-semibold">1. La 'T' de Cúspide (Top)</strong>
                Viga superior aerodinámica y pilar central que simboliza el podio sagrado donde se elevan tus favoritos.
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Layers className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <strong className="text-white block font-semibold">2. La Estrella Áurea ($\Phi$)</strong>
                Diamante hiperbólico de 4 puntas que representa la chispa celestial, el aura y la divina proporción.
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <FileCode className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <strong className="text-white block font-semibold">3. Geometría Vectorial Pura</strong>
                Escalable desde un favicon de 16x16px hasta espectaculares de alta definición sin pérdida de nitidez.
              </div>
            </div>
          </section>

          {/* Grid of Logo Assets */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {assets.map((asset) => (
              <div
                key={asset.id}
                className="rounded-2xl bg-white/[0.02] border border-white/10 p-5 space-y-4 hover:border-white/20 transition-all flex flex-col justify-between"
              >
                {/* Visual Preview Box */}
                <div
                  className={`w-full ${asset.aspectRatio} ${asset.bgColor} rounded-xl border border-white/10 p-6 flex items-center justify-center relative overflow-hidden shadow-inner`}
                >
                  <div
                    className="w-full h-full max-h-36 max-w-[280px] flex items-center justify-center"
                    dangerouslySetInnerHTML={{ __html: asset.svgContent }}
                  />
                </div>

                {/* Info & Meta */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-sm sm:text-base">{asset.name}</h3>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white/10 text-zinc-300 font-semibold">
                      {asset.category}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">{asset.description}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
                  {/* Download SVG */}
                  <button
                    type="button"
                    onClick={() => handleDownloadSvg(asset.filename, asset.svgContent)}
                    className="flex-1 min-h-[44px] px-3 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all focus-visible:ring-2 focus-visible:ring-indigo-400"
                  >
                    <Download className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>SVG Vector</span>
                  </button>

                  {/* Copy SVG Code */}
                  <button
                    type="button"
                    onClick={() => handleCopySvg(asset.id, asset.svgContent)}
                    className="min-h-[44px] px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all focus-visible:ring-2 focus-visible:ring-indigo-400"
                  >
                    {copiedId === asset.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                        <span className="text-emerald-400">¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>

                  {/* Download PNG 512px / 1024px */}
                  <button
                    type="button"
                    onClick={() => handleDownloadPng(asset.filename, asset.svgContent, 512)}
                    className="min-h-[44px] px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all focus-visible:ring-2 focus-visible:ring-indigo-400"
                    title="Exportar imagen PNG 512x512"
                  >
                    <span>PNG 512px</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Footer modal note */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-3">
            <span>Todos los archivos se encuentran también guardados en la carpeta <code>/public</code>.</span>
            <button
              type="button"
              onClick={onClose}
              className="min-h-[44px] px-5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold transition-all focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              Cerrar Kit
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
