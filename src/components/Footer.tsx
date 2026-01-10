import { MapPin, Instagram, Facebook } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";

const socialLinks = [
  {
    icon: Instagram,
    href: "https://www.instagram.com/arlin_travel_and_tours/",
    label: "Instagram",
  },

  {
    icon: Facebook,
    href: "https://www.facebook.com/p/Arlin-Travel-and-Tour-Agency-61553088734617/",
    label: "Facebook",
  },
];

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const footerLinks = {
    
  };

  return (
    <footer
      id="contact"
      className="bg-foreground text-primary-foreground py-16 scroll-mt-24"
    >
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="/" className="flex items-center gap-2 mb-6">
              <MapPin className="h-8 w-8 text-accent" />
              <span className="font-display text-2xl font-semibold">
                Arlin Travel&amp;Tours
              </span>
            </a>
            <p className="text-primary-foreground/70 mb-6 max-w-sm">
              {t.footer.tagline}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/60 text-sm">
            {t.footer.copyright}
          </p>
          <div className="flex gap-6 text-sm text-primary-foreground/60"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
