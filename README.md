# CRISTALTEC · Sitio web

Sitio web comercial de **CRISTALTEC**, soluciones en aluminio, vidrio y PVC. Está pensado para que el visitante entienda rápido los servicios, vea ejemplos y pida una cotización por WhatsApp o con un formulario.

- **Tecnología:** Next.js 16 (exportación estática) + TypeScript + Tailwind CSS 4.
- **Resultado:** un sitio estático (carpeta `out/`) que se publica en Vercel, Netlify, Cloudflare Pages o cualquier hosting con cPanel. No necesita base de datos ni servidor.
- **Tipografía:** Manrope, incluida en el proyecto (licencia SIL OFL, en `src/fonts/`).

---

## 1. Antes de publicar: datos que faltan

El sitio funciona sin estos datos, pero **no se debe publicar en producción** hasta completarlos. Todo se edita en un solo archivo: [`src/config/site.ts`](src/config/site.ts).

| Dato | Campo | Obligatorio |
|---|---|---|
| Número de WhatsApp (formato `569XXXXXXXX`, solo dígitos) | `whatsappNumber` | **Sí** |
| Dominio (`https://cristaltecsantiago.cl`; `cristalte-web.vercel.app` redirige a él) | `siteUrl` o variable `NEXT_PUBLIC_SITE_URL` | **Sí** (ya configurado) |
| Teléfono para llamadas | `contact.phone` | No |
| Correo | `contact.email` | No |
| Dirección del taller o local | `contact.address` | No |
| Comuna principal y región (se suma a los títulos SEO de los servicios) | `contact.commune`, `contact.region` | Muy recomendado |
| Comunas donde trabajan (si está confirmado) | `contact.serviceAreas` | No |
| Horario de atención | `contact.hours` | No |
| Mapa de Google (URL para insertar) | `contact.mapEmbedUrl` | No |
| Instagram, Facebook, TikTok | `social.*` | No |
| Razón social y RUT (pie de página) | `legalName`, `rut` | No |
| Google Search Console, Bing y Google Analytics | `analytics.*` | Muy recomendado |
| Destino del formulario de proyectos comerciales (URL de Formspree u otro servicio que reciba POST JSON) | `forms.commercialEndpoint` | Recomendado |
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

- Si `siteUrl` es una dirección de Vercel protegida (`…-vano6.vercel.app` o `…-git-…`), la publicación en producción también falla: esas direcciones piden iniciar sesión y Google no puede verlas.

`siteUrl` apunta al dominio propio `https://cristaltecsantiago.cl`.

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
npm run fotos        # optimiza las fotos de fotos-originales/ para la web
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
| Servicios (tarjetas y páginas `/ventanas-de-aluminio/`, etc.) | `src/content/services.ts` |
| Precios referenciales (portada y páginas de servicio) | `src/content/prices.ts` |
| Galería de proyectos | `src/content/projects.ts` |
| Preguntas frecuentes | `src/content/faq.ts` |
| Portada | `src/components/sections/hero.tsx` |
| Ventajas | `src/components/sections/advantages.tsx` |
| Nosotros | `src/components/sections/about.tsx` |
| Aviso de privacidad | `src/app/privacidad/page.tsx` |

### Fotografías
Las fotos actuales son **imágenes de referencia de Unsplash** (licencia libre), marcadas en la web como “Imagen referencial” y listadas en `/creditos-imagenes/`. **No son trabajos de CRISTALTEC.**

Para usar fotos reales:

1. Copia las fotos originales (jpg, png o webp, tal como salen del celular) en la carpeta `fotos-originales/`. El nombre del archivo será su nombre en la web (ej. `terraza-providencia-01.jpg`).
2. Ejecuta `npm run fotos`. Crea en `public/proyectos/` versiones WebP de 640, 1080 y 1600 px, gira la foto según el celular y borra los datos EXIF (incluida la ubicación GPS).
3. En `src/content/images.ts` cambia `src` por `"/proyectos/terraza-providencia-01.webp"`, escribe un `alt` descriptivo, pon `demo: false` y borra `credit`.

Cada pantalla descarga la versión más liviana que le sirve. Si falta alguna versión de una foto, `npm run build` se detiene y avisa cuál falta. La carpeta `fotos-originales/` no se sube al repositorio.
4. Para sumar un trabajo real a la galería, copia la plantilla que está al inicio de `src/content/projects.ts`: necesidad, solución, material, foto del antes (opcional) y comuna (solo con permiso del cliente). Se enlaza solo con su página de servicio según la categoría.

