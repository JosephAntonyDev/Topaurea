// Topáurea's eight-point archive mark. SVG exports share the interface identity.
const mark = (color: string, center: string) => `<path d="M20 2v36M2 20h36M7.3 7.3l25.4 25.4M7.3 32.7 32.7 7.3" stroke="${color}" stroke-width="6.5"/><circle cx="20" cy="20" r="5" fill="${center}"/>`;
export const SVG_ICON_DARK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#252a23"/><g transform="translate(12 12)">${mark('#eacd57', '#252a23')}</g></svg>`;
export const SVG_ICON_TRANSPARENT = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">${mark('#b39437', '#f7f6f2')}</svg>`;
export const SVG_WORDMARK_DARK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 310 80"><rect width="310" height="80" rx="6" fill="#f7f6f2"/><g transform="translate(18 20)">${mark('#b39437', '#f7f6f2')}</g><text x="72" y="55" font-family="Arial,sans-serif" font-size="43" font-weight="600" letter-spacing="-2" fill="#252a23">topáurea<tspan fill="#b39437">.</tspan></text></svg>`;
export const SVG_MOBILE = SVG_WORDMARK_DARK;
export const SVG_MONOGRAM = SVG_ICON_DARK;
export const SVG_MONO_WHITE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><g transform="translate(12 12)">${mark('#f7f6f2', '#252a23')}</g></svg>`;
export const SVG_MONO_BLACK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><g transform="translate(12 12)">${mark('#252a23', '#f7f6f2')}</g></svg>`;
