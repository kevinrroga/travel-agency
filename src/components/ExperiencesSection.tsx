import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import { BadgeCheck, Headphones, Sparkles, HeartHandshake } from "lucide-react";

const ExperiencesSection = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const items = [
    {
      title: t.experiences.expertTitle,
      description: t.experiences.expertDesc,
      Icon: Sparkles,
    },
    {
      title: t.experiences.luxuryTitle,
      description: t.experiences.luxuryDesc,
      Icon: BadgeCheck,
    },
    {
      title: t.experiences.seamlessTitle,
      description: t.experiences.seamlessDesc,
      Icon: Headphones,
    },
    {
      title: t.experiences.personalTitle,
      description: t.experiences.personalDesc,
      Icon: HeartHandshake,
    },
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <p className="text-primary font-medium mb-4 tracking-wide uppercase text-sm">
            {t.experiences.sectionTitle}
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t.experiences.title}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t.experiences.subtitle}
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ title, description, Icon }) => (
            <div
              key={title}
              className="rounded-2xl border border-border/60 bg-background/70 backdrop-blur-sm p-6 shadow-card"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperiencesSection;
