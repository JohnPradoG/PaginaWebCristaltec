# CRISTALTE · Sitio web

Sitio web comercial de **CRISTALTE**, soluciones en aluminio, vidrio y PVC. Está pensado para que el visitante entienda rápido los servicios, vea ejemplos y pida una cotización por WhatsApp o con un formulario.

- **Tecnología:** Next.js 16 (exportación estática) + TypeScript + Tailwind CSS 4.
- **Resultado:** un sitio estático (carpeta `out/`) que se publica en Vercel, Netlify, Cloudflare Pages o cualquier hosting con cPanel. No necesita base de datos ni servidor.
- **Tipografía:** Manrope, incluida en el proyecto (licencia SIL OFL, en `src/fonts/`).

---

## 1. Antes de publicar: datos que faltan

El sitio funciona sin estos datos, pero **no se debe publicar en producción** hasta completarlos. Todo se edita en un solo archivo: [`src/config/site.ts`](src/config/site.ts).

| Dato | Campo | Obligatorio |
|---|---|---|
| Número de WhatsApp (formato `569XXXXXXXX`, solo dígitos) | `whatsappNumber` | **Sí** |
| Dominio (hoy: dirección gratuita de Vercel; cambiar si compras uno propio) | `siteUrl` | **Sí** (ya configurado) |
| Teléfono para llamadas | `contact.phone` | No |
| Correo | `contact.email` | No |
| Dirección del taller o local | `contact.address` | No |
| Comuna y región | `contact.commune` | No |
| Comunas donde trabajan (si está confirmado) | `contact.serviceAreas` | No |
| Horario de atención | `contact.hours` | No |
| Mapa de Google (URL para insertar) | `contact.mapEmbedUrl` | No |
| Instagram, Facebook, TikTok | `social.*` | No |
| Razón social y RUT (pie de página) | `legalName`, `rut` | No |
| Google Analytics y Search Console | `analytics.*` | No |
| **Fotografías reales de trabajos** | `src/content/images.ts` | Muy recomendado |
| Historia real de la empresa | `ownerStory` en `src/components/sections/about.tsx` | No |

Cualquier dato en `null` o vacío **no se muestra**. No hay datos inventados en el sitio.

Para revisar qué falta:

```bash
npm run verificar
```

### Bloqueo de seguridad

- Mientras falte `whatsappNumber`, los botones de WhatsApp llevan al formulario de cotización (nunca se genera un enlace inválido) y el formulario avisa que el número todavía no está configurado.
- Si falta `siteUrl`, `robots.txt` pide a los buscadores no indexar el sitio y una publicación en **producción** en Vercel o Netlify **falla a propósito**.

Hoy `siteUrl` apunta a la dirección gratuita de Vercel (`https://cristalte-web-vano6.vercel.app`). Al comprar un dominio propio, cámbialo ahí.

---

## 2. Instalar y ejecutar

