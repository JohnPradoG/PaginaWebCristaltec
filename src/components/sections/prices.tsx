import { priceList, type PriceItem } from "@/content/prices";
import { btn, Container } from "../ui";

/**
 * Tabla pequeña de precios referenciales con botón al formulario de cotización.
 * No se muestra si no hay precios cargados en src/content/prices.ts.
 */
export function PriceSection({ items = priceList, formHref = "#cotizar" }: { items?: PriceItem[]; formHref?: string }) {
  if (items.length === 0) return null;
  return (
    <section id="precios" aria-labelledby="precios-title" className="py-14 sm:py-16">
      <Container className="max-w-3xl">
        <h2 id="precios-title" className="text-2xl font-extrabold text-navy sm:text-3xl">
          Precios referenciales
        </h2>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-navy/10">
          <table className="w-full border-collapse text-left max-sm:text-[15px]">
            <thead className="bg-mist text-navy">
              <tr>
                <th scope="col" className="p-3 sm:p-4 font-bold">Producto</th>
                <th scope="col" className="p-3 sm:p-4 font-bold">Medida</th>
                <th scope="col" className="p-3 sm:p-4 text-right font-bold">Precio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/10">
              {items.map((p) => (
                <tr key={`${p.product}-${p.size}`}>
                  <td className="p-3 sm:p-4 text-ink">{p.product}</td>
                  <td className="p-3 sm:p-4 text-ink-muted">{p.size}</td>
                  <td className="p-3 sm:p-4 text-right font-bold whitespace-nowrap text-navy">{p.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ink-muted">
            Valores referenciales. El precio final depende de las medidas y del proyecto, y se confirma en la cotización.
          </p>
          <a href={formHref} className={btn("primary", "shrink-0")}>
            Solicitar cotización
          </a>
        </div>
      </Container>
    </section>
  );
}