Cuando ya no queden imágenes con `demo: true`, las etiquetas “Imagen referencial” y la nota de la galería desaparecen solas.

### Logotipo
Los archivos de marca están en `public/brand/`:

| Archivo | Uso |
|---|---|
| `cristaltec-logo-horizontal-light.svg` | Logo horizontal para fondos claros |
| `cristaltec-logo-horizontal-dark.svg` | Logo horizontal para fondos oscuros |
| `cristaltec-isotipo-light.svg` / `-dark.svg` | Símbolo solo |
| `cristaltec-icono-app.svg` / `cristaltec-icono-512.png` | Ícono para favicon y redes sociales |
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
1. En tu computador ejecuta `CRISTALTEC_PUBLICAR=1 npm run build` (este modo falla si faltan datos obligatorios).
2. Sube **el contenido** de la carpeta `out/` a `public_html` con el administrador de archivos o FTP.

### Protección de Vercel (importante)
El proyecto tiene activada "Vercel Authentication" para todas las direcciones salvo la principal. Por eso `cristalte-web.vercel.app` es pública, pero `cristalte-web-vano6.vercel.app` y las direcciones de rama (`…-git-…`) piden iniciar sesión. Comparte y usa siempre la dirección pública o el dominio propio.

### Dominio propio
Dominio: `cristaltecsantiago.cl` (NIC Chile). Configuración:
1. En Vercel → proyecto `cristalte-web` → Domains están `cristaltecsantiago.cl` (principal) y `www.cristaltecsantiago.cl` (redirige 308 al principal).
2. En NIC Chile → Mis dominios → servidores DNS: `ns1.vercel-dns.com` y `ns2.vercel-dns.com`. Vercel crea los registros y el certificado HTTPS solo.
3. `vercel.json` redirige con 301 todo lo que llegue a `cristalte-web.vercel.app` hacia el dominio propio.
4. `siteUrl` en `src/config/site.ts` usa `https://cristaltecsantiago.cl` (canonical, sitemap, robots y JSON-LD).
5. Agrega el dominio en Google Search Console (propiedad de dominio, verificación por DNS en Vercel) y envía `https://cristaltecsantiago.cl/sitemap.xml`.
6. Revisa `https://cristaltecsantiago.cl/robots.txt` y `https://cristaltecsantiago.cl/sitemap.xml`: todas las direcciones deben usar el dominio nuevo.

