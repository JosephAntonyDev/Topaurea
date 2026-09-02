import { useState, useEffect, useMemo, useCallback } from 'react';
import type { Category } from '../domain/models/Category';
import type { ViewMode } from '../domain/models/TopItem';
import { categoryRepository } from '../data/repositories/LocalCategoryRepository';

export function useCategoryViewModel(initialCategoryId = 'characters', favoriteIds: string[] = []) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<string>(initialCategoryId);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'rank' | 'name' | 'work'>('rank');
  const [viewMode, setViewMode] = useState<ViewMode>('cards');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Load all categories on mount
  const refreshCategories = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const data = await categoryRepository.getAllCategories();
      setCategories(data);
      if (!data.some((c) => c.id === activeCategoryId) && data.length > 0) {
        setActiveCategoryId(data[0].id);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Error al cargar las categorías.');
    } finally {
      setIsLoading(false);
    }
  }, [activeCategoryId]);

  useEffect(() => {
    refreshCategories();
  }, [refreshCategories]);

  // Current active category object
  const currentCategory = useMemo(() => {
    return categories.find((c) => c.id === activeCategoryId) || categories[0] || null;
  }, [categories, activeCategoryId]);

  // Check if current category is a custom one (deletable)
  const isCurrentCategoryCustom = useMemo(() => {
    if (!currentCategory) return false;
    return !['characters', 'videogames', 'cinema'].includes(currentCategory.id);
  }, [currentCategory]);

  // Available tags in current category
  const availableTags = useMemo(() => {
    if (!currentCategory) return [];
    return currentCategory.tags || [];
  }, [currentCategory]);

  // Total favorites count in current category
  const categoryFavoritesCount = useMemo(() => {
    if (!currentCategory) return 0;
    return currentCategory.items.filter((item) => favoriteIds.includes(item.id)).length;
  }, [currentCategory, favoriteIds]);

  // Filtered and sorted items
  const displayItems = useMemo(() => {
    if (!currentCategory) return [];

    let items = [...currentCategory.items];

    // Favorites only filter
    if (showFavoritesOnly) {
      items = items.filter((item) => favoriteIds.includes(item.id));
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.work.toLowerCase().includes(q) ||
          item.quote.toLowerCase().includes(q) ||
          item.badges.some((b) => b.toLowerCase().includes(q)) ||
          item.whyFavorite.toLowerCase().includes(q)
      );
    }

    // Tag filter
    if (selectedTag) {
      items = items.filter(
        (item) =>
          item.badges.includes(selectedTag) ||
          item.personalityTraits.includes(selectedTag) ||
          item.work.toLowerCase().includes(selectedTag.toLowerCase())
      );
    }

    // Sorting
    if (sortBy === 'name') {
      items.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'work') {
      items.sort((a, b) => a.work.localeCompare(b.work));
    } else {
      // Default: rank (honorary items at the end)
      items.sort((a, b) => {
        if (a.isHonorary && !b.isHonorary) return 1;
        if (!a.isHonorary && b.isHonorary) return -1;
        return a.rank - b.rank;
      });
    }

    return items;
  }, [currentCategory, showFavoritesOnly, favoriteIds, searchQuery, selectedTag, sortBy]);

  // Top #1 item for spotlight hero
  const top1Item = useMemo(() => {
    if (!currentCategory || currentCategory.items.length === 0) return null;
    return currentCategory.items.find((i) => i.rank === 1 && !i.isHonorary) || currentCategory.items[0];
  }, [currentCategory]);

  const addNewCategory = useCallback(async (newCategory: Category) => {
    if (categoryRepository.saveCustomCategory) {
      await categoryRepository.saveCustomCategory(newCategory);
      await refreshCategories();
      setActiveCategoryId(newCategory.id);
    }
  }, [refreshCategories]);

  const deleteCategory = useCallback(async (id: string) => {
    if (categoryRepository.deleteCustomCategory) {
      await categoryRepository.deleteCustomCategory(id);
      setActiveCategoryId('characters');
      await refreshCategories();
    }
  }, [refreshCategories]);

  return {
    categories,
    currentCategory,
    isCurrentCategoryCustom,
    activeCategoryId,
    setActiveCategoryId,
    searchQuery,
    setSearchQuery,
    selectedTag,
    setSelectedTag,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    showFavoritesOnly,
    setShowFavoritesOnly,
    categoryFavoritesCount,
    isLoading,
    errorMessage,
    displayItems,
    top1Item,
    availableTags,
    addNewCategory,
    deleteCategory,
    refreshCategories
  };
}
