/**
 * PRECIOS REFERENCIALES
 *
 * Valores entregados por CRISTALTEC el 16-10-2026. Se muestran en la portada
 * (todos) y en la página de cada servicio (los de ese servicio).
 * Mantén solo precios reales y vigentes. Si la lista queda vacía, la sección
 * "Precios referenciales" no se muestra.
 *
 * `service` es el slug del servicio al que pertenece cada fila.
 */
export type PriceItem = {
  service: string;
  product: string;
  size: string;
  price: string;
  /** Aclaración opcional que se muestra bajo el producto. */
  note?: string;
};

export const priceList: PriceItem[] = [
  { service: "ventanas-de-aluminio", product: "Ventana aluminio línea 5000", size: "1000 × 1000 mm", price: "$47.000 CLP" },
  { service: "ventanas-de-aluminio", product: "Ventana aluminio línea 5000", size: "500 × 500 mm", price: "$30.000 CLP" },
  { service: "ventanas-de-aluminio", product: "Ventana aluminio línea 25", size: "1000 × 1000 mm", price: "$68.900 CLP" },
  { service: "ventanas-de-aluminio", product: "Ventana aluminio línea 25", size: "2000 × 2000 mm", price: "$255.000 CLP" },
  { service: "ventanas-de-pvc", product: "Ventanas de PVC", size: "Varias medidas", price: "Desde $66.000 CLP" },
  { service: "shower-doors", product: "Shower Doors", size: "Según medidas", price: "Desde $100.000 CLP" },
  {
    service: "vitrinas-a-medida",
    product: "Vitrinas a medida",
    size: "Según medidas y diseño",
    price: "Desde $80.000 CLP",
    note: "Desde $80.000. El precio final depende de las medidas, el diseño y las características del proyecto.",
  },
];
