import type { Category } from '../models/Category';
import type { TopItem } from '../models/TopItem';

export interface ICategoryRepository {
  getAllCategories(): Promise<Category[]>;
  getCategoryById(id: string): Promise<Category | null>;
  searchItems(query: string): Promise<{ item: TopItem; category: Category }[]>;
  saveCustomCategory?(category: Category): Promise<boolean>;
  deleteCustomCategory?(id: string): Promise<boolean>;
}
