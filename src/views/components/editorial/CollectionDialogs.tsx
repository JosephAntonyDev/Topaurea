import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Bookmark, Check, Copy, Download, Music2, Plus, X } from 'lucide-react';
import type { Category } from '../../../domain/models/Category';
import type { TopItem } from '../../../domain/models/TopItem';
import type { useItemDetailViewModel } from '../../../viewmodels/useItemDetailViewModel';
import { Artwork, BrandMark } from './Identity';
import { SVG_ICON_DARK, SVG_WORDMARK_DARK } from '../../../data/assets/logoDefinitions';

type DetailModel = ReturnType<typeof useItemDetailViewModel>;
interface Props {
  dialog: 'share' | 'create' | 'brand' | 'about' | null;
  onClose: () => void;
  detail: DetailModel;
  category: Category | null;
  items: TopItem[];
  onFavorite: (id: string) => void;
  onAddCategory: (category: Category) => Promise<void>;
  onToast: (message: string) => void;
}

function download(content: string, filename: string, mime: string) {
  const url = URL.createObjectURL(new Blob([content], { type: mime }));
  const link = document.createElement('a');
  link.href = url; link.download = filename; link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1500);
}

async function downloadPng(svg: string) {
  const image = new Image();
  image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  await image.decode();
  const canvas = document.createElement('canvas');
  canvas.width = 1240; canvas.height = 320;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('No se pudo exportar la imagen.');
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/png'); link.download = 'topaurea-wordmark.png'; link.click();
}

const example = {
  name: 'Música para volver', shortName: 'Música', description: 'Las canciones que siempre me acompañan.',
  items: [{ title: 'Space Oddity', work: 'David Bowie', subtitle: 'Un viaje de ida', quote: 'Una canción para mirar hacia arriba.', whyFavorite: 'Por su atmósfera y esa forma de contar una historia.', imageUrl: '', badges: ['Música'], personalityTraits: ['Atemporal'] }],
};

function normalizeCollection(raw: unknown): Category {
  if (!raw || typeof raw !== 'object' || !('name' in raw) || typeof raw.name !== 'string' || !raw.name.trim() || !('items' in raw) || !Array.isArray(raw.items)) throw new Error('La colección necesita un nombre y una lista de piezas (items).');
  const input = raw as Record<string, unknown>;
  const id = `collection-${crypto.randomUUID()}`;
  const strings = (value: unknown): string[] => Array.isArray(value) ? value.filter((v): v is string => typeof v === 'string') : [];
  const text = (value: unknown, fallback = ''): string => typeof value === 'string' ? value : fallback;
  const safeImage = (value: unknown): string => {
    const url = text(value);
    return /^https?:\/\//i.test(url) || /^\/(?!\/)/.test(url) ? url : '';
  };
  const items: TopItem[] = raw.items.map((value: unknown, index: number) => {
    if (!value || typeof value !== 'object' || !('title' in value) || typeof value.title !== 'string' || !value.title.trim()) throw new Error(`La pieza ${index + 1} necesita un título.`);
    const item = value as Record<string, unknown>;
    return { id: `${id}-${index + 1}`, rank: typeof item.rank === 'number' && item.rank > 0 ? item.rank : index + 1, title: text(item.title).trim(), work: text(item.work, 'Mi colección'), subtitle: text(item.subtitle), quote: text(item.quote), quoteContext: text(item.quoteContext), whyFavorite: text(item.whyFavorite), imageUrl: safeImage(item.imageUrl), fallbackImageUrl: safeImage(item.fallbackImageUrl), themeColor: /^#[0-9a-f]{6}$/i.test(text(item.themeColor)) ? text(item.themeColor) : '#b49c4b', accentGradient: '', badges: strings(item.badges), personalityTraits: strings(item.personalityTraits), tier: ['S+', 'S', 'A+', 'A', 'Honor'].includes(text(item.tier)) ? item.tier as TopItem['tier'] : 'A', alignment: text(item.alignment), isHonorary: item.isHonorary === true,
      ...(item.stats && typeof item.stats === 'object' ? { stats: Object.fromEntries(['impact', 'depth', 'aura'].map(key => [key, Math.max(0, Math.min(100, Number((item.stats as Record<string, unknown>)[key]) || 0))])) as TopItem['stats'] } : {}),
      ...(item.vibeSong && typeof item.vibeSong === 'object' && 'title' in item.vibeSong ? { vibeSong: { title: text(item.vibeSong.title), artist: 'artist' in item.vibeSong ? text(item.vibeSong.artist) : '' } } : {}),
    };
  });
  return { id, name: text(input.name).trim(), shortName: text(input.shortName, text(input.name)).trim(), subtitle: text(input.subtitle), description: text(input.description), icon: 'Layers3', accentColor: '#b49c4b', gradient: '', tags: strings(input.tags), items, lastUpdated: new Date().toISOString().slice(0, 10) };
}

