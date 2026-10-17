import Link from "next/link";
import { btn, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] max-w-2xl flex-col items-start justify-center py-20">
      <p className="text-sm font-bold tracking-[0.14em] text-brand uppercase">Error 404</p>
      <h1 className="mt-3 text-4xl font-extrabold text-navy">No encontramos esta página</h1>
      <p className="mt-4 text-lg text-ink-muted">Es posible que el enlace haya cambiado. Te invitamos a volver al inicio.</p>
      <Link href="/" className={btn("primary", "mt-8")}>
        Volver al inicio
      </Link>
    </Container>
  );
}
