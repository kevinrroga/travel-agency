import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { language } = useLanguage();
  const t = translations[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            {t.newsletter.title}
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-10">
            {t.newsletter.subtitle}
          </p>

          {isSubmitted ? (
            <div className="flex items-center justify-center gap-3 text-primary-foreground animate-fade-in">
              <CheckCircle className="h-6 w-6 text-accent" />
              <span className="text-lg font-medium">{t.newsletter.thanks}</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.newsletter.placeholder}
                required
                className="flex-1 px-6 py-4 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-primary-foreground/40 transition-colors"
              />
              <Button type="submit" variant="warm" size="xl" className="group">
                {t.newsletter.button}
                <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          )}

          <p className="text-primary-foreground/60 text-sm mt-6">
            {t.newsletter.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
