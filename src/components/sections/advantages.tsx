import { ChatIcon, LayersIcon, RulerIcon, SparkleIcon, ToolsIcon, UserIcon } from "../icons";
import { Container, SectionHeading } from "../ui";

/**
 * Beneficios que la empresa puede respaldar. No agregar garantías,
 * certificaciones ni plazos sin confirmación del propietario.
 */
const advantages = [
  {
    icon: RulerIcon,
    title: "Soluciones a medida",
    text: "Cada proyecto se adapta a las medidas y condiciones de tu espacio.",
  },
  {
    icon: ChatIcon,
    title: "Asesoría en el diseño",
    text: "Te ayudamos a elegir el sistema, los materiales y las terminaciones adecuadas.",
  },
  {
    icon: UserIcon,
    title: "Atención personalizada",
    text: "Conversamos contigo para entender lo que necesitas antes de cotizar.",
  },
  {
    icon: SparkleIcon,
    title: "Cuidado de los acabados",
    text: "Ponemos atención en los detalles y las terminaciones de cada trabajo.",
  },
  {
    icon: LayersIcon,
    title: "Alternativas de materiales",
    text: "Aluminio, vidrio y PVC: opciones según el uso, el estilo y tu presupuesto.",
  },
  {
    icon: ToolsIcon,
    title: "Fabricación e instalación",
    text: "Coordinamos la fabricación y la instalación cuando corresponde al proyecto.",
  },
];

export function AdvantagesSection() {
  return (
    <section aria-labelledby="ventajas-title" className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          id="ventajas-title"
          eyebrow="Por qué CRISTALTEC"
          title="Detalles que marcan la diferencia"
        />
        <ul className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex gap-4">
              <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-navy text-white">
                <Icon className="size-6" />
              </span>
              <div>
                <h3 className="text-lg font-extrabold text-navy">{title}</h3>
                <p className="mt-1 leading-relaxed text-ink-muted">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
