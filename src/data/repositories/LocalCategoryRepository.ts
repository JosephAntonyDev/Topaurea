import type { Category } from '../../domain/models/Category';
import type { TopItem } from '../../domain/models/TopItem';
import type { ICategoryRepository } from '../../domain/repositories/ICategoryRepository';

import charactersData from '../sources/characters.json';
import videogamesData from '../sources/videogames.json';
import cinemaData from '../sources/cinema.json';

const STORAGE_KEY = 'topaurea_custom_categories_v1';
const LEGACY_STORAGE_KEY = 'auravault_custom_categories_v1';

export class LocalCategoryRepository implements ICategoryRepository {
  private baseCategories: Category[] = [
    charactersData as unknown as Category,
    videogamesData as unknown as Category,
    cinemaData as unknown as Category
  ];

  public async getAllCategories(): Promise<Category[]> {
    const custom = this.getCustomCategories();
    return [...this.baseCategories, ...custom];
  }

  public async getCategoryById(id: string): Promise<Category | null> {
    const all = await this.getAllCategories();
    return all.find((c) => c.id === id) || null;
  }

  public async searchItems(query: string): Promise<{ item: TopItem; category: Category }[]> {
    const all = await this.getAllCategories();
    const cleanQuery = query.toLowerCase().trim();
    if (!cleanQuery) return [];

    const results: { item: TopItem; category: Category }[] = [];

    for (const cat of all) {
      for (const item of cat.items) {
        const matchesTitle = item.title.toLowerCase().includes(cleanQuery);
        const matchesWork = item.work.toLowerCase().includes(cleanQuery);
        const matchesQuote = item.quote.toLowerCase().includes(cleanQuery);
        const matchesBadges = item.badges.some((b) => b.toLowerCase().includes(cleanQuery));

        if (matchesTitle || matchesWork || matchesQuote || matchesBadges) {
          results.push({ item, category: cat });
        }
      }
    }

    return results;
  }

  public async saveCustomCategory(newCategory: Category): Promise<boolean> {
    try {
      const custom = this.getCustomCategories();
      const existingIndex = custom.findIndex((c) => c.id === newCategory.id);
      if (existingIndex >= 0) {
        custom[existingIndex] = newCategory;
      } else {
        custom.push(newCategory);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(custom));
      return true;
    } catch (e) {
      console.error('Error saving custom category to localStorage', e);
      return false;
    }
  }

  public async deleteCustomCategory(id: string): Promise<boolean> {
    try {
      const custom = this.getCustomCategories();
      const filtered = custom.filter((c) => c.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      return true;
    } catch (e) {
      console.error('Error deleting custom category', e);
      return false;
    }
  }

  private getCustomCategories(): Category[] {
    try {
      if (typeof window === 'undefined') return [];
      const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
      if (!raw) return [];
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }
}

export const categoryRepository = new LocalCategoryRepository();
