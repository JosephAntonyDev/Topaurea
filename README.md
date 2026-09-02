# ✨ Topáurea — Santuario de Cosas Favoritas & Tops Personales

> **Topáurea** es una plataforma web interactiva de curaduría personal diseñada para registrar, explorar y compartir gustos, obras de ficción y convicciones personales con una estética editorial de alta gama (inspirada en los estándares de diseño de Apple y Linear) y arquitectura limpia desacoplada (**MVVM + SOLID**).

---

## 🎨 Identidad Visual & Logotipo Oficial (Vectorial Puro, Sin IA)

El logotipo de **Topáurea** fue construido mediante proporciones áureas geométricas ($\Phi \approx 1.618$), combinando:
1. **La 'T' de Cúspide (Top):** Una viga superior aerodinámica y un pilar central que representa el podio y el santuario de tus obras maestras.
2. **La Estrella Áurea:** Un diamante astral hiperbólico de 4 puntas que simboliza la chispa de excelencia y la divina proporción.
3. **Escalabilidad Vectorial Pura:** Sin artefactos ni filtros borrosos de IA; renderizado en SVG matemático de alta precisión.

### Formatos y Variantes Exportadas (en `/public`):
* `topaurea-icon.svg` — Isotipo / App Icon oficial en squircle oscuro (Favicon, PWA y apps).
* `topaurea-wordmark.svg` — Logotipo horizontal completo con tipografía de precisión y badge *VAULT*.
* `topaurea-mobile.svg` — Versión compacta optimizada para pantallas móviles.
* `topaurea-monogram.svg` — Emblema circular con anillo de refracción áurea para redes sociales (Discord, GitHub, X).
* `topaurea-mono-white.svg` — Monocromático blanco puro para grabados, serigrafía y fondos oscuros.
* `topaurea-mono-black.svg` — Monocromático negro puro para documentos y sellos.
* *Disponible exportación interactiva a PNG (512px / 1024px) y copia de código SVG con 1 clic en el botón **`Kit de Marca`** de la barra superior.*

---

## 🚀 Comandos Rápidos para Ejecutar el Proyecto

### 1. Iniciar en Modo Desarrollo (Dev Server)

```bash
# Comando estándar:
npm run dev

# En Windows PowerShell (si tienes restringida la ejecución de scripts .ps1):
npm.cmd run dev
# o bien:
cmd.exe /c "npm run dev"
```

Abre tu navegador en: **`http://localhost:5173/`**

> ℹ️ **Nota:** El servidor ya se encuentra actualmente en ejecución en segundo plano en el puerto `5173`.

---

### 2. Compilar para Producción

```bash
npm.cmd run build
```
*Ejecuta `tsc -b` (verificación de tipos TypeScript estricta) seguido del empaquetado de producción con Vite.*

### 3. Previsualizar el Build de Producción

```bash
npm.cmd run preview
```

---

## 🏆 Contenido Principal: Top 10 Personajes de Ficción

La aplicación viene precargada con tu Top 10 oficial y mención honorífica:

1. **#01 Son Goku (Ultra Instinto)** — *«Incluso un guerrero de clase baja puede sobrepasar a un guerrero distinguido si se esfuerza lo suficiente.»*
2. **#02 Gojo Satoru** — *«En todo el cielo y la tierra, solo yo soy el venerado. Tranquilo, después de todo... soy el más fuerte.»*
3. **#03 Garou** — *«¿El bien? ¿El mal? Los rechazo a ambos. Me convertiré en el mal absoluto para obligar al mundo entero a unirse contra mí.»*
4. **#04 Kakashi Hatake** — *«Perdón por llegar tarde, es que me perdí en el sendero de la vida...»*
5. **#05 Sylphiette Greyrat (Adulta)** — *«No importa qué tan difícil sea el camino o cuántas veces dudes, siempre estaré a tu lado para sostenerte. Para mí, tú eres todo mi mundo.»*
6. **#06 William James Moriarty** — *«Atrápame si puedes, Sr. Holmes. Por el bien de un mundo donde el pueblo no tenga que llorar bajo la tiranía de unos pocos.»*
7. **#07 Lelouch Vi Britannia** — *«El único que debe disparar es aquel que está preparado para recibir el disparo.»*
8. **#08 Killua Zoldyck** — *«Gon, tú eres mi luz. Pero a veces brillas con tanta fuerza que me deslumbra y me resulta difícil mirarte.»*
9. **#09 Rick Sanchez** — *«Vivir es arriesgarlo todo. De lo contrario, eres solo un pedazo de materia esperando desintegrarse... sé mejor que yo.»*
10. **#10 X (Transformación Blanca)** — *«En un mundo donde la confianza de las masas define el poder, la verdadera supremacía nace del silencio.»*
* **Mención de Honor: Spider-Man (Peter Parker)** — *«Un gran poder conlleva una gran responsabilidad.»*

---

## 🎨 Características UI/UX y Accesibilidad

