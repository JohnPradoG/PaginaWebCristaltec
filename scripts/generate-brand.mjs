/**
 * Genera los archivos de marca de CRISTALTE (SVG vectoriales y PNG derivados).
 *
 * El texto del logotipo se convierte a trazos (paths) con la tipografía Manrope
 * ExtraBold, así el SVG se ve igual en cualquier equipo aunque no tenga la fuente.
 *
 * Uso: npm run brand
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import opentype from "opentype.js";
import sharp from "sharp";

const require = createRequire(import.meta.url);
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const brandDir = join(root, "public", "brand");
mkdirSync(brandDir, { recursive: true });

const COLORS = {
  navy: "#102D4A",
  blue: "#0878D1",
  blueOnDark: "#4BA3EA",
  steel: "#8794A0",
  white: "#FFFFFF",
};

const fontBuffer = readFileSync(
  require.resolve("@fontsource/manrope/files/manrope-latin-800-normal.woff"),
);
const font = opentype.parse(
  fontBuffer.buffer.slice(fontBuffer.byteOffset, fontBuffer.byteOffset + fontBuffer.byteLength),
);

/**
 * Serializa un path de opentype.js. Se evita Path.toPathData() porque su
 * optimización genera valores NaN con algunos glifos de Manrope.
 */
function pathData(path) {
  const n = (v) => Number(v.toFixed(2));
  return path.commands
    .map((c) => {
      if (c.type === "M" || c.type === "L") return `${c.type}${n(c.x)} ${n(c.y)}`;
      if (c.type === "Q") return `Q${n(c.x1)} ${n(c.y1)} ${n(c.x)} ${n(c.y)}`;
      if (c.type === "C") return `C${n(c.x1)} ${n(c.y1)} ${n(c.x2)} ${n(c.y2)} ${n(c.x)} ${n(c.y)}`;
      return "Z";
    })
    .join("");
}

/** Convierte un texto en un path SVG con espaciado entre letras. */
function textPath(text, x, baseline, size, tracking) {
  let cursor = x;
  const commands = [];
  for (const char of text) {
    const glyph = font.charToGlyph(char);
    commands.push(pathData(glyph.getPath(cursor, baseline, size)));
    cursor += (glyph.advanceWidth / font.unitsPerEm) * size + tracking;
  }
  return { d: commands.join(" "), end: cursor - tracking };
}

/**
 * Isotipo: hexágono abierto en forma de "C" (perfil de aluminio en perspectiva)
 * con una hoja de vidrio en su interior y un destello. Basado en la referencia
 * de marca entregada por el propietario. Cuadrícula de 64 × 64.
 */
function isotipo({ main, top, bottom, glass, glassEdge, mullion, glare }) {
  return [
    // Lado izquierdo de la "C" (perfil principal).
    `<path d="M32 4 L7.75 18 L7.75 46 L32 60 L32 51 L15.55 41.5 L15.55 22.5 L32 13 Z" fill="${main}"/>`,
    // Faceta superior derecha (perfil de aluminio).
    `<path d="M32 4 L56.25 18 L56.25 26.5 L48.45 22 L32 13 Z" fill="${top}"/>`,
    // Faceta inferior derecha (acento azul).
    `<path d="M32 60 L56.25 46 L56.25 37.5 L48.45 42 L32 51 Z" fill="${bottom}"/>`,
    // Montante vertical del marco.
    `<path d="M32.6 15.6 L35 14.2 L35 49.8 L32.6 48.4 Z" fill="${mullion}"/>`,
    // Hoja de vidrio.
    `<path d="M37 18.6 L46.6 24.1 L46.6 40 L37 45.5 Z" fill="${glass}"/>`,
    `<path d="M37 18.6 L46.6 24.1 L46.6 40 L37 45.5 Z" fill="none" stroke="${glassEdge}" stroke-width="0.8"/>`,
    // Reflejo diagonal del vidrio.
    `<path d="M41.5 21.2 L46.6 24.1 L46.6 26.2 L37 40.6 L37 33.7 Z" fill="${glare}" fill-opacity="0.28"/>`,
    // Destello.
    `<path d="M45.4 22.2 L46.1 24.3 L48.2 25 L46.1 25.7 L45.4 27.8 L44.7 25.7 L42.6 25 L44.7 24.3 Z" fill="${glare}"/>`,
  ].join("");
}

const VARIANTS = {
  light: {
    main: COLORS.navy,
    top: COLORS.steel,
    bottom: COLORS.blue,
    glass: COLORS.blue,
    glassEdge: COLORS.navy,
    mullion: COLORS.navy,
    glare: COLORS.white,
    word: COLORS.navy,
    tagline: COLORS.navy,
  },
  dark: {
    main: COLORS.white,
    top: COLORS.steel,
    bottom: COLORS.blue,
    glass: COLORS.blue,
    glassEdge: COLORS.white,
    mullion: COLORS.white,
    glare: COLORS.white,
    word: COLORS.white,
    tagline: "#C9D3DD",
  },
};

