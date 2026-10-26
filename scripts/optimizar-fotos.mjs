/**
 * Prepara las fotos reales de CRISTALTEC para la web.
 * Uso: npm run fotos
 *
 * 1. Copia las fotos originales (jpg, png o webp, tal como salen del celular)
 *    en la carpeta `fotos-originales/`. El nombre del archivo será el nombre en
 *    la web: usa minúsculas y guiones, por ejemplo `terraza-providencia-01.jpg`.
 * 2. Ejecuta `npm run fotos`.
 * 3. En src/content/images.ts usa `src: "/proyectos/terraza-providencia-01.webp"`.
 *
 * Por cada foto se crean versiones WebP de 640, 1080 y 1600 px de ancho en
 * `public/proyectos/`, más `<nombre>.webp` (la de 1600 px). El cargador de
 * imágenes (src/lib/image-loader.ts) entrega a cada pantalla la más liviana que
 * le sirve. Se gira la foto según el celular y se borran los datos EXIF
 * (incluida la ubicación GPS del cliente).
 */
import { mkdirSync, readdirSync, existsSync } from "node:fs";
import { basename, extname, join } from "node:path";
import sharp from "sharp";
import { PHOTO_WIDTHS } from "../src/lib/photo-widths.mjs";

const root = new URL("..", import.meta.url).pathname;
const inputDir = join(root, "fotos-originales");
const outputDir = join(root, "public", "proyectos");

if (!existsSync(inputDir)) {
  mkdirSync(inputDir);
  console.log("Se creó la carpeta fotos-originales/. Copia ahí las fotos y vuelve a ejecutar npm run fotos.");
  process.exit(0);
}
mkdirSync(outputDir, { recursive: true });

const files = readdirSync(inputDir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
if (files.length === 0) {
  console.log("No hay fotos en fotos-originales/ (formatos aceptados: jpg, png, webp).");
  process.exit(0);
}

const slug = (name) =>
  name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const largest = Math.max(...PHOTO_WIDTHS);
for (const file of files) {
  const name = slug(basename(file, extname(file)));
  const input = join(inputDir, file);
  const meta = await sharp(input).rotate().metadata();
  const sizes = [];
  for (const width of PHOTO_WIDTHS) {
    const out = join(outputDir, `${name}-${width}.webp`);
    // withoutEnlargement: una foto chica no se agranda (se ve igual, pesa menos).
    const info = await sharp(input).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 74 }).toFile(out);
    sizes.push(`${width}px ${(info.size / 1024).toFixed(0)} KB`);
    if (width === largest) {
      await sharp(out).toFile(join(outputDir, `${name}.webp`));
    }
  }
  console.log(`✓ ${file} (${meta.width}×${meta.height}) → /proyectos/${name}.webp  [${sizes.join(", ")}]`);
}
console.log(`\nListo: ${files.length} foto(s) en public/proyectos/. Úsalas en src/content/images.ts con demo: false.`);
