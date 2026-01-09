import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import CircularGallery from "@/components/CircularGallery";

const DestinationsSection = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section id="destinations" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-primary font-medium mb-4 tracking-wide uppercase text-sm">
            {t.destinations.sectionTitle}
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t.destinations.title}
            <br />
            {t.destinations.titleBreak}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t.destinations.subtitle}
          </p>
        </div>

        {/* Circular Gallery */}
        <CircularGallery />
      </div>
    </section>
  );
};

export default DestinationsSection;
