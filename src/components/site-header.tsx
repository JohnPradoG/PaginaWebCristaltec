"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { navItems } from "@/content/navigation";
import { whatsappMessages } from "@/lib/whatsapp";
import { WhatsAppLink } from "./whatsapp-link";
import { CloseIcon, MenuIcon, WhatsAppIcon } from "./icons";
import { btn, Container } from "./ui";


export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 border-b bg-white/95 backdrop-blur transition-shadow ${
          scrolled ? "border-navy/10 shadow-[0_6px_24px_-12px_rgb(16_45_74_/_0.35)]" : "border-transparent"
        }`}
      >
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
        >
          Saltar al contenido
        </a>
        <Container className="flex h-[72px] items-center justify-between gap-4">
          <Link href="/" className="shrink-0" aria-label="CRISTALTE, ir al inicio" onClick={() => setOpen(false)}>
            {/* eslint-disable-next-line @next/next/no-img-element -- SVG vectorial liviano */}
            <img
              src="/brand/cristalte-logo-horizontal-light.svg"
              alt="CRISTALTE"
              width={260}
              height={64}
              className="h-11 w-auto sm:h-12"
            />
          </Link>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="rounded-md px-3 py-2 text-[15px] font-semibold text-navy hover:bg-mist hover:text-brand"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <WhatsAppLink trackLabel="encabezado" message={whatsappMessages.general()} className={btn("whatsapp", "px-4")}>
                <WhatsAppIcon className="size-5" />
                Cotizar por WhatsApp
              </WhatsAppLink>
            </div>
            <button
              type="button"
              className="inline-flex size-12 items-center justify-center rounded-lg text-navy hover:bg-mist lg:hidden"
              aria-expanded={open}
              aria-controls="menu-movil"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <CloseIcon className="size-7" /> : <MenuIcon className="size-7" />}
            </button>
          </div>
        </Container>

      </header>
        <div
          id="menu-movil"
          hidden={!open}
          className="fixed inset-x-0 top-[72px] bottom-0 z-40 overflow-y-auto border-t border-navy/10 bg-white lg:hidden"
        >
          <nav aria-label="Menú móvil">
            <ul className="px-4 py-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-4 text-lg font-bold text-navy hover:bg-mist"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="px-7 pb-8">
              <WhatsAppLink trackLabel="encabezado" message={whatsappMessages.general()} className={btn("whatsapp", "w-full")}>
                <WhatsAppIcon className="size-5" />
                Cotizar por WhatsApp
              </WhatsAppLink>
            </div>
          </nav>
        </div>
    </>
  );
}