function CreateCollection({ onAdd, onClose }: { onAdd: Props['onAddCategory']; onClose: () => void }) {
  const [mode, setMode] = useState<'form' | 'json'>('form');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [json, setJson] = useState(JSON.stringify(example, null, 2));
  const submit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault(); setError(''); setBusy(true);
    try {
      const data = new FormData(event.currentTarget);
      const input = mode === 'json' ? JSON.parse(json) : { name: data.get('name'), description: data.get('description'), items: data.get('title') ? [{ title: data.get('title'), work: data.get('work') || 'Mi colección', whyFavorite: data.get('reason'), imageUrl: data.get('image') }] : [] };
      await onAdd(normalizeCollection(input)); onClose();
    } catch (cause) { setError(cause instanceof SyntaxError ? 'El formato no es válido. Revisa las comillas y las comas del archivo JSON.' : cause instanceof Error ? cause.message : 'No se pudo guardar. Inténtalo de nuevo.'); }
    finally { setBusy(false); }
  };
  return <div className="dialog-body"><span className="eyebrow">UN NUEVO CAPÍTULO</span><h2>Hazle un lugar<br />a tu próxima obsesión.</h2><p className="dialog-intro">Canciones, libros, lugares. Si significa algo para ti, pertenece aquí.</p><div className="dialog-tabs" role="tablist" aria-label="Método de creación"><button role="tab" aria-selected={mode === 'form'} onClick={() => { setMode('form'); setError(''); }}>Crear colección</button><button role="tab" aria-selected={mode === 'json'} onClick={() => { setMode('json'); setError(''); }}>Importar JSON</button></div><form className="collection-form" onSubmit={submit}>
    {mode === 'form' ? <><label>Nombre de la colección<input name="name" required maxLength={60} placeholder="Por ejemplo, libros que me cambiaron" /></label><label>¿Qué la hace especial?<textarea name="description" maxLength={500} placeholder="Una pequeña nota sobre tu selección…" /></label><span className="eyebrow">LA PRIMERA PIEZA · OPCIONAL</span><label>Título<input name="title" maxLength={100} placeholder="Ese primer imprescindible" /></label><label>Autor, universo u obra<input name="work" maxLength={100} placeholder="¿De quién es o de dónde viene?" /></label><label>Por qué está aquí<textarea name="reason" maxLength={1500} placeholder="Lo que significa para ti…" /></label><label>Enlace a la imagen<input name="image" type="url" placeholder="https://…" /></label></> : <><p className="form-hint">Pega tu colección o usa el ejemplo. Cada pieza necesita un título; el resto de los detalles es opcional. Se importará como una colección nueva.</p><label>Contenido de la colección<textarea className="json-input" spellCheck={false} value={json} onChange={event => setJson(event.target.value)} required /></label><button type="button" className="text-action" onClick={() => download(JSON.stringify(example, null, 2), 'topaurea-ejemplo.json', 'application/json')}><Download size={13} /> Descargar ejemplo</button></>}
    {error && <p className="form-error" role="alert">{error}</p>}<p className="form-hint">Se guarda en este navegador. Exporta una copia para llevarla contigo.</p><div className="form-buttons"><button type="submit" className="button button-dark" disabled={busy}>{busy ? 'Guardando…' : mode === 'form' ? 'Crear mi colección' : 'Importar colección'}<Plus size={16} /></button><button type="button" className="button button-outline" onClick={onClose}>Cancelar</button></div>
  </form></div>;
}

