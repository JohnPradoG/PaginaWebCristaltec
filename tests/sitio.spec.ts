import { expect, test, type Page } from "@playwright/test";
import { legacyServiceSlugs, servicePath, services } from "../src/content/services";

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
  await expect(page).toHaveTitle("Ventanas, cerramientos y vidrio a medida | CRISTALTE");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("h1")).toHaveText("Transformamos tus espacios con aluminio, vidrio y diseño");
  for (const id of ["inicio", "servicios", "proyectos", "nosotros", "cotizar", "preguntas", "contacto"]) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  }
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /og-image\.png$/);
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
  const jsonLd = await page.locator('script[type="application/ld+json"]').allTextContents();
  const types = jsonLd.flatMap((t) => [JSON.parse(t)].flat().map((d) => d["@type"]));
  // Sin comuna confirmada la empresa se declara como Organization (no LocalBusiness sin dirección).
  expect(types).toEqual(expect.arrayContaining(["Organization", "WebSite"]));
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://cristalte-web.vercel.app/");
  await expect(page.getByRole("heading", { name: "Detalles que marcan la diferencia" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "¿Tienes un proyecto en mente?" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Soluciones pensadas para tus espacios" })).toBeVisible();
  expect(errors).toEqual([]);
});

test("todas las imágenes tienen texto alternativo y las referenciales están marcadas", async ({ page }) => {
  await page.goto("/");
  const missingAlt = await page.locator("img:not([alt])").count();
  expect(missingAlt).toBe(0);
  await expect(page.getByText("Imagen referencial").first()).toBeVisible();
});

test("modo pendiente: los botones de WhatsApp llevan al formulario y no a enlaces inválidos", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('a[href*="wa.me"]')).toHaveCount(0);
  const pending = page.locator('a[data-whatsapp="pending"]');
  expect(await pending.count()).toBeGreaterThan(8);
  for (const href of await pending.evaluateAll((els) => els.map((e) => e.getAttribute("href")))) {
    expect(href).toBe("/#cotizar");
  }
});

test("formulario: valida campos obligatorios y avisa si falta el número", async ({ page }) => {
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
  await expect(form.getByText(/aún no está configurado/)).toBeVisible();
});

test("galería: filtra por categoría y abre la vista ampliada", async ({ page }) => {
  await page.goto("/#proyectos");
  const gallery = page.locator("#proyectos");
  const items = gallery.locator("ul > li");
  const total = await items.count();
  await gallery.getByRole("button", { name: "Barandas", exact: true }).click();
  await expect(items).toHaveCount(3);
  expect(total).toBeGreaterThan(3);
  await items.first().getByRole("button").click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText("Barandas", { exact: true })).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(dialog.getByRole("heading", { level: 3 })).toHaveText("Barandas de vidrio en escalera abierta");
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
    await expect(page).toHaveTitle(`${s.seo.title} | CRISTALTE`);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveText(s.h1);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", s.seo.description);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://cristalte-web.vercel.app${servicePath(s.slug)}`);
    // Formulario en la misma página, con el servicio elegido.
    await expect(page.locator("#cotizar select[name=service]")).toHaveValue(s.name);
    // Los botones de WhatsApp sin número llevan al formulario de esta misma página.
    for (const href of await page.locator('a[data-whatsapp="pending"]').evaluateAll((els) => els.map((e) => e.getAttribute("href")))) {
      expect(["#cotizar", "/#cotizar"]).toContain(href);
    }
    for (const q of s.faqs) await expect(page.getByRole("heading", { name: q.question })).toHaveCount(1);
    expect(errors).toEqual([]);
  });
}

for (const [path, h1] of [
  ["/proyectos/", "Proyectos de aluminio, vidrio y PVC"],
  ["/nosotros/", "Nosotros: soluciones en aluminio, vidrio y PVC"],
  ["/contacto/", "Contacto y cotización"],
  ["/preguntas-frecuentes/", "Preguntas frecuentes"],
]) {
  test(`página ${path}`, async ({ page }) => {
    const errors = trackConsole(page);
    await page.goto(path);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveText(h1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://cristalte-web.vercel.app${path}`);
    expect(errors).toEqual([]);
  });
}

test("redirecciones 301 desde las URLs anteriores en vercel.json", async () => {
  const { readFileSync } = await import("node:fs");
  const config = JSON.parse(readFileSync("vercel.json", "utf8")) as {
    redirects: { source: string; destination: string; permanent: boolean }[];
  };
  for (const [oldSlug, newSlug] of Object.entries(legacyServiceSlugs)) {
    const rule = config.redirects.find((r) => r.source === `/servicios/${oldSlug}/`);
    expect(rule?.destination).toBe(servicePath(newSlug));
    expect(rule?.permanent).toBe(true);
    expect(services.some((s) => s.slug === newSlug)).toBe(true);
  }
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
  for (const s of services) expect(sitemap).toContain(`https://cristalte-web.vercel.app${servicePath(s.slug)}`);
  expect(sitemap).not.toContain("/servicios/");
  expect(sitemap).not.toContain("vano6");
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toMatch(/User-Agent: \*/i);
  expect(robots).toMatch(/Allow: \//);
  expect(robots).toContain("Sitemap: https://cristalte-web.vercel.app/sitemap.xml");
});
