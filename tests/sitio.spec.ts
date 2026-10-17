import { expect, test, type Page } from "@playwright/test";
import { seoLocation } from "../src/config/site";
import { priceList } from "../src/content/prices";
import { legacyRedirects, servicePath, services } from "../src/content/services";

/** Errores de consola, ignorando las fotos externas (el entorno de pruebas puede no tener acceso a Unsplash). */
function trackConsole(page: Page) {
  const errors: string[] = [];
  page.on("console", (m) => {
    if (m.type() === "error" && !/unsplash|Failed to load resource/i.test(m.text())) errors.push(m.text());
  });
  page.on("pageerror", (e) => errors.push(e.message));
  return errors;
}

test("portada: estructura, encabezados y metadatos", async ({ page }) => {
  const errors = trackConsole(page);
  await page.goto("/");
  await expect(page).toHaveTitle("Ventanas de aluminio y PVC en Santiago | CRISTALTEC");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("h1")).toHaveText("Transformamos tus espacios con aluminio, vidrio y diseño");
  for (const id of ["inicio", "servicios", "proyectos", "nosotros", "cotizar", "preguntas", "contacto"]) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  }
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /og-image\.png$/);
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
  const jsonLd = await page.locator('script[type="application/ld+json"]').allTextContents();
  const types = jsonLd.flatMap((t) => [JSON.parse(t)].flat().map((d) => d["@type"]));
  // Con dirección confirmada la empresa se declara como negocio local.
  expect(types).toEqual(expect.arrayContaining(["HomeAndConstructionBusiness", "WebSite"]));
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://cristaltecsantiago.cl/");
  await expect(page.getByRole("heading", { name: "Detalles que marcan la diferencia" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "¿Tienes un proyecto en mente?" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Soluciones pensadas para tus espacios" })).toBeVisible();
  await expect(page.locator("#contacto iframe")).toHaveAttribute("src", /google\.com\/maps.*Nueva\+Recoleta\+3795/);
  await expect(page.locator("#contacto").getByText("Nueva Recoleta 3795, Recoleta, Región Metropolitana")).toBeVisible();
  expect(errors).toEqual([]);
});

test("todas las imágenes tienen texto alternativo y las referenciales están marcadas", async ({ page }) => {
  await page.goto("/");
  const missingAlt = await page.locator("img:not([alt])").count();
  expect(missingAlt).toBe(0);
  await expect(page.getByText("Imagen referencial").first()).toBeVisible();
});

test("los botones de WhatsApp abren el número principal, sin enlaces pendientes", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('a[data-whatsapp="pending"]')).toHaveCount(0);
  const links = page.locator('a[data-whatsapp="ready"]');
  expect(await links.count()).toBeGreaterThan(8);
  for (const href of await links.evaluateAll((els) => els.map((e) => e.getAttribute("href")))) {
    expect(href).toMatch(/^https:\/\/wa\.me\/56945165347\?text=/);
  }
});

/** Captura las URLs que el sitio intenta abrir con window.open, sin abrir ventanas. */
async function captureWindowOpen(page: import("@playwright/test").Page) {
  await page.addInitScript(() => {
    (window as unknown as { __opened: string[] }).__opened = [];
    window.open = ((url?: string | URL) => {
      (window as unknown as { __opened: string[] }).__opened.push(String(url));
      return {} as Window;
    }) as typeof window.open;
  });
  return () => page.evaluate(() => (window as unknown as { __opened: string[] }).__opened);
}

test("formulario: valida campos obligatorios y abre WhatsApp con los datos", async ({ page }) => {
  const opened = await captureWindowOpen(page);
  await page.goto("/#cotizar");
  const form = page.locator("#cotizar form");
  await form.getByRole("button", { name: "Continuar en WhatsApp" }).click();
  await expect(form.getByText("Escribe tu nombre.")).toBeVisible();
  await expect(form.getByText("Selecciona el servicio que necesitas.")).toBeVisible();
  await expect(form.getByLabel(/^Nombre/)).toBeFocused();

  await form.getByLabel(/^Nombre/).fill("Ana Pérez");
  await form.getByLabel(/^Teléfono o WhatsApp/).fill("+56 9 0000 0000");
  await form.getByLabel(/^Comuna/).fill("Santiago");
  await form.getByLabel(/^Servicio que necesitas/).selectOption("Cerramientos de terrazas");
  await form.getByLabel(/^Descripción del proyecto/).fill("Cerrar terraza de 3 x 2,4 m en piso 5.");
  await form.getByRole("button", { name: "Continuar en WhatsApp" }).click();
  await expect(form.getByText("Escribe tu nombre.")).toHaveCount(0);
  const [url] = await opened();
  expect(url).toMatch(/^https:\/\/wa\.me\/56945165347\?text=/);
  const text = new URL(url).searchParams.get("text")!;
  expect(text).toContain("Ana Pérez");
  expect(text).toContain("Cerramientos de terrazas");
});

