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
const url = process.env.NEXT_PUBLIC_SITE_URL || (src.match(/siteUrl:[^\n]*"(https?:\/\/[^"]*)"/)?.[1] ?? "");
if (!/^https:\/\/[^\s/]+\.[^\s/]+$/.test(url)) errors.push('siteUrl: falta el dominio (ej. "https://www.tudominio.cl").');
else if (/-git-|-vano6\.vercel\.app/.test(url)) errors.push(`siteUrl: ${url} pide iniciar sesión en Vercel y Google no puede verla.`);
else if (/\.vercel\.app$/.test(url)) warnings.push(`siteUrl: ${url} es la dirección gratuita de Vercel. Cuando tengas dominio propio, cámbiala (ver README, "Dominio propio").`);

for (const key of ["phone", "email", "commune", "region", "instagram", "facebook", "googleSiteVerification", "googleAnalyticsId"]) {
  if (isNull(key)) warnings.push(`${key}: sin configurar (no se mostrará en la web).`);
}
for (const key of ["serviceAreas", "hours"]) {
  if (isEmptyList(key)) warnings.push(`${key}: sin configurar (no se mostrará en la web).`);
}

const siteSrc = readFileSync(new URL("../src/config/site.ts", import.meta.url), "utf8");
if (/commercialEndpoint:\s*null/.test(siteSrc))
  warnings.push("forms.commercialEndpoint: sin destino. El formulario de proyectos comerciales usa WhatsApp (o avisa que no se envió) hasta que conectes Formspree u otro servicio.");

const images = readFileSync(new URL("../src/content/images.ts", import.meta.url), "utf8");
const demos = (images.match(/demo:\s*true/g) ?? []).length;
if (demos > 0) warnings.push(`${demos} fotografías siguen siendo imágenes referenciales (src/content/images.ts).`);

console.log("\nVerificación de datos de CRISTALTEC\n");
for (const e of errors) console.log(`  ✗ ${e}`);
for (const w of warnings) console.log(`  • ${w}`);
if (errors.length === 0) console.log("  ✓ Datos obligatorios completos.");
console.log("");
process.exit(errors.length > 0 ? 1 : 0);
