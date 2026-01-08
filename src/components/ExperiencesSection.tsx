import { Compass, Sparkles, Shield, Heart } from "lucide-react";

const experiences = [
  {
    icon: Compass,
    title: "Expertly Curated",
    description: "Our travel specialists handpick every experience, ensuring authenticity and unforgettable moments at every turn.",
  },
  {
    icon: Sparkles,
    title: "Luxury Redefined",
    description: "From boutique hideaways to world-class resorts, we partner with the finest establishments worldwide.",
  },
  {
    icon: Shield,
    title: "Seamless Journey",
    description: "Travel worry-free with 24/7 concierge support, flexible bookings, and comprehensive travel protection.",
  },
  {
    icon: Heart,
    title: "Personal Touch",
    description: "Every itinerary is tailored to your dreams. Tell us your vision, and we'll craft the perfect adventure.",
  },
];

const ExperiencesSection = () => {
  return (
    <section id="experiences" className="py-24 bg-muted/50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary font-medium mb-4 tracking-wide uppercase text-sm">
            Why Choose Us
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Travel With Confidence
          </h2>
          <p className="text-muted-foreground text-lg">
            We don't just plan trips—we create transformative experiences 
            that stay with you long after you've returned home.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {experiences.map((exp, index) => (
            <div
              key={exp.title}
              className="group p-8 bg-card rounded-2xl shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                <exp.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {exp.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperiencesSection;
