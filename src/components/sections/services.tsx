import { services } from "@/content/services";
import { ServiceCard } from "../service-card";
import { Container, SectionHeading } from "../ui";

export function ServicesSection() {
  return (
    <section id="servicios" aria-labelledby="servicios-title" className="bg-mist py-20 sm:py-24">
      <Container>
        <SectionHeading
          id="servicios-title"
          eyebrow="Servicios"
          title="Soluciones en aluminio, vidrio y PVC"
          intro="Diseñamos y fabricamos a medida para viviendas, departamentos, comercios y proyectos de construcción."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Container>
    </section>
  );
}
