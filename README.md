# Topáurea — Un universo propio

Un archivo personal de personajes, videojuegos y cine, con una identidad editorial: papel marfil, tinta oscura, acento áureo y tipografía DM Sans + Instrument Serif.

## Desarrollo

```sh
npm install
npm run dev
npm run build
npm run preview
```

React 19, TypeScript y Vite. No requiere servidor de datos ni cuenta.

## Funciones

- Colecciones con portada, fichas, citas, atributos y enlaces musicales.
- Vistas de cuadrícula, lista y podio; orden por ranking, nombre u obra.
- Búsqueda con atajo `/`, filtros por obras presentes en la colección y favoritos persistentes.
- Creación de colecciones mediante formulario, con una primera pieza opcional.
- Importación JSON validada y exportación de la selección actual.
- Compartir mediante copia de texto o WhatsApp.
- Identidad descargable en SVG y logotipo en PNG.
- Navegación móvil, diálogos nativos con foco contenido, cierre con Escape y respeto a movimiento reducido.

## Estructura

- `src/App.tsx`: navegación y composición de la colección.
- `src/views/components/editorial/`: identidad, imágenes, fichas y formularios.
- `src/viewmodels/`: selección, búsqueda, orden y favoritos.
- `src/data/sources/`: colecciones iniciales.
- `src/data/repositories/`: persistencia de colecciones propias.
- `src/data/assets/logoDefinitions.ts`: identidad SVG exportable.
- `public/artwork/`: imágenes locales; procedencia en `SOURCES.md`.
- `src/index.css` y `src/App.css`: tokens, estilos, transiciones y responsive.

Los favoritos y las colecciones propias se guardan en localStorage de este navegador. Para conservar o trasladar una colección, utiliza **Compartir colección → Exportar JSON**. Los datos anteriores de Topáurea/AuraVault siguen siendo compatibles.

Las fuentes se cargan desde Google Fonts, con alternativas del sistema. Las imágenes iniciales se sirven localmente; una colección importada puede enlazar imágenes externas.
