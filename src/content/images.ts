/**
 * IMÁGENES DE REFERENCIA (DEMOSTRATIVAS)
 *
 * Todas las fotografías de este archivo provienen de Unsplash y se usan bajo la
 * Licencia Unsplash (https://unsplash.com/license). NO son trabajos realizados
 * por CRISTALTE: se muestran solo como referencia visual mientras el propietario
 * entrega fotografías reales. En la web aparecen marcadas como "Imagen referencial".
 *
 * Para reemplazarlas por fotos reales:
 *   1. Copia la foto a /public/proyectos/ (por ejemplo terraza-01.webp).
 *   2. Cambia `src` por "/proyectos/terraza-01.webp".
 *   3. Cambia `demo` a false y borra `credit`.
 */

export type SiteImage = {
  src: string;
  alt: string;
  /** true = imagen de referencia de terceros, no es un trabajo de CRISTALTE. */
  demo: boolean;
  credit?: { author: string; url: string };
};

const unsplash = (id: string) => `https://images.unsplash.com/${id}`;

export const images = {
  hero: {
    src: unsplash("photo-1633544097071-ac8410bf9e20"),
    alt: "Terraza moderna con puertas correderas de vidrio y perfiles de aluminio",
    demo: true,
    credit: { author: "Georg D", url: "https://unsplash.com/photos/wj3wBOVtRWU" },
  },
  terrazaPlegable: {
    src: unsplash("photo-1758998256408-ab2c9fbec19b"),
    alt: "Cerramiento de terraza con puertas plegables de vidrio y marco oscuro",
    demo: true,
    credit: { author: "MBOR MC", url: "https://unsplash.com/photos/MwRS-3OxOl4" },
  },
  balconCerrado: {
    src: unsplash("photo-1758216862102-04782596be32"),
    alt: "Edificio de departamentos con balcón cerrado con vidrio",
    demo: true,
    credit: { author: "Artur Piterov", url: "https://unsplash.com/photos/b-Rt2TpFePY" },
  },
  terrazaCasa: {
    src: unsplash("photo-1494884113216-952a0c2c1a30"),
    alt: "Casa moderna con terraza de vidrio y líneas arquitectónicas",
    demo: true,
    credit: { author: "Ehud Neuhaus", url: "https://unsplash.com/photos/iv77yw43cAI" },
  },
  showerMarmol: {
    src: unsplash("photo-1771929662486-f793e08f0f16"),
    alt: "Baño moderno con shower door de vidrio templado y muros de mármol",
    demo: true,
    credit: { author: "Smart Renovations", url: "https://unsplash.com/photos/Ies-rhvusTs" },
  },
  showerBano: {
    src: unsplash("photo-1668910224571-8ee63c306d89"),
    alt: "Baño con mampara de ducha de vidrio transparente",
    demo: true,
    credit: { author: "Point3D Commercial Imaging", url: "https://unsplash.com/photos/3TBHo9914ss" },
  },
  showerAzulejo: {
    src: unsplash("photo-1666777333711-458a2c2a7c9e"),
    alt: "Baño con azulejos y puerta de ducha de vidrio",
    demo: true,
    credit: { author: "Wilhelm Gunkel", url: "https://unsplash.com/photos/Ffft_nSdQd8" },
  },
  ventanasDormitorio: {
    src: unsplash("photo-1736593319421-250e17bb2f11"),
    alt: "Dormitorio iluminado con ventanas amplias",
    demo: true,
    credit: { author: "Declan Sun", url: "https://unsplash.com/photos/16hlvscuHeE" },
  },
  ventanalCorredera: {
    src: unsplash("photo-1721824294646-df999b8922d2"),
    alt: "Habitación con ventanal corredero de vidrio de piso a techo",
    demo: true,
    credit: { author: "Lisa Anna", url: "https://unsplash.com/photos/1R07E8FYgzU" },
  },
  ventanaPvc: {
    src: unsplash("photo-1730718949490-8bb461a9d9bc"),
    alt: "Ventana de PVC blanca con manilla oscilobatiente",
    demo: true,
    credit: { author: "Okna Milano", url: "https://unsplash.com/photos/fGm25gZt6Uo" },
  },
  puertaPvcCocina: {
    src: unsplash("photo-1730718962209-ab6f8878eaea"),
    alt: "Cocina con puerta corredera de vidrio y marco de PVC",
    demo: true,
    credit: { author: "Okna Milano", url: "https://unsplash.com/photos/cZmn6l34Kns" },
  },
  puertaComercial: {
    src: unsplash("photo-1773156191860-e351c137da47"),
    alt: "Local comercial con puertas de vidrio y perfiles negros",
    demo: true,
    credit: { author: "Trista Le", url: "https://unsplash.com/photos/PyHrr8nZXvs" },
  },
  puertaTerraza: {
    src: unsplash("photo-1582734073424-1cc142558946"),
    alt: "Puerta de vidrio con marco metálico negro hacia una terraza",
    demo: true,
    credit: { author: "Arno Senoner", url: "https://unsplash.com/photos/dzSrwiImFlA" },
  },
  espejoGrande: {
    src: unsplash("photo-1691662754730-2415e37e1052"),
    alt: "Habitación con espejo de gran formato y lámpara",
    demo: true,
    credit: { author: "Agnieszka Stankiewicz", url: "https://unsplash.com/photos/_sDIBs35S3I" },
  },
  espejoMuro: {
    src: unsplash("photo-1657941602490-1277bac681f9"),
    alt: "Espejo instalado sobre muro en un local comercial",
    demo: true,
    credit: { author: "Chanidapha Sittikorn", url: "https://unsplash.com/photos/qgZic8Y33vA" },
  },
  barandaEscalera: {
    src: unsplash("photo-1651336635269-d45148617073"),
    alt: "Escalera blanca con baranda de vidrio",
    demo: true,
    credit: { author: "Gadiel Lazcano", url: "https://unsplash.com/photos/7YFksPMQhi0" },
  },
  barandaVentanal: {
    src: unsplash("photo-1758814638045-4245efeac82d"),
    alt: "Escalera moderna con barandas de vidrio y grandes ventanales",
    demo: true,
    credit: { author: "Leongsan", url: "https://unsplash.com/photos/vHVeaQtMp6M" },
  },
  barandaMarmol: {
    src: unsplash("photo-1771904488645-fa6ebf7a2d06"),
    alt: "Escalera con baranda de vidrio y muro de mármol",
    demo: true,
    credit: { author: "Wesley Shen", url: "https://unsplash.com/photos/2l2EslhTaOM" },
  },
  divisionOficina: {
    src: unsplash("photo-1521250164448-79d809c7cb0f"),
    alt: "Oficina con división de vidrio transparente",
    demo: true,
    credit: { author: "H&CO", url: "https://unsplash.com/photos/GkuZdv11Gfo" },
  },
  pasilloVidrio: {
    src: unsplash("photo-1504297050568-910d24c426d3"),
    alt: "Pasillo de oficinas con muros divisorios de vidrio",
    demo: true,
    credit: { author: "Mia Baker", url: "https://unsplash.com/photos/jjhvyxm34nY" },
  },
} satisfies Record<string, SiteImage>;