Requisitos: [Node.js](https://nodejs.org) 20.9 o superior.

```bash
npm install          # instala dependencias
npm run dev          # modo desarrollo en http://localhost:3000
npm run build        # genera el sitio estático en out/
npm run preview      # sirve out/ localmente para revisarlo
npm run lint         # revisa el código
npm run verificar    # revisa los datos pendientes
npm test             # pruebas automáticas (requiere npm run build antes)
```

Las pruebas usan Playwright. La primera vez ejecuta `npx playwright install chromium`.

---

## 3. Personalizar

### Datos de contacto y WhatsApp
Solo en `src/config/site.ts`. Ejemplo:

```ts
whatsappNumber: "569XXXXXXXX",   // tu número real
siteUrl: "https://www.tudominio.cl",
contact: {
  phone: "+56 9 XXXX XXXX",
  email: "contacto@tudominio.cl",
  commune: "Comuna, Región",
  hours: ["Lunes a viernes: 9:00 a 18:00"],
  ...
}
```

Los mensajes prearmados de WhatsApp están en `src/lib/whatsapp.ts` (general, por servicio, proyecto similar y formulario).

### Textos
| Qué | Archivo |
|---|---|
| Servicios (tarjetas y páginas `/servicios/...`) | `src/content/services.ts` |
| Galería de proyectos | `src/content/projects.ts` |
| Preguntas frecuentes | `src/content/faq.ts` |
| Portada | `src/components/sections/hero.tsx` |
| Ventajas | `src/components/sections/advantages.tsx` |
| Nosotros | `src/components/sections/about.tsx` |
| Aviso de privacidad | `src/app/privacidad/page.tsx` |

### Fotografías
Las fotos actuales son **imágenes de referencia de Unsplash** (licencia libre), marcadas en la web como “Imagen referencial” y listadas en `/creditos-imagenes/`. **No son trabajos de CRISTALTE.**

Para usar fotos reales:

1. Optimiza la foto: formato `.webp` o `.jpg`, unos 1600 px de ancho, idealmente bajo 300 KB (puedes usar [squoosh.app](https://squoosh.app)).
2. Cópiala en `public/proyectos/` (ej. `public/proyectos/terraza-01.webp`).
3. En `src/content/images.ts` cambia `src` por `"/proyectos/terraza-01.webp"`, escribe un `alt` descriptivo, pon `demo: false` y borra `credit`.
4. Para sumar un trabajo a la galería, agrega un bloque en `src/content/projects.ts` con la descripción real y, si quieres, `location`.

Cuando ya no queden imágenes con `demo: true`, las etiquetas “Imagen referencial” y la nota de la galería desaparecen solas.

### Logotipo
Los archivos de marca están en `public/brand/`:

| Archivo | Uso |
|---|---|
| `cristalte-logo-horizontal-light.svg` | Logo horizontal para fondos claros |
| `cristalte-logo-horizontal-dark.svg` | Logo horizontal para fondos oscuros |
| `cristalte-isotipo-light.svg` / `-dark.svg` | Símbolo solo |
| `cristalte-icono-app.svg` / `cristalte-icono-512.png` | Ícono para favicon y redes sociales |
| `*.png` | Versiones en imagen para documentos |

Los SVG son vectoriales (el texto está convertido a trazos). Se generan con `npm run brand` desde `scripts/generate-brand.mjs`, que también crea el favicon, el ícono de Apple y la imagen para compartir (`public/og-image.png`).

---

## 4. Publicar en Internet

### Opción recomendada: Vercel (gratis para empezar)
1. Completa `whatsappNumber` (y `siteUrl` si usas un dominio propio) en `src/config/site.ts` y sube el cambio a GitHub.
2. Entra a [vercel.com](https://vercel.com) con tu cuenta de GitHub → **Add New → Project** → elige el repositorio `PaginaWebCristaltec` → **Deploy**. Vercel detecta Next.js automáticamente.
3. En **Settings → Domains** agrega tu dominio (ej. `tudominio.cl`) y sigue las instrucciones de DNS que te da Vercel en tu proveedor de dominio (en Chile, el dominio `.cl` se compra en [NIC Chile](https://www.nic.cl)).
4. Cada cambio que se suba a la rama principal se publica solo.

### Opción: Netlify
1. En [netlify.com](https://www.netlify.com) → **Add new site → Import from Git** → elige el repositorio.
2. La configuración ya está en `netlify.toml` (comando `npm run build`, carpeta `out`).

### Opción: hosting con cPanel
1. En tu computador ejecuta `CRISTALTE_PUBLICAR=1 npm run build` (este modo falla si faltan datos obligatorios).
2. Sube **el contenido** de la carpeta `out/` a `public_html` con el administrador de archivos o FTP.

### Después de publicar
- **Google Search Console:** agrega la propiedad con tu dominio, copia el código de verificación (método “etiqueta HTML”, solo el valor de `content`) en `analytics.googleSiteVerification`, publica y verifica. Luego envía `https://tudominio.cl/sitemap.xml`.
- **Google Analytics 4:** crea una propiedad y pega el ID `G-XXXXXXXXXX` en `analytics.googleAnalyticsId`.
- **Google Business Profile:** si atienden en una comuna confirmada, crear la ficha de empresa ayuda mucho en búsquedas locales.

---

## 5. Qué incluye

- Encabezado fijo con menú móvil y botón “Cotizar por WhatsApp”.
- Portada con fotografía, mensaje principal y dos llamados a la acción.
- 8 servicios con tarjeta, botón de WhatsApp con mensaje propio y página individual con URL descriptiva (`/servicios/cerramientos-de-terrazas/`, etc.).
- “Detalles que marcan la diferencia” solo con beneficios que la empresa puede respaldar.
- Galería filtrable por categoría (sin recargar) con vista ampliada, navegación con teclado y botón “Consultar un proyecto similar”.
- Sección “¿Tienes un proyecto en mente?”.
- Formulario de cotización validado que arma el mensaje y abre WhatsApp, avisando antes que se abrirá WhatsApp. No guarda datos ni simula envíos.
- Nosotros, preguntas frecuentes, contacto y pie de página con aviso de privacidad.
- Botón flotante de WhatsApp en móvil y escritorio.
- SEO: títulos y descripciones únicas, un H1 por página, Open Graph, canonical, `sitemap.xml`, `robots.txt`, JSON-LD `LocalBusiness`, `FAQPage`, `Service` y migas de pan (solo con datos reales).
- Accesibilidad: textos alternativos, navegación por teclado, enlace “Saltar al contenido”, contraste AA en textos y botones.
- Rendimiento: sitio estático, sin librerías pesadas, fotos en formato moderno y tamaño adecuado (WebP/AVIF desde el CDN), carga diferida de imágenes secundarias y dimensiones reservadas para evitar saltos.

### Fotos y adjuntos en el formulario
Un enlace de WhatsApp no permite adjuntar archivos, por eso el formulario indica que las fotos se envían directamente en el chat. Si más adelante se quiere recibir formularios con adjuntos por correo, se puede conectar un servicio como Formspree o Netlify Forms; requiere crear la cuenta y configurar el correo de destino.

---

## 6. Pruebas realizadas

- `npm run build`: compila sin errores (17 páginas estáticas).
- `npm run lint` y TypeScript: sin errores.
- `npm test`: 43 pruebas en escritorio (1366 px) y móvil (Pixel 7):
  - Generación y codificación de enlaces de WhatsApp (general, cada servicio, formulario con tildes, ñ y símbolos).
  - Sin número configurado no se genera ningún enlace `wa.me`; todos los botones llevan al formulario.
  - Validación del formulario, mensajes de error y foco en el primer campo con error.
  - Filtros de la galería, vista ampliada, flechas del teclado y cierre con Escape.
  - Menú móvil, sin desbordamiento horizontal.
  - Un solo H1, títulos y descripciones de cada página de servicio, JSON-LD, Open Graph y canonical.
  - Todas las imágenes con texto alternativo; enlaces internos responden 200.
  - `sitemap.xml` y `robots.txt`.
  - Sin errores de JavaScript en la consola.

### Pendientes conocidos
- Las fotografías son referenciales hasta recibir fotos reales.
- Faltan los datos de contacto y el número de WhatsApp (ver sección 1).
- Las pruebas automáticas no descargan las fotos de Unsplash (se ignoran esos errores de red); se revisan visualmente en la vista previa publicada.