test("galería: filtra por categoría y abre la vista ampliada", async ({ page }) => {
  await page.goto("/#proyectos");
  const gallery = page.locator("#proyectos");
  const items = gallery.locator("ul > li");
  const total = await items.count();
  await gallery.getByRole("button", { name: "Terrazas", exact: true }).click();
  await expect(items).toHaveCount(3);
  expect(total).toBeGreaterThan(3);
  await items.first().getByRole("button").click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText("Terrazas", { exact: true })).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(dialog.getByRole("heading", { level: 3 })).toHaveText("Balcón cerrado en departamento");
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("navegación móvil", async ({ page, isMobile }) => {
  test.skip(!isMobile, "solo móvil");
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Abrir menú" });
  await toggle.click();
  const menu = page.getByRole("navigation", { name: "Menú móvil" });
  await expect(menu).toBeVisible();
  await menu.getByRole("link", { name: "Proyectos" }).click();
  await expect(menu).toBeHidden();
  await expect(page).toHaveURL(/\/proyectos\/$/);
});

test("sin desbordamiento horizontal", async ({ page }) => {
  await page.goto("/");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});

for (const s of services) {
  test(`página de servicio: ${s.slug}`, async ({ page }) => {
    const errors = trackConsole(page);
    await page.goto(servicePath(s.slug));
    await expect(page).toHaveTitle(`${s.seo.title}${seoLocation() ? ` en ${seoLocation()}` : ""} | CRISTALTEC`);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveText(s.h1);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", s.seo.description);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://cristaltecsantiago.cl${servicePath(s.slug)}`);
    // Formulario en la misma página, con el servicio elegido.
    await expect(page.locator("#cotizar select[name=service]")).toHaveValue(s.name);
    // Los botones de WhatsApp de la página abren el mensaje de este servicio.
    const texts = await page
      .locator('main a[data-whatsapp="ready"]')
      .evaluateAll((els) => els.map((e) => new URL(e.getAttribute("href")!).searchParams.get("text")));
    expect(texts).toContain(s.whatsappMessage);
    for (const q of s.faqs) await expect(page.getByRole("heading", { name: q.question })).toHaveCount(1);
    expect(errors).toEqual([]);
  });
}

for (const [path, h1] of [
  ["/proyectos/", "Proyectos de aluminio, vidrio y PVC"],
  ["/nosotros/", "Nosotros: soluciones en aluminio, vidrio y PVC"],
  ["/contacto/", "Contacto y cotización"],
  ["/preguntas-frecuentes/", "Preguntas frecuentes"],
  ["/proyectos-comerciales/", "Cotización para proyectos comerciales y edificios"],
]) {
  test(`página ${path}`, async ({ page }) => {
    const errors = trackConsole(page);
    await page.goto(path);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveText(h1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://cristaltecsantiago.cl${path}`);
    expect(errors).toEqual([]);
  });
}

test("redirecciones 301 desde las URLs anteriores en vercel.json", async () => {
  const { readFileSync } = await import("node:fs");
  const config = JSON.parse(readFileSync("vercel.json", "utf8")) as {
    redirects: { source: string; destination: string; permanent: boolean; has?: unknown }[];
  };
  const validTargets = ["/", ...services.map((s) => servicePath(s.slug))];
  for (const [from, to] of Object.entries(legacyRedirects)) {
    const source = from.endsWith("/") ? from : `${from}/`;
    const rule = config.redirects.find((r) => r.source === source && !r.has);
    expect(rule?.destination, source).toBe(to);
    expect(rule?.permanent).toBe(true);
    expect(validTargets).toContain(to);
  }
});

test("la dirección gratuita de Vercel redirige al dominio propio", async () => {
  const { readFileSync } = await import("node:fs");
  const config = JSON.parse(readFileSync("vercel.json", "utf8")) as {
    redirects: { source: string; destination: string; permanent: boolean; has?: { type: string; value: string }[] }[];
  };
  const rule = config.redirects[0];
  expect(rule.has).toEqual([{ type: "host", value: "cristalte-web.vercel.app" }]);
  expect(rule.destination).toBe("https://cristaltecsantiago.cl/:path*");
  expect(rule.permanent).toBe(true);
});

test("todos los enlaces internos responden", async ({ page, request }) => {
  const checked = new Set<string>();
  for (const start of ["/", servicePath(services[0].slug), "/preguntas-frecuentes/"]) {
    await page.goto(start);
    const hrefs = await page.locator("a[href^='/']").evaluateAll((els) => [
      ...new Set(els.map((e) => (e.getAttribute("href") ?? "").split("#")[0]).filter(Boolean)),
    ]);
    for (const href of hrefs) {
      if (checked.has(href)) continue;
      checked.add(href);
      const res = await request.get(href);
      expect(res.status(), href).toBe(200);
    }
  }
});

test("sitemap y robots", async ({ request }) => {
  const sitemap = await (await request.get("/sitemap.xml")).text();
  for (const s of services) expect(sitemap).toContain(`https://cristaltecsantiago.cl${servicePath(s.slug)}`);
  expect(sitemap).not.toContain("/servicios/");
  expect(sitemap).not.toContain("vano6");
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toMatch(/User-Agent: \*/i);
  expect(robots).toMatch(/Allow: \//);
  expect(robots).toContain("Sitemap: https://cristaltecsantiago.cl/sitemap.xml");
});

test("precios referenciales: tabla en portada y filtrada por servicio", async ({ page }) => {
  await page.goto("/");
  const section = page.locator("#precios");
  await expect(section.getByRole("heading", { level: 2 })).toHaveText("Precios referenciales");
  await expect(section.locator("tbody tr")).toHaveCount(priceList.length);
  await expect(section.getByText("$255.000 CLP")).toBeVisible();
  await expect(section.getByText("Desde $80.000 CLP")).toBeVisible();
  await expect(
    section.getByText("Desde $80.000. El precio final depende de las medidas, el diseño y las características del proyecto."),
  ).toBeVisible();
  await section.getByRole("link", { name: "Solicitar cotización" }).click();
  await expect(page).toHaveURL(/#cotizar$/);

  for (const s of services) {
    const rows = priceList.filter((p) => p.service === s.slug);
    await page.goto(servicePath(s.slug));
    await expect(page.locator("#precios tbody tr")).toHaveCount(rows.length);
  }
});

test("formulario comercial: valida y abre WhatsApp sin simular un envío", async ({ page }) => {
  const opened = await captureWindowOpen(page);
  await page.goto("/proyectos-comerciales/");
  const form = page.locator("form").first();
  const submit = form.locator('button[type="submit"]');
  await submit.click();
  await expect(form.getByText("Escribe el nombre de la empresa u organización.")).toBeVisible();
  await expect(form.getByText("Selecciona al menos un servicio.")).toBeVisible();

  await form.getByLabel(/^Empresa/).fill("Constructora Ejemplo");
  await form.getByLabel(/^Nombre/).fill("Ana Pérez");
  await form.getByLabel(/^Teléfono/).fill("+56 9 0000 0000");
  await form.getByLabel(/^Comuna/).fill("Santiago");
  await form.getByLabel(/^Tipo de proyecto/).selectOption({ index: 1 });
  await form.getByLabel("Ventanas de aluminio").check();
  await form.getByLabel(/^Descripción/).fill("Edificio de 12 pisos, 80 ventanas de aluminio con termopanel.");
  await submit.click();
  await expect.poll(async () => (await opened()).length).toBe(1);
  const text = new URL((await opened())[0]).searchParams.get("text")!;
  expect(text).toContain("Constructora Ejemplo");
  await expect(page.getByText(/enviada|recibimos/i)).toHaveCount(0);
});
