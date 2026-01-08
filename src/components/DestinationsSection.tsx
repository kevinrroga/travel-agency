import { ArrowUpRight } from "lucide-react";
import destBali from "@/assets/dest-bali.jpg";
import destSwitzerland from "@/assets/dest-switzerland.jpg";
import destJapan from "@/assets/dest-japan.jpg";
import destMorocco from "@/assets/dest-morocco.jpg";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";

const DestinationsSection = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const destinations = [
    {
      name: t.destinations.bali,
      description: t.destinations.baliDesc,
      image: destBali,
      price: `${t.destinations.from} $1,299`,
      duration: `7 ${t.destinations.days}`,
    },
    {
      name: t.destinations.swissAlps,
      description: t.destinations.swissDesc,
      image: destSwitzerland,
      price: `${t.destinations.from} $2,499`,
      duration: `10 ${t.destinations.days}`,
    },
    {
      name: t.destinations.kyoto,
      description: t.destinations.kyotoDesc,
      image: destJapan,
      price: `${t.destinations.from} $1,899`,
      duration: `8 ${t.destinations.days}`,
    },
    {
      name: t.destinations.marrakech,
      description: t.destinations.marrakechDesc,
      image: destMorocco,
      price: `${t.destinations.from} $1,199`,
      duration: `6 ${t.destinations.days}`,
    },
  ];

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

        {/* Destinations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest, index) => (
            <a
              key={dest.name}
              href="#"
              className="group relative overflow-hidden rounded-2xl aspect-[3/4] bg-card shadow-card hover:shadow-elevated transition-all duration-500"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <img
                src={dest.image}
                alt={dest.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-accent text-sm font-medium">
                    {dest.duration}
                  </span>
                  <span className="text-primary-foreground/50">•</span>
                  <span className="text-primary-foreground/70 text-sm">
                    {dest.price}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-semibold text-primary-foreground mb-1">
                  {dest.name}
                </h3>
                <p className="text-primary-foreground/70 text-sm mb-4">
                  {dest.description}
                </p>
                <div className="flex items-center gap-2 text-primary-foreground font-medium opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <span>{t.destinations.explore}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
