import { defaultDescription, defaultTitle, pageMetadata } from "@/lib/seo";
import { Hero } from "@/components/sections/hero";
import { ServicesSection } from "@/components/sections/services";
import { AdvantagesSection } from "@/components/sections/advantages";
import { GallerySection } from "@/components/sections/gallery";
import { CtaBanner } from "@/components/sections/cta-banner";
import { QuoteFormSection } from "@/components/sections/quote-form";
import { AboutSection } from "@/components/sections/about";
import { FaqSection } from "@/components/sections/faq";
import { ContactSection } from "@/components/sections/contact";

export const metadata = pageMetadata({ title: defaultTitle, description: defaultDescription, path: "/", absoluteTitle: true });

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <AdvantagesSection />
      <GallerySection limit={6} />
      <CtaBanner />
      <AboutSection />
      <QuoteFormSection />
      <FaqSection limit={4} />
      <ContactSection />
    </>
  );
}
