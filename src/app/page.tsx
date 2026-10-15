import { faqJsonLd, jsonLdScript, localBusinessJsonLd } from "@/lib/seo";
import { Hero } from "@/components/sections/hero";
import { ServicesSection } from "@/components/sections/services";
import { AdvantagesSection } from "@/components/sections/advantages";
import { GallerySection } from "@/components/sections/gallery";
import { CtaBanner } from "@/components/sections/cta-banner";
import { QuoteFormSection } from "@/components/sections/quote-form";
import { AboutSection } from "@/components/sections/about";
import { FaqSection } from "@/components/sections/faq";
import { ContactSection } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(localBusinessJsonLd())} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(faqJsonLd())} />
      <Hero />
      <ServicesSection />
      <AdvantagesSection />
      <GallerySection />
      <CtaBanner />
      <AboutSection />
      <QuoteFormSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
