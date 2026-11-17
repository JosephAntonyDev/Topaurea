import { useState } from 'react';
import type { TopItem } from '../../../domain/models/TopItem';

export function BrandMark() {
  return <svg className="brand-mark" viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M20 2v36M2 20h36M7.3 7.3l25.4 25.4M7.3 32.7 32.7 7.3" stroke="currentColor" strokeWidth="6.5" /><circle cx="20" cy="20" r="5" fill="var(--paper, #f7f6f2)" /></svg>;
}

export function Artwork({ item, priority = false }: { item: TopItem; priority?: boolean }) {
  const [failed, setFailed] = useState(false);
  const [fallback, setFallback] = useState(false);
  if (failed) return <div className="artwork-fallback" role="img" aria-label={item.title}><BrandMark /><span>{item.title}</span><small>{item.work}</small></div>;
  const source = fallback ? item.fallbackImageUrl : item.imageUrl;
  if (!source) return <div className="artwork-fallback" role="img" aria-label={item.title}><BrandMark /><span>{item.title}</span><small>{item.work}</small></div>;
  return <img className={`artwork-image ${source.endsWith('.png') ? 'artwork-cutout' : ''}`} src={source} alt={item.title} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} onError={() => { if (!fallback && item.fallbackImageUrl && item.fallbackImageUrl !== item.imageUrl) setFallback(true); else setFailed(true); }} />;
}
