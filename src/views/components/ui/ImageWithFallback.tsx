import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface ImageWithFallbackProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  themeColor?: string;
  title?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  fallbackSrc,
  alt,
  className = '',
  themeColor = '#6366f1',
  title = ''
}) => {
  const [errorCount, setErrorCount] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const handleError = () => {
    setErrorCount((prev) => prev + 1);
  };

  // If primary and secondary fail, show luxury editorial monogram placeholder
  if (errorCount >= 2 || (!src && !fallbackSrc)) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-950 to-black ${className}`}
        style={{
          borderBottom: `2px solid ${themeColor}40`
        }}
      >
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${themeColor} 0%, transparent 70%)`
          }}
        />
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl mb-2 backdrop-blur-md border border-white/10"
          style={{
            backgroundColor: `${themeColor}20`,
            color: themeColor,
            boxShadow: `0 0 25px ${themeColor}40`
          }}
        >
          {title ? title.charAt(0).toUpperCase() : <Sparkles className="w-8 h-8" />}
        </div>
        <span className="text-xs tracking-widest uppercase font-mono text-zinc-400 font-semibold">
          {title || alt}
        </span>
      </div>
    );
  }

  const currentSrc = errorCount === 1 && fallbackSrc ? fallbackSrc : src;

  return (
    <div className={`relative overflow-hidden bg-zinc-950 ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-zinc-900 flex items-center justify-center">
          <div
            className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: `${themeColor} transparent ${themeColor} ${themeColor}` }}
          />
        </div>
      )}
      <img
        src={currentSrc}
        alt={alt}
        loading="lazy"
        onError={handleError}
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-700 ${
          loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        }`}
      />
    </div>
  );
};
