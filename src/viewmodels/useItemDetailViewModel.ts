import { useState, useCallback } from 'react';
import type { TopItem } from '../domain/models/TopItem';
import type { Category } from '../domain/models/Category';

export function useItemDetailViewModel() {
  const [selectedItem, setSelectedItem] = useState<TopItem | null>(null);
  const [copiedQuote, setCopiedQuote] = useState(false);
  const [copiedShareCard, setCopiedShareCard] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('topaurea_favorites') || localStorage.getItem('auravault_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const openDetail = useCallback((item: TopItem) => {
    setSelectedItem(item);
  }, []);

  const closeDetail = useCallback(() => {
    setSelectedItem(null);
  }, []);

  const toggleFavorite = useCallback((itemId: string) => {
    setFavoriteIds((prev) => {
      const next = prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId];
      try {
        localStorage.setItem('topaurea_favorites', JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (itemId: string) => favoriteIds.includes(itemId),
    [favoriteIds]
  );

  const copyQuote = useCallback(async (quote: string, author: string, work: string) => {
    try {
      const textToCopy = `«${quote}»\n— ${author} (${work})`;
      await navigator.clipboard.writeText(textToCopy);
      setCopiedQuote(true);
      setTimeout(() => setCopiedQuote(false), 2000);
      return true;
    } catch {
      return false;
    }
  }, []);

  const generateShareText = useCallback((category: Category | null, items: TopItem[]) => {
    if (!category) return '';
    let text = `⚡ Mi ${category.name} [Topáurea]\n`;
    text += `"${category.subtitle}"\n\n`;
    items.forEach((it) => {
      const rankBadge = it.isHonorary ? '★ [Mención]' : `#${it.rank.toString().padStart(2, '0')}`;
      text += `${rankBadge} ${it.title} (${it.work})\n`;
      text += `  ↳ «${it.quote}»\n`;
    });
    text += `\n✨ Curado y preservado en Topáurea`;
    return text;
  }, []);

  const copyFullTopSummary = useCallback(async (category: Category | null, items: TopItem[]) => {
    const text = generateShareText(category, items);
    try {
      await navigator.clipboard.writeText(text);
      setCopiedShareCard(true);
      setTimeout(() => setCopiedShareCard(false), 2500);
      return true;
    } catch {
      return false;
    }
  }, [generateShareText]);

  return {
    selectedItem,
    openDetail,
    closeDetail,
    toggleFavorite,
    isFavorite,
    copyQuote,
    copiedQuote,
    copyFullTopSummary,
    copiedShareCard,
    generateShareText
  };
}