export function CollectionDialogs({ dialog, onClose, detail, category, items, onFavorite, onAddCategory, onToast }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const item = detail.selectedItem;
  const open = !!dialog || !!item;
  const [copyState, setCopyState] = useState(false);
  const [shareError, setShareError] = useState('');
  const close = () => { if (item) detail.closeDetail(); else onClose(); setCopyState(false); setShareError(''); };

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (open && !element.open) element.showModal();
    if (!open && element.open) element.close();
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [open]);

  const shareText = detail.generateShareText(category, items);
  const copyShare = async () => {
    setShareError('');
    if (await detail.copyFullTopSummary(category, items)) setCopyState(true);
    else setShareError('No se pudo acceder al portapapeles. Puedes descargar la colección o seleccionar el texto de arriba.');
  };
  const exportJson = () => { if (category) download(JSON.stringify({ ...category, items }, null, 2), `topaurea-${category.id}.json`, 'application/json'); };

  return <dialog ref={ref} className={`editorial-dialog ${item ? 'detail-dialog' : ''}`} aria-labelledby="active-dialog-title" onCancel={event => { event.preventDefault(); close(); }} onClick={event => { if (event.target === event.currentTarget) { const rect = event.currentTarget.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close(); } }}>
    <h2 id="active-dialog-title" className="sr-only">{item?.title || (dialog === 'create' ? 'Crear una colección' : dialog === 'share' ? 'Compartir colección' : dialog === 'brand' ? 'Identidad de Topáurea' : 'El manifiesto')}</h2>
    <button className="dialog-close icon-button" aria-label="Cerrar ventana" onClick={close}><X size={18} /></button>
    {item ? <div className="detail-layout"><div className="detail-art"><Artwork key={item.id} item={item} priority /><span className="detail-rank">{item.isHonorary ? 'MENCIÓN ESPECIAL' : `Nº ${String(item.rank).padStart(2, '0')}`} · {item.tier || 'A'} TIER</span></div><div className="dialog-body"><span className="eyebrow">{item.work}</span><h2>{item.title}</h2><p className="detail-subtitle">{item.subtitle}</p>{item.quote && <><blockquote className="detail-quote">“{item.quote}”</blockquote><p className="quote-context">{item.quoteContext}</p><button className="text-action" onClick={async () => { const success = await detail.copyQuote(item.quote, item.title, item.work); onToast(success ? 'Cita copiada' : 'No se pudo copiar la cita'); }}>{detail.copiedQuote ? <Check size={13} /> : <Copy size={13} />}{detail.copiedQuote ? 'Cita copiada' : 'Guardar estas palabras'}</button></>}<div className="detail-reason"><h3>Por qué está en mi colección</h3><p>{item.whyFavorite || 'Algunas cosas no necesitan explicación. Simplemente conectan contigo.'}</p></div><div className="detail-traits">{item.personalityTraits.map(trait => <span key={trait}>{trait}</span>)}</div>{item.stats && <div className="detail-stats">{(['impact', 'depth', 'aura'] as const).map((stat, index) => <div key={stat}><small>{['Impacto', 'Profundidad', 'Aura'][index]}</small><strong>{item.stats![stat]}</strong><div className="stat-track"><span style={{ width: `${item.stats![stat]}%` }} /></div></div>)}</div>}<div className="detail-actions"><button className={`button ${detail.isFavorite(item.id) ? 'button-yellow' : 'button-dark'}`} onClick={() => onFavorite(item.id)} aria-pressed={detail.isFavorite(item.id)}><Bookmark size={15} fill={detail.isFavorite(item.id) ? 'currentColor' : 'none'} />{detail.isFavorite(item.id) ? 'En mis favoritos' : 'Guardar en favoritos'}</button></div>{item.vibeSong && <a className="music-link" href={`https://open.spotify.com/search/${encodeURIComponent(`${item.vibeSong.title} ${item.vibeSong.artist}`)}`} target="_blank" rel="noreferrer"><Music2 size={18} /><span>{item.vibeSong.title}<small>{item.vibeSong.artist} · Buscar en Spotify</small></span><ArrowUpRight size={15} /></a>}</div></div> : dialog === 'create' ? <CreateCollection key="create" onAdd={onAddCategory} onClose={close} /> : dialog === 'share' ? <div className="dialog-body"><span className="eyebrow">EL BUEN GUSTO SE COMPARTE</span><h2>Esto merece<br />una conversación.</h2><p className="dialog-intro">Comparte tu selección de {category?.shortName.toLocaleLowerCase() || 'favoritos'} o guarda una copia para importarla en otro dispositivo.</p><pre className="share-preview">{shareText || 'Tu colección está por comenzar.'}</pre><div className="share-options"><button className="button button-dark" onClick={copyShare}>{copyState ? <Check size={15} /> : <Copy size={15} />}{copyState ? 'Copiado' : 'Copiar selección'}</button><a className="button button-outline" href={`https://wa.me/?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight size={15} /></a><button className="button button-outline" onClick={exportJson} disabled={!category}><Download size={15} /> Exportar JSON</button></div>{shareError && <p className="form-error" role="alert">{shareError}</p>}</div> : dialog === 'brand' ? <div className="dialog-body"><span className="eyebrow">LA IDENTIDAD</span><h2>Una marca.<br />Un universo propio.</h2><p className="dialog-intro">Una estrella como punto de encuentro. Tinta, papel y un acento áureo. Una identidad pensada para que lo que coleccionas sea el protagonista.</p><div className="brand-preview"><div className="brand"><BrandMark /><span>topáurea.</span></div></div><div className="brand-swatches">{[['#F7F6F2', 'Papel'], ['#252A23', 'Tinta'], ['#EACD57', 'Áureo'], ['#858B74', 'Salvia']].map(([color, name]) => <div key={color}><i style={{ background: color }} />{name}<br />{color}</div>)}</div><div className="share-options"><button className="button button-dark" onClick={() => download(SVG_WORDMARK_DARK, 'topaurea-wordmark.svg', 'image/svg+xml')}><Download size={14} /> Logotipo SVG</button><button className="button button-outline" onClick={() => download(SVG_ICON_DARK, 'topaurea-icon.svg', 'image/svg+xml')}><Download size={14} /> Símbolo SVG</button><button className="button button-outline" onClick={() => { void downloadPng(SVG_WORDMARK_DARK).catch(() => onToast("No se pudo exportar el PNG")); }}><Download size={14} /> Logotipo PNG</button></div></div> : dialog === 'about' ? <div className="dialog-body"><div className="manifesto-mark"><BrandMark /></div><span className="eyebrow">EL MANIFIESTO TOPÁUREA</span><h2>Lo que te gusta<br />dice mucho de ti.</h2><p className="manifesto-copy">Un personaje que te enseñó a seguir. Un mundo al que siempre vuelves. Una película que todavía te acompaña.</p><p className="dialog-intro">Topáurea es un archivo para esas cosas. Un lugar para coleccionar con intención, ordenar tus obsesiones y recordar por qué importan.</p><div className="manifesto-principles"><p><span>01</span> Tu criterio es el único algoritmo.</p><p><span>02</span> Cada favorito tiene una historia.</p><p><span>03</span> Una colección nunca está terminada.</p></div><p className="form-hint">Tus favoritos y colecciones se guardan en este navegador. Sin cuenta, sin contadores sociales. Exporta tus colecciones para conservar una copia.</p></div> : null}
  </dialog>;
}
