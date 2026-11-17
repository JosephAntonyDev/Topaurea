import { useEffect, useState } from 'react';
import { ArrowDown, ArrowDownUp, ArrowRight, ArrowUpRight, Bookmark, Check, ChevronRight, Film, Gamepad2, Grid2X2, Heart, Layers3, List, Menu, Plus, Search, SlidersHorizontal, Sparkles, Trophy, Users, X } from 'lucide-react';
import { useCategoryViewModel } from './viewmodels/useCategoryViewModel';
import { useItemDetailViewModel } from './viewmodels/useItemDetailViewModel';
import type { TopItem } from './domain/models/TopItem';
import { Artwork, BrandMark } from './views/components/editorial/Identity';
import { CollectionDialogs } from './views/components/editorial/CollectionDialogs';
import './App.css';

const categoryIcons = { characters: Users, videogames: Gamepad2, cinema: Film };
const categoryCopy: Record<string, { title: string; emphasis: string; description: string }> = {
  characters: { title: 'Personajes que', emphasis: 'dejan huella.', description: 'Héroes imperfectos. Mentes extraordinarias. Historias que se quedan contigo.' },
  videogames: { title: 'Mundos para', emphasis: 'perderse.', description: 'Más que una partida. Lugares, historias y aventuras a los que siempre volvería.' },
  cinema: { title: 'Historias para', emphasis: 'quedarse.', description: 'Una escena, una banda sonora, una forma distinta de mirar el mundo.' },
};

