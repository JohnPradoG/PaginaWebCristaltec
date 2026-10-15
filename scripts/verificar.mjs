/**
 * Revisa que los datos necesarios para publicar estén completos.
 * Uso: npm run verificar
 */
import { readFileSync } from "node:fs";

const src = readFileSync(new URL("../src/config/site.ts", import.meta.url), "utf8");
const get = (key) => src.match(new RegExp(`${key}:\\s*"([^"]*)"`))?.[1] ?? "";
const isNull = (key) => new RegExp(`${key}:\\s*null`).test(src);
const isEmptyList = (key) => new RegExp(`${key}:\\s*\\[\\]`).test(src);

const errors = [];
const warnings = [];

const wa = get("whatsappNumber");
if (!/^[1-9]\d{7,14}$/.test(wa)) errors.push("whatsappNumber: falta el número de WhatsApp en formato internacional (ej. 569XXXXXXXX).");
const url = get("siteUrl");
if (!/^https:\/\/[^\s/]+\.[^\s/]+$/.test(url)) errors.push('siteUrl: falta el dominio final (ej. "https://www.tudominio.cl").');

for (const key of ["phone", "email", "commune", "instagram", "facebook"]) {
  if (isNull(key)) warnings.push(`${key}: sin configurar (no se mostrará en la web).`);
}
for (const key of ["serviceAreas", "hours"]) {
  if (isEmptyList(key)) warnings.push(`${key}: sin configurar (no se mostrará en la web).`);
}

const images = readFileSync(new URL("../src/content/images.ts", import.meta.url), "utf8");
const demos = (images.match(/demo:\s*true/g) ?? []).length;
if (demos > 0) warnings.push(`${demos} fotografías siguen siendo imágenes referenciales (src/content/images.ts).`);

console.log("\nVerificación de datos de CRISTALTE\n");
for (const e of errors) console.log(`  ✗ ${e}`);
for (const w of warnings) console.log(`  • ${w}`);
if (errors.length === 0) console.log("  ✓ Datos obligatorios completos.");
console.log("");
process.exit(errors.length > 0 ? 1 : 0);
