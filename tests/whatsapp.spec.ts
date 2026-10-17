import { expect, test } from "@playwright/test";
import { siteConfig } from "../src/config/site";
import { buildWhatsAppUrl, whatsappMessages } from "../src/lib/whatsapp";
import { services } from "../src/content/services";
import { validateQuote } from "../src/components/sections/quote-form";

test.describe("generación de enlaces de WhatsApp", () => {
  test.afterEach(() => {
    siteConfig.whatsappNumber = "";
  });

  test("sin número configurado no se genera enlace", () => {
    siteConfig.whatsappNumber = "";
    expect(buildWhatsAppUrl("hola")).toBeNull();
    siteConfig.whatsappNumber = "+56 9 1234";
    expect(buildWhatsAppUrl("hola")).toBeNull();
  });

  test("con número válido codifica el mensaje", () => {
    siteConfig.whatsappNumber = "56900000000"; // número de prueba, no real
    const url = buildWhatsAppUrl(whatsappMessages.general())!;
    expect(url.startsWith("https://wa.me/56900000000?text=")).toBe(true);
    const text = new URL(url).searchParams.get("text");
    expect(text).toBe(
      "Hola, vengo desde la página web de CRISTALTEC y quisiera solicitar una cotización. Me interesa conocer las opciones disponibles para mi proyecto.",
    );
  });

  test("cada servicio incluye su nombre en el mensaje", () => {
    siteConfig.whatsappNumber = "56900000000";
    for (const s of services) {
      const text = new URL(buildWhatsAppUrl(whatsappMessages.service(s.name))!).searchParams.get("text");
      expect(text).toContain(s.name);
    }
  });

  test("el mensaje del formulario incluye todos los datos y caracteres especiales", () => {
    siteConfig.whatsappNumber = "56900000000";
    const data = {
      name: "María Ñúñez & Cía",
      phone: "+56 9 0000 0000",
      commune: "Ñuñoa",
      service: "Mamparas de vidrio",
      description: "Mampara de 5 m #2, ¿es posible? 100% vidrio",
      budget: "Prefiero conversarlo",
    };
    const text = new URL(buildWhatsAppUrl(whatsappMessages.quoteForm(data))!).searchParams.get("text")!;
    for (const v of Object.values(data)) expect(text).toContain(v);
  });

  test("validación del formulario", () => {
    const errors = validateQuote({ name: "", phone: "abc", commune: "", service: "", description: "corto" });
    expect(Object.keys(errors).sort()).toEqual(["commune", "description", "name", "phone", "service"]);
    expect(
      validateQuote({
        name: "Ana",
        phone: "+56 9 0000 0000",
        commune: "Santiago",
        service: "Vitrinas a medida",
        description: "Vitrina de 1,2 x 0,8 m para local",
      }),
    ).toEqual({});
  });
});
