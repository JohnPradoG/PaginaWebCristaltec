import Link from "next/link";

/** Migas de pan visibles. Acompañar con breadcrumbJsonLd() con los mismos elementos. */
export function Breadcrumbs({ items }: { items: { name: string; path?: string }[] }) {
  const all = [{ name: "Inicio", path: "/" }, ...items];
  return (
    <nav aria-label="Ruta de navegación" className="text-sm text-ink-muted">
      <ol className="flex flex-wrap items-center gap-1.5">
        {all.map((item, i) => {
          const last = i === all.length - 1;
          return (
            <li key={item.name} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden>/</span>}
              {last || !item.path ? (
                <span aria-current={last ? "page" : undefined} className="font-semibold text-navy">
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className="hover:text-brand hover:underline">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
