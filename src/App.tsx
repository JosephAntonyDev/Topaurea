import { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useCategoryViewModel } from './viewmodels/useCategoryViewModel';
import { useItemDetailViewModel } from './viewmodels/useItemDetailViewModel';
import { Navbar } from './views/components/layout/Navbar';
import { HeroSpotlight } from './views/components/layout/HeroSpotlight';
import { CategoryNav } from './views/components/category/CategoryNav';
import { CategoryFilterBar } from './views/components/category/CategoryFilterBar';
import { ItemCard } from './views/components/items/ItemCard';
import { PodiumView } from './views/components/items/PodiumView';
import { CompactListView } from './views/components/items/CompactListView';
import { ItemDetailModal } from './views/components/modal/ItemDetailModal';
import { ShareTopModal } from './views/components/modal/ShareTopModal';
import { AddCategoryModal } from './views/components/modal/AddCategoryModal';
import { BrandAssetsModal } from './views/components/modal/BrandAssetsModal';
import { Footer } from './views/components/layout/Footer';
import { SearchX, Sparkles, Heart, Plus, AlertCircle, RefreshCw } from 'lucide-react';

export function App() {
  // Detail & Favorites ViewModel
  const {
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
  } = useItemDetailViewModel();

  // Get current stored favorites from localStorage for filtering
  const favoriteIds = useMemo(() => {
    try {
      const saved = localStorage.getItem('topaurea_favorites') || localStorage.getItem('auravault_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }, [selectedItem, isFavorite]);

  // Categories ViewModel (MVVM)
  const {
    categories,
    currentCategory,
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
  } = useCategoryViewModel('characters', favoriteIds);

  // Modals state
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);

  // Focus search shortcut
  const handleFocusSearch = () => {
    const input = document.getElementById('top-search-input') as HTMLInputElement;
    input?.focus();
  };

  const totalAllItems = useMemo(() => {
    return categories.reduce((acc, cat) => acc + cat.items.length, 0);
  }, [categories]);

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#07080c] text-zinc-100 flex flex-col selection:bg-indigo-500/30 selection:text-white">
      {/* Dynamic Island Floating Header */}
      <Navbar
        onOpenShare={() => setIsShareModalOpen(true)}
        onOpenAddCategory={() => setIsAddCategoryModalOpen(true)}
        onOpenBrandKit={() => setIsBrandModalOpen(true)}
        onFocusSearch={handleFocusSearch}
        currentCategoryName={currentCategory?.name || 'Top'}
      />

      {/* Hero Spotlight (Top 1 of current active category) */}
      {!isLoading && !errorMessage && !showFavoritesOnly && (
        <HeroSpotlight item={top1Item} onOpenDetail={openDetail} />
      )}

      {/* Category Navigation Bar with custom category deletion support */}
      <CategoryNav
        categories={categories}
        activeCategoryId={activeCategoryId}
        onSelectCategory={(id) => {
          setActiveCategoryId(id);
          setSelectedTag(null);
          setSearchQuery('');
          setShowFavoritesOnly(false);
        }}
        onDeleteCategory={deleteCategory}
      />

      {/* Category Subtitle & Description Header */}
      {currentCategory && !isLoading && (
        <section aria-label="Información de la categoría" className="w-full max-w-7xl mx-auto px-4 sm:px-8 pt-4 pb-2">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-indigo-300 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" aria-hidden="true" />
                <span>Colección Personal Activa</span>
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                {currentCategory.name}
              </h1>
              <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-2xl leading-relaxed">
                {currentCategory.description}
              </p>
            </div>
            <div className="text-xs font-mono text-zinc-300">
              Total listados: <span className="text-white font-bold">{currentCategory.items.length}</span>
            </div>
          </div>
        </section>
      )}

      {/* Filtering & View Switcher Bar with Favorites Filter */}
      <CategoryFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        tags={availableTags}
        selectedTag={selectedTag}
        onSelectTag={setSelectedTag}
        sortBy={sortBy}
        onSortChange={setSortBy}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        itemCount={displayItems.length}
        showFavoritesOnly={showFavoritesOnly}
        onToggleFavoritesOnly={() => setShowFavoritesOnly(!showFavoritesOnly)}
        favoritesCount={categoryFavoritesCount}
      />

      {/* Main Content Area: Handles Loading, Error, Empty and Success states */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-6">
        {/* 1. Loading State: Skeleton Cards */}
        {isLoading && (
          <div aria-busy="true" aria-label="Cargando elementos..." className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="rounded-3xl glass-panel p-6 space-y-4 border border-white/10 animate-pulse"
              >
                <div className="w-full aspect-[16/10] bg-white/5 rounded-2xl" />
                <div className="h-4 bg-white/10 rounded w-1/3" />
                <div className="h-6 bg-white/15 rounded w-3/4" />
                <div className="h-16 bg-white/5 rounded-xl" />
                <div className="flex gap-2 pt-2">
                  <div className="h-6 bg-white/10 rounded-full w-20" />
                  <div className="h-6 bg-white/10 rounded-full w-16" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2. Error State: Actionable Error Banner */}
        {!isLoading && errorMessage && (
          <div role="alert" className="py-16 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <AlertCircle className="w-8 h-8" aria-hidden="true" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white">Hubo un problema al cargar los datos</h2>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-md">
                {errorMessage}
              </p>
            </div>
            <button
              type="button"
              onClick={refreshCategories}
              className="flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold transition-all focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              <RefreshCw className="w-4 h-4" aria-hidden="true" />
              <span>Reintentar carga</span>
            </button>
          </div>
        )}

        {/* 3. Empty States: Distinct Contextual Messages */}
        {!isLoading && !errorMessage && displayItems.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
            {showFavoritesOnly ? (
              /* Empty Favorites State */
              <>
                <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                  <Heart className="w-8 h-8" aria-hidden="true" />
                </div>
                <div className="space-y-1.5">
                  <h2 className="text-xl font-bold text-white">No tienes favoritos en esta categoría</h2>
                  <p className="text-xs sm:text-sm text-zinc-300 max-w-md">
                    Haz clic en el corazón de cualquier personaje u obra para marcarlo como favorito y verlo aquí.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowFavoritesOnly(false)}
                  className="min-h-[44px] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-white/10 hover:bg-white/15 rounded-xl border border-white/20 transition-all focus-visible:ring-2 focus-visible:ring-indigo-400"
                >
                  Ver todos los elementos
                </button>
              </>
            ) : searchQuery ? (
              /* Search Empty State */
              <>
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400">
                  <SearchX className="w-8 h-8" aria-hidden="true" />
                </div>
                <div className="space-y-1.5">
                  <h2 className="text-xl font-bold text-white">No se encontraron resultados</h2>
                  <p className="text-xs sm:text-sm text-zinc-300 max-w-md">
                    Ningún elemento coincide con tu búsqueda «<span className="text-white font-semibold">{searchQuery}</span>».
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedTag(null);
                  }}
                  className="min-h-[44px] px-5 py-2.5 text-xs sm:text-sm font-semibold text-indigo-300 hover:text-white bg-indigo-500/15 hover:bg-indigo-500/25 rounded-xl border border-indigo-500/30 transition-all focus-visible:ring-2 focus-visible:ring-indigo-400"
                >
                  Restablecer búsqueda
                </button>
              </>
            ) : (
              /* Completely Empty Category State */
              <>
                <div className="w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Plus className="w-8 h-8" aria-hidden="true" />
                </div>
                <div className="space-y-1.5">
                  <h2 className="text-xl font-bold text-white">Esta categoría aún no tiene elementos</h2>
                  <p className="text-xs sm:text-sm text-zinc-300 max-w-md">
                    Crea o agrega tus personajes u obras favoritas para completar este Top.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddCategoryModalOpen(true)}
                  className="min-h-[44px] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] focus-visible:ring-2 focus-visible:ring-indigo-400"
                >
                  Editar o Importar JSON
                </button>
              </>
            )}
          </div>
        )}

        {/* 4. Success State: Render items according to viewMode */}
        {!isLoading && !errorMessage && displayItems.length > 0 && (
          <AnimatePresence mode="wait">
            {viewMode === 'cards' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayItems.map((item) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    onOpenDetail={openDetail}
                    isFavorite={isFavorite(item.id)}
                    onToggleFavorite={toggleFavorite}
                    onCopyQuote={copyQuote}
                    hasCopied={copiedQuote}
                  />
                ))}
              </div>
            )}

            {viewMode === 'podium' && (
              <PodiumView items={displayItems} onOpenDetail={openDetail} />
            )}

            {viewMode === 'compact' && (
              <CompactListView
                items={displayItems}
                onOpenDetail={openDetail}
                onCopyQuote={copyQuote}
                copiedItemId={null}
              />
            )}
          </AnimatePresence>
        )}
      </main>

      {/* Footer with high contrast and readable text */}
      <Footer
        totalCategories={categories.length}
        totalItems={totalAllItems}
        onOpenBrandKit={() => setIsBrandModalOpen(true)}
      />

      {/* Item Detail Sheet Modal with Focus Trap and ARIA dialog */}
      <ItemDetailModal
        item={selectedItem}
        onClose={closeDetail}
        isFavorite={selectedItem ? isFavorite(selectedItem.id) : false}
        onToggleFavorite={toggleFavorite}
        onCopyQuote={copyQuote}
        hasCopiedQuote={copiedQuote}
      />

      {/* Share Top Modal with direct WhatsApp integration */}
      <ShareTopModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        category={currentCategory}
        items={displayItems}
        onCopySummary={copyFullTopSummary}
        hasCopied={copiedShareCard}
        generateText={generateShareText}
      />

      {/* Add New Category Modal with accessible linked labels */}
      <AddCategoryModal
        isOpen={isAddCategoryModalOpen}
        onClose={() => setIsAddCategoryModalOpen(false)}
        onAddCategory={addNewCategory}
      />

      {/* Brand Assets & Logo Kit Modal with SVG & PNG exporters */}
      <BrandAssetsModal
        isOpen={isBrandModalOpen}
        onClose={() => setIsBrandModalOpen(false)}
      />
    </div>
  );
}

export default App;