### Google Search Console y Bing
1. En [Search Console](https://search.google.com/search-console) agrega una propiedad de tipo **Prefijo de URL** con la dirección exacta de `siteUrl` (o de tipo **Dominio** si ya tienes dominio propio, verificando por DNS).
2. Método "Etiqueta HTML": copia solo el valor de `content` en `analytics.googleSiteVerification`, publica y presiona **Verificar**.
3. En **Sitemaps** envía `sitemap.xml`.
4. En **Inspección de URLs** revisa la portada y cada página de servicio y solicita la indexación.
5. En [Bing Webmaster Tools](https://www.bing.com/webmasters) puedes importar el sitio desde Search Console, o pegar el código `msvalidate.01` en `analytics.bingSiteVerification`.

### Google Analytics 4 (opcional)
Crea una propiedad y pega el ID `G-XXXXXXXXXX` en `analytics.googleAnalyticsId`. El sitio muestra un aviso y **solo carga Analytics si el visitante acepta**. Eventos que se registran:

| Evento | Cuándo | Parámetros |
|---|---|---|
| `whatsapp_click` | Clic en un botón de WhatsApp (con número configurado) | `ubicacion` (ej. `servicio:ventanas-de-aluminio:inicio`, `tarjeta:shower-doors`, `flotante`), `pagina` |
| `generate_lead` | Formulario completo que abre WhatsApp | `method`, `service` |

En GA4 marca `generate_lead` y `whatsapp_click` como **eventos clave** para verlos como conversiones.

### URLs anteriores
Las páginas de servicio pasaron de `/servicios/<nombre>/` a `/<nombre>/`, y los servicios retirados (espejos, barandas, divisiones) redirigen al servicio más cercano o a la portada. Las reglas están en `legacyRedirects` (`src/content/services.ts`) y se copian a `vercel.json` como redirecciones 301; una prueba automática verifica que coincidan.

---

## 5. Qué incluye

- Encabezado fijo con menú móvil y botón “Cotizar por WhatsApp”.
- Portada con fotografía, mensaje principal y dos llamados a la acción.
- 8 servicios: ventanas de aluminio y de PVC (con explicación de vidrio monolítico y termopanel), puertas de aluminio y PVC, shower doors (vidrio templado o acrílico), cerramientos de terrazas, mamparas de vidrio, vitrinas a medida y reparación y mantenimiento. Cada uno con tarjeta, botón de WhatsApp con mensaje propio y página individual con URL descriptiva (`/cerramientos-de-terrazas/`, etc.): beneficios, usos, materiales y opciones, preguntas frecuentes, ideas de la galería, formulario con el servicio ya elegido y servicios relacionados.
- Páginas de proyectos, nosotros, contacto y preguntas frecuentes.
- Sección “Precios referenciales” (valores entregados por la empresa; en cada servicio se muestran solo sus filas) con botón al formulario.
- Página `/proyectos-comerciales/` con formulario para edificios, oficinas y obras. Si `forms.commercialEndpoint` tiene una URL, envía la solicitud y solo confirma cuando el servidor responde bien; si no, abre WhatsApp; si tampoco hay WhatsApp, avisa que la solicitud no se envió.
- “Detalles que marcan la diferencia” solo con beneficios que la empresa puede respaldar.
- Galería filtrable por categoría (sin recargar) con vista ampliada, navegación con teclado y botón “Consultar un proyecto similar”.
- Sección “¿Tienes un proyecto en mente?”.
- Formulario de cotización validado que arma el mensaje y abre WhatsApp, avisando antes que se abrirá WhatsApp. No guarda datos ni simula envíos.
- Nosotros, preguntas frecuentes, contacto y pie de página con aviso de privacidad.
- Botón flotante de WhatsApp en móvil y escritorio.
- SEO: títulos y descripciones únicas, un H1 por página, Open Graph, canonical, `sitemap.xml`, `robots.txt`, JSON-LD `Organization` (o `HomeAndConstructionBusiness` cuando haya comuna confirmada), `WebSite`, `Service`, `FAQPage` y migas de pan (solo con datos reales).
- Accesibilidad: textos alternativos, navegación por teclado, enlace “Saltar al contenido”, contraste AA en textos y botones.
- Rendimiento: sitio estático, sin librerías pesadas, fotos en formato moderno y tamaño adecuado (WebP/AVIF desde el CDN), carga diferida de imágenes secundarias y dimensiones reservadas para evitar saltos.

### Fotos y adjuntos en el formulario
Un enlace de WhatsApp no permite adjuntar archivos, por eso el formulario indica que las fotos se envían directamente en el chat. Si más adelante se quiere recibir formularios con adjuntos por correo, se puede conectar un servicio como Formspree o Netlify Forms; requiere crear la cuenta y configurar el correo de destino.

---

## 6. Pruebas realizadas

- `npm run build`: compila sin errores (páginas estáticas).
- `npm run lint` y TypeScript: sin errores.
- `npm test`: pruebas en escritorio (1366 px) y móvil (Pixel 7):
  - Generación y codificación de enlaces de WhatsApp (general, cada servicio, formulario con tildes, ñ y símbolos).
  - Sin número configurado no se genera ningún enlace `wa.me`; todos los botones llevan al formulario.
  - Validación del formulario, mensajes de error y foco en el primer campo con error.
  - Filtros de la galería, vista ampliada, flechas del teclado y cierre con Escape.
  - Menú móvil, sin desbordamiento horizontal.
  - Un solo H1, títulos, descripciones y canonical de cada página; JSON-LD y Open Graph.
  - Redirecciones 301 desde las URLs anteriores `/servicios/...` y servicios retirados.
  - Tabla de precios referenciales (portada y filtrada por servicio).
  - Formulario comercial: validación y aviso honesto cuando no hay destino.
  - Todas las imágenes con texto alternativo; enlaces internos responden 200.
  - `sitemap.xml` y `robots.txt`.
  - Sin errores de JavaScript en la consola.

### Pendientes conocidos
- Las fotografías son referenciales hasta recibir fotos reales.
- Faltan los datos de contacto y el número de WhatsApp (ver sección 1).
- Las pruebas automáticas no descargan las fotos de Unsplash (se ignoran esos errores de red); se revisan visualmente en la vista previa publicada.