const svg = (w, h, body, title) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-labelledby="t"><title id="t">${title}</title>${body}</svg>\n`;

const files = {};

/** Palabras separadas por puntos: "ALUMINIO • VIDRIO • DISEÑO". */
function tagline(words, x, baseline, size, tracking, color) {
  const parts = [];
  let cursor = x;
  words.forEach((word, i) => {
    if (i > 0) {
      const r = size * 0.13;
      cursor += size * 0.55;
      parts.push(`<circle cx="${(cursor + r).toFixed(2)}" cy="${(baseline - size * 0.36).toFixed(2)}" r="${r.toFixed(2)}" fill="${color}"/>`);
      cursor += r * 2 + size * 0.55;
    }
    const t = textPath(word, cursor, baseline, size, tracking);
    parts.push(`<path d="${t.d}" fill="${color}"/>`);
    cursor = t.end;
  });
  return { body: parts.join(""), end: cursor };
}

const TAGLINE = ["ALUMINIO", "VIDRIO", "DISEÑO"];

// Logotipo horizontal: isotipo + nombre + bajada.
for (const [name, v] of Object.entries(VARIANTS)) {
  const word = textPath("CRISTALTE", 72, 36, 33, 1.2);
  const tag = tagline(TAGLINE, 73.5, 54, 9.6, 2.35, v.tagline);
  const width = Math.ceil(Math.max(word.end, tag.end) + 2);
  const body = isotipo(v) + `<path d="${word.d}" fill="${v.word}"/>` + tag.body;
  files[`cristalte-logo-horizontal-${name}.svg`] = svg(width, 64, body, "CRISTALTE");
  files[`cristalte-isotipo-${name}.svg`] = svg(64, 64, isotipo(v), "CRISTALTE");
}

// Isotipo sobre fondo azul marino: favicon, ícono de app y perfiles sociales.
const appIconBody =
  `<rect width="64" height="64" rx="14" fill="${COLORS.navy}"/>` +
  `<g transform="translate(5.12 5.12) scale(0.84)">${isotipo(VARIANTS.dark)}</g>`;
files["cristalte-icono-app.svg"] = svg(64, 64, appIconBody, "CRISTALTE");

for (const [file, content] of Object.entries(files)) {
  writeFileSync(join(brandDir, file), content);
}

// Favicon SVG que Next.js sirve automáticamente.
writeFileSync(join(root, "src", "app", "icon.svg"), files["cristalte-icono-app.svg"]);

// PNG derivados.
const appIcon = Buffer.from(files["cristalte-icono-app.svg"]);
await sharp(appIcon, { density: 1200 }).resize(180, 180).png().toFile(join(root, "src", "app", "apple-icon.png"));
await sharp(appIcon, { density: 1200 }).resize(512, 512).png().toFile(join(brandDir, "cristalte-icono-512.png"));
await sharp(Buffer.from(files["cristalte-logo-horizontal-light.svg"]), { density: 600 })
  .resize({ height: 256 })
  .png()
  .toFile(join(brandDir, "cristalte-logo-horizontal-light.png"));
await sharp(Buffer.from(files["cristalte-logo-horizontal-dark.svg"]), { density: 600 })
  .resize({ height: 256 })
  .png()
  .toFile(join(brandDir, "cristalte-logo-horizontal-dark.png"));

// Imagen para compartir en redes (Open Graph), 1200 × 630.
{
  const v = VARIANTS.dark;
  // Se usa una línea base positiva: algunos renderizadores fallan con coordenadas negativas.
  const word = textPath("CRISTALTE", 0, 104, 104, 3);
  const tag = tagline(TAGLINE, 0, 28, 28, 7, v.tagline);
  const iconSize = 190;
  const gap = 44;
  const blockWidth = Math.max(word.end, tag.end);
  const startX = (1200 - (iconSize + gap + blockWidth)) / 2;
  const textX = startX + iconSize + gap;
  const body =
    `<rect width="1200" height="630" fill="${COLORS.navy}"/>` +
    `<g transform="translate(${startX} 220) scale(${iconSize / 64})">${isotipo(v)}</g>` +
    `<g transform="translate(${textX} 236)"><path d="${word.d}" fill="${v.word}"/></g>` +
    `<g transform="translate(${textX + 4} 364)">${tag.body}</g>` +
    `<rect x="0" y="618" width="1200" height="12" fill="${COLORS.blue}"/>`;
  const og = svg(1200, 630, body, "CRISTALTE");
  await sharp(Buffer.from(og)).png().toFile(join(root, "public", "og-image.png"));
}

console.log("Archivos de marca generados en public/brand/");