export function App() {
  const detail = useItemDetailViewModel();
  const vm = useCategoryViewModel('characters', detail.favoriteIds);
  const [dialog, setDialog] = useState<'share' | 'create' | 'brand' | 'about' | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [pendingDelete, setPendingDelete] = useState(false);
  const total = vm.categories.reduce((sum, category) => sum + category.items.length, 0);
  const copy = categoryCopy[vm.activeCategoryId] || { title: 'Un universo', emphasis: 'muy tuyo.', description: vm.currentCategory?.description || 'Cada favorito tiene una historia. Este es su lugar.' };
  const feature = vm.top1Item;

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (event.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) && !target.isContentEditable && !document.querySelector('dialog[open]')) {
        event.preventDefault(); document.getElementById('top-search-input')?.focus();
      }
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(''), 2800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (!menuOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const sidebar = document.querySelector<HTMLElement>('.sidebar');
    const controls = () => Array.from(sidebar?.querySelectorAll<HTMLElement>('a, button') || []);
    controls()[0]?.focus();
    const onTab = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const elements = controls();
      const first = elements[0];
      const last = elements.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onTab);
    return () => { document.removeEventListener('keydown', onTab); document.body.style.overflow = previousOverflow; previousFocus?.focus(); };
  }, [menuOpen]);

  const selectCategory = (id: string) => {
    vm.setActiveCategoryId(id); vm.setSelectedTag(null); vm.setSearchQuery(''); vm.setShowFavoritesOnly(false); setMenuOpen(false); setPendingDelete(false);
  };
  const favorite = (id: string) => {
    setToast(detail.isFavorite(id) ? 'Eliminado de tus favoritos' : 'Guardado en tus favoritos'); detail.toggleFavorite(id);
  };
  const renderCard = (item: TopItem, index: number) => (
    <article className="collection-card" key={item.id} style={{ animationDelay: `${Math.min(index, 7) * 45}ms` }}>
      <div className={`card-artwork artwork-tone-${index % 4}`}>
        <button className="artwork-link" onClick={() => detail.openDetail(item)} aria-label={`Explorar ${item.title}`}><Artwork item={item} /></button>
        <span className="card-position">{item.isHonorary ? 'Mención especial' : `Nº ${String(item.rank).padStart(2, '0')}`}</span>
        <button className={`save-button ${detail.isFavorite(item.id) ? 'is-saved' : ''}`} onClick={() => favorite(item.id)} aria-label={`${detail.isFavorite(item.id) ? 'Quitar' : 'Guardar'} ${item.title} en favoritos`} aria-pressed={detail.isFavorite(item.id)}><Bookmark size={16} fill={detail.isFavorite(item.id) ? 'currentColor' : 'none'} /></button>
        <span className="artwork-explore">Ver historia <ArrowUpRight size={17} /></span>
      </div>
      <div className="card-caption"><span className="eyebrow">{item.work}</span><button onClick={() => detail.openDetail(item)} className="card-title">{item.title}<ArrowUpRight size={18} /></button><p>{item.subtitle}</p><div className="card-bottom"><span>{item.badges[0] || 'Selección personal'}</span><span className="tier-label">{item.tier || 'A'}</span></div></div>
    </article>
  );

  return (
    <div className="app-shell">
      <a className="skip-link" href="#collection">Ir a la colección</a>
      {menuOpen && <button className="sidebar-backdrop" aria-label="Cerrar navegación" onClick={() => setMenuOpen(false)} />}
      <aside className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`}>
        <a className="brand" href="#" aria-label="Topáurea, inicio" onClick={() => { selectCategory('characters'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}><BrandMark /><span>topáurea<span className="brand-period">.</span></span></a>
        <div className="sidebar-intro"><span className="status-dot" /> UN ARCHIVO MUY PERSONAL</div>
        <div className="nav-section-label">TU ESPACIO <span>01—03</span></div>
        <nav className="main-nav" aria-label="Navegación principal">
          <button className={!vm.showFavoritesOnly ? 'nav-active' : ''} onClick={() => { vm.setShowFavoritesOnly(false); setMenuOpen(false); }}><Layers3 size={18} /><span>Mi colección</span><span className="nav-count">{total}</span></button>
          <button className={vm.showFavoritesOnly ? 'nav-active' : ''} onClick={() => { vm.setShowFavoritesOnly(true); vm.setSearchQuery(''); vm.setSelectedTag(null); setMenuOpen(false); }}><Bookmark size={18} /><span>Favoritos</span><span className="nav-count">{detail.favoriteIds.length}</span></button>
          <button onClick={() => { setDialog('about'); setMenuOpen(false); }}><Sparkles size={18} /><span>El manifiesto</span><ArrowUpRight size={15} /></button>
        </nav>
        <div className="nav-section-label collection-label">COLECCIONES <button aria-label="Crear colección" onClick={() => { setMenuOpen(false); setDialog('create'); }}><Plus size={16} /></button></div>
        <nav className="category-nav" aria-label="Colecciones">{vm.categories.map(category => {
          const Icon = categoryIcons[category.id as keyof typeof categoryIcons] || Layers3;
          return <button key={category.id} aria-current={vm.activeCategoryId === category.id ? 'page' : undefined} className={vm.activeCategoryId === category.id ? 'category-active' : ''} onClick={() => selectCategory(category.id)}><Icon size={17} /><span>{category.shortName || category.name}</span><span className="category-count">{String(category.items.length).padStart(2, '0')}</span></button>;
        })}</nav>
        <button className="new-collection" onClick={() => { setMenuOpen(false); setDialog('create'); }}><Plus size={16} /> Nueva colección</button>
        <div className="sidebar-bottom"><div className="personal-note"><BrandMark /><p>Hay cosas que te gustan.<br />Y cosas que <em>te definen.</em></p><span>GUARDA LO QUE IMPORTA.</span></div><button className="profile" onClick={() => setDialog('about')}><span className="profile-avatar">T.</span><span>Mi universo<small>Curado con intención</small></span><ArrowUpRight size={16} /></button></div>
      </aside>
      <div className="workspace">
        <header className="topbar"><div className="breadcrumb"><button className="mobile-menu icon-button" aria-label="Abrir navegación" onClick={() => setMenuOpen(true)}><Menu size={21} /></button><span>Mi universo</span><ChevronRight size={13} /><strong>{vm.showFavoritesOnly ? 'Favoritos' : vm.currentCategory?.shortName || 'Mi colección'}</strong></div><div className="topbar-actions"><span className="local-status"><span className="status-dot" /> Tu espacio, a tu ritmo</span><button className="share-top" onClick={() => setDialog('share')}>Compartir colección <ArrowUpRight size={16} /></button></div></header>
        <main className="main-content">
          <section className="page-intro"><div><div className="eyebrow intro-eyebrow"><span className="tiny-star">✳</span> EL ARCHIVO DE LO EXTRAORDINARIO</div><h1>{vm.showFavoritesOnly ? 'Siempre entre ' : `${copy.title} `}<em>{vm.showFavoritesOnly ? 'mis favoritos.' : copy.emphasis}</em></h1><p>{vm.showFavoritesOnly ? 'Una selección dentro de la selección. Eso que merece un lugar especial.' : copy.description}</p></div><a className="intro-scroll" href="#collection" aria-label="Explorar colección"><ArrowDown size={21} /></a></section>
          {!vm.showFavoritesOnly && feature && !vm.isLoading && <section className={`feature feature-${vm.activeCategoryId}`} aria-label="La selección destacada" key={feature.id}>
            <div className="feature-copy"><div className="feature-kicker"><span className="feature-dot" /> LA JOYA DE LA COLECCIÓN<span className="feature-edition">VOL. {String(vm.categories.findIndex(c => c.id === vm.activeCategoryId) + 1).padStart(2, '0')}</span></div><div className="feature-work">{feature.work}</div><h2>{feature.title}<span>.</span></h2><p className="feature-subtitle">{feature.subtitle}</p><blockquote>“{feature.quote}”</blockquote><button className="button button-yellow" onClick={() => detail.openDetail(feature)}>Descubrir su historia <ArrowUpRight size={18} /></button><div className="feature-footnote"><span>SELECCIÓN PERSONAL</span><span>{feature.tier || 'S'} TIER <span className="small-dot">·</span> Nº 01</span></div></div>
            <button className="feature-art" onClick={() => detail.openDetail(feature)} aria-label={`Ver la historia de ${feature.title}`}><span className="feature-orbit" /><span className="feature-number" aria-hidden="true">01</span><Artwork item={feature} priority /><span className="feature-art-caption"><span>{feature.alignment || 'Una obra para recordar'}</span><ArrowUpRight size={20} /></span><span className="curator-seal" aria-hidden="true">THE PERSONAL<br /><b>✳</b><br />COLLECTION</span></button>
          </section>}
          <section id="collection" className="collection-section" aria-label="Colección">
            <div className="collection-heading"><div><span className="eyebrow">BUEN GUSTO. CERO ALGORITMOS.</span><h2>{vm.showFavoritesOnly ? 'Mis favoritos' : 'La colección'}<span>({String(vm.displayItems.length).padStart(2, '0')})</span></h2></div><div className="view-options" role="group" aria-label="Vista de la colección"><button title="Cuadrícula" aria-label="Vista de cuadrícula" aria-pressed={vm.viewMode === 'cards'} onClick={() => vm.setViewMode('cards')}><Grid2X2 size={17} /></button><button title="Lista" aria-label="Vista de lista" aria-pressed={vm.viewMode === 'compact'} onClick={() => vm.setViewMode('compact')}><List size={19} /></button><button title="Podio" aria-label="Vista de podio" aria-pressed={vm.viewMode === 'podium'} onClick={() => vm.setViewMode('podium')}><Trophy size={17} /></button></div></div>
            <div className="collection-toolbar"><label className="search-field"><Search size={17} /><input id="top-search-input" value={vm.searchQuery} onChange={event => vm.setSearchQuery(event.target.value)} placeholder={`Buscar en ${vm.currentCategory?.shortName.toLocaleLowerCase() || 'esta colección'}…`} aria-label="Buscar en esta colección" />{vm.searchQuery ? <button aria-label="Borrar búsqueda" onClick={() => vm.setSearchQuery('')}><X size={15} /></button> : <kbd>/</kbd>}</label><div className="toolbar-controls"><label className="sort-control"><ArrowDownUp size={15} /><select aria-label="Orden de la colección" value={vm.sortBy} onChange={event => vm.setSortBy(event.target.value as 'rank' | 'name' | 'work')}><option value="rank">Por ranking</option><option value="name">Por nombre</option><option value="work">Por obra</option></select></label><button className={`filter-button ${filtersOpen || vm.selectedTag ? 'filter-active' : ''}`} onClick={() => setFiltersOpen(!filtersOpen)} aria-expanded={filtersOpen}><SlidersHorizontal size={16} /><span>Filtros</span>{vm.selectedTag && <span className="filter-dot" />}</button></div></div>
            {filtersOpen && <div className="filter-tags"><span>Explorar por</span><button className={!vm.selectedTag ? 'tag-selected' : ''} onClick={() => vm.setSelectedTag(null)}>Todo</button>{vm.availableTags.map(tag => <button key={tag} className={vm.selectedTag === tag ? 'tag-selected' : ''} onClick={() => vm.setSelectedTag(vm.selectedTag === tag ? null : tag)}>{tag}</button>)}</div>}
            <div className="collection-meta"><span>{vm.currentCategory?.shortName}<span className="meta-divider">/</span>{vm.displayItems.length} {vm.displayItems.length === 1 ? 'imprescindible' : 'imprescindibles'}{vm.showFavoritesOnly ? ' guardados' : ''}</span><span>Una lista subjetiva. Como debe ser.</span></div>
            {vm.isLoading ? <div className="loading-state" role="status">Abriendo el archivo…</div> : vm.errorMessage ? <div className="empty-state" role="alert"><h3>No pudimos abrir la colección.</h3><p>{vm.errorMessage}</p><button className="button button-dark" onClick={vm.refreshCategories}>Volver a intentar</button></div> : vm.displayItems.length === 0 ? <div className="empty-state"><Search size={30} /><h3>{vm.searchQuery || vm.selectedTag ? 'Todavía no encontramos esa joya.' : vm.showFavoritesOnly ? 'Tus próximos favoritos están aquí.' : 'El inicio de una gran colección.'}</h3><p>{vm.searchQuery || vm.selectedTag ? 'Prueba con otro nombre o quita los filtros.' : vm.showFavoritesOnly ? 'Guarda una pieza con el marcador y vuelve a encontrarla aquí.' : 'Añade tus primeras piezas importando una colección.'}</p><button className="button button-dark" onClick={() => { if (!vm.currentCategory?.items.length) setDialog('create'); else { vm.setSearchQuery(''); vm.setSelectedTag(null); vm.setShowFavoritesOnly(false); } }}>{!vm.currentCategory?.items.length ? 'Importar colección' : 'Ver toda la colección'}<ArrowRight size={16} /></button></div> : vm.viewMode === 'compact' ? <div className="collection-list">{vm.displayItems.map(item => <article key={item.id} className="list-item"><span className="list-rank">{item.isHonorary ? '✳' : String(item.rank).padStart(2, '0')}</span><button className="list-image" onClick={() => detail.openDetail(item)} aria-label={`Ver ${item.title}`}><Artwork item={item} /></button><button className="list-description" onClick={() => detail.openDetail(item)}><h3>{item.title}</h3><p>{item.work}</p></button><span className="list-badge">{item.badges[0]}</span><span className="tier-label">{item.tier || 'A'}</span><button className={`icon-button ${detail.isFavorite(item.id) ? 'is-saved' : ''}`} aria-label={`Guardar ${item.title} en favoritos`} aria-pressed={detail.isFavorite(item.id)} onClick={() => favorite(item.id)}><Bookmark size={18} fill={detail.isFavorite(item.id) ? 'currentColor' : 'none'} /></button><button className="icon-button" aria-label={`Ver detalles de ${item.title}`} onClick={() => detail.openDetail(item)}><ArrowUpRight size={19} /></button></article>)}</div> : <><div className={vm.viewMode === 'podium' ? 'collection-grid podium-grid' : 'collection-grid'}>{(vm.viewMode === 'podium' ? [...vm.displayItems].sort((a, b) => Number(!!a.isHonorary) - Number(!!b.isHonorary) || a.rank - b.rank).slice(0, 3) : vm.displayItems).map(renderCard)}</div>{vm.viewMode === 'podium' && <p className="podium-note"><Trophy size={15} /> Las tres primeras posiciones de esta selección.</p>}</>}
            {vm.isCurrentCategoryCustom && <div className="delete-collection">{pendingDelete ? <><span>¿Eliminar esta colección de este dispositivo?</span><button onClick={async () => { await vm.deleteCategory(vm.activeCategoryId); setPendingDelete(false); setToast('Colección eliminada'); }}>Sí, eliminar</button><button onClick={() => setPendingDelete(false)}>Cancelar</button></> : <button onClick={() => setPendingDelete(true)}>Eliminar colección</button>}</div>}
          </section>
          <section className="closing-note"><span className="closing-star" aria-hidden="true">✳</span><p>No es una lista cualquiera.<br />Es un pequeño mapa de <em>quién soy.</em></p><button onClick={() => setDialog('create')}>La próxima obsesión tiene su lugar aquí <Plus size={17} /></button></section>
          <footer className="footer"><span>topáurea. <span>Un universo propio.</span></span><button onClick={() => setDialog('brand')}>Identidad de marca <ArrowUpRight size={13} /></button><span>Hecho con intención <Heart size={12} /></span></footer>
        </main>
      </div>
      <CollectionDialogs dialog={dialog} onClose={() => setDialog(null)} detail={detail} category={vm.currentCategory} items={vm.displayItems} onFavorite={favorite} onAddCategory={async category => { await vm.addNewCategory(category); vm.setSearchQuery(''); vm.setSelectedTag(null); vm.setShowFavoritesOnly(false); }} onToast={setToast} />
      <div className={`toast ${toast ? 'toast-visible' : ''}`} role="status">{toast && <><Check size={16} />{toast}</>}</div>
    </div>
  );
}

export default App;
