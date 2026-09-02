export interface VibeSong {
  title: string;
  artist: string;
  spotifyQuery?: string;
}

export interface TopItem {
  id: string;
  rank: number;
  title: string;
  subtitle: string;
  work: string;
  quote: string;
  quoteContext?: string;
  whyFavorite: string;
  imageUrl: string;
  fallbackImageUrl?: string;
  themeColor: string; // Hex color for card glow and accents (e.g. "#60a5fa")
  accentGradient: string; // CSS gradient string
  badges: string[];
  personalityTraits: string[];
  alignment?: string; // e.g. "Bien Caótico", "Neutral Puro", "Héroe Trágico"
  tier?: 'S+' | 'S' | 'A+' | 'A' | 'Honor';
  isHonorary?: boolean;
  vibeSong?: VibeSong;
  stats?: {
    impact: number; // 1 - 100
    depth: number;  // 1 - 100
    aura: number;   // 1 - 100
  };
}

export type ViewMode = 'cards' | 'podium' | 'compact';

export interface FilterOptions {
  searchQuery: string;
  sortBy: 'rank' | 'name' | 'work';
  tagFilter: string | null;
  viewMode: ViewMode;
}