* **3 Modos de Visualización:**
  * **Modo Editorial (Cards):** Tarjetas cinematográficas con retratos de alta definición, citas destacadas y números de rango translúcidos.
  * **Modo Podio (Tier):** Podio olímpico interactivo para el Top 1 (Oro), Top 2 (Plata) y Top 3 (Bronce).
  * **Modo Lista Compacta:** Vista de alta densidad para comparar y escanear rápidamente.
* **Métricas de Resonancia:** Evaluación visual de cada elemento en *Impacto*, *Profundidad* y *Aura*.
* **Búsqueda y Filtros Rápidos:** Atajo de teclado `/` para enfocar la búsqueda al instante. Filtro por etiquetas temáticas (*Anime, Filosofía, Lore, etc.*).
* **Filtro Real de Favoritos:** Guarda tus personajes con el corazón y visualízalos con el botón *Favoritos (N)*.
* **Compartición en 1 Clic:** Modal para compartir por WhatsApp o copiar resumen formateado con confeti.
* **Cumplimiento WCAG 2.1 AA:**
  * Áreas de contacto táctil mínimas de 44x44px.
  * Navegación completa por teclado con anillos de foco visibles (`:focus-visible`).
  * Diálogos accesibles con `role="dialog"` y cierre con `Escape`.
  * Soporte nativo para `@media (prefers-reduced-motion)`.

---

## 🏛️ Arquitectura del Proyecto (MVVM + SOLID)

```
src/
├── domain/                    # Capa de Dominio (Entidades puras y contratos)
│   ├── models/                # TopItem.ts, Category.ts
│   └── repositories/          # ICategoryRepository.ts (Dependency Inversion)
├── data/                      # Capa de Datos (Fuentes JSON y repositorios)
│   ├── sources/               # characters.json, videogames.json, cinema.json
│   └── repositories/          # LocalCategoryRepository.ts (JSON + localStorage)
├── viewmodels/                # Capa ViewModel (Lógica de estado reactiva)
│   ├── useCategoryViewModel.ts   # Manejo de categorías, búsqueda, orden y favoritos
│   └── useItemDetailViewModel.ts # Manejo de modales, copiado y favoritos
├── views/                     # Capa de Vistas (Componentes UI desacoplados)
│   └── components/
│       ├── ui/                # Badge, RankPill, StatBar, ImageWithFallback
│       ├── layout/            # Navbar, HeroSpotlight, Footer
│       ├── category/          # CategoryNav, CategoryFilterBar
│       ├── items/             # ItemCard, PodiumView, CompactListView
│       └── modal/             # ItemDetailModal, ShareTopModal, AddCategoryModal
├── App.tsx                    # Orquestador principal
├── main.tsx                   # Punto de entrada de React 19
└── index.css                  # Tailwind CSS v4 + Tokens de diseño
```

---

## ➕ Cómo Agregar una Nueva Categoría

Puedes agregar nuevas categorías en cualquier momento sin tocar una sola línea de código:

1. Haz clic en el botón **`+ Nueva Categoría`** en la barra superior.
2. Puedes usar el **Formulario Rápido** o el modo **Pegar JSON (Pro)** con la siguiente estructura:

```json
{
  "id": "mis-animes-favoritos",
  "name": "Animes Inolvidables",
  "shortName": "Animes",
  "subtitle": "Historias que cambiaron mi perspectiva de vida",
  "description": "Una selección de las series animadas más influyentes.",
  "icon": "Flame",
  "accentColor": "#6366f1",
  "gradient": "from-indigo-500 to-purple-600",
  "tags": ["Shonen", "Seinen", "Filosofía"],
  "items": [
    {
      "id": "hunter-x-hunter",
      "rank": 1,
      "title": "Hunter x Hunter (2011)",
      "subtitle": "Madhouse / Yoshihiro Togashi",
      "work": "Anime",
      "quote": "Disfruta de los pequeños desvíos en el camino.",
      "whyFavorite": "El arco de las Hormigas Quimera es la deconstrucción psicológica más brillante del anime.",
      "imageUrl": "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1000&auto=format&fit=crop",
      "themeColor": "#38bdf8",
      "accentGradient": "from-sky-400 to-indigo-600",
      "badges": ["Obra Maestra", "Psicológico"],
      "personalityTraits": ["Estratégico", "Profundo"],
      "tier": "S+",
      "stats": { "impact": 100, "depth": 100, "aura": 98 }
    }
  ]
}
```

*Las categorías personalizadas creadas se guardan localmente y cuentan con su propio botón de eliminación en la barra de navegación.*

---

## 🛠️ Tecnologías

* **Vite 8** — Bundler de compilación ultrarrápida.
* **React 19** + **TypeScript** — Tipado estricto bajo `verbatimModuleSyntax`.
* **Tailwind CSS v4** — Motor compilado en Rust (Oxide) para rendimiento extremo.
* **Framer Motion** — Animaciones con física de resortes cinéticos.
* **Lucide React** — Iconografía minimalista moderna.
* **Canvas Confetti** — Micro-interacción de celebración al compartir.
