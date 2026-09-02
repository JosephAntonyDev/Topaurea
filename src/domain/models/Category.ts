import type { TopItem } from './TopItem';

export interface Category {
  id: string;
  name: string;
  shortName: string;
  subtitle: string;
  description: string;
  icon: string; // Lucide icon identifier
  accentColor: string;
  gradient: string;
  tags: string[];
  items: TopItem[];
  lastUpdated?: string;
}
