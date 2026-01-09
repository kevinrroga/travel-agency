import { MapPin, Instagram, Facebook} from "lucide-react";
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
  }
];

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const footerLinks = {
    destinations: [
      { name: t.footer.europe, href: "#" },
      { name: t.footer.asia, href: "#" },
      { name: t.footer.americas, href: "#" },
      { name: t.footer.africa, href: "#" },
      { name: t.footer.oceania, href: "#" },
    ],
    company: [
      { name: t.footer.accomodation, href: "#accomodation" },
      { name: t.footer.ourTeam, href: "#" },
      { name: t.footer.careers, href: "#" },
      { name: t.footer.press, href: "#" },
      { name: t.footer.partners, href: "#" },
    ],
    support: [
      { name: t.footer.contact, href: "#contact" },
      { name: t.footer.faq, href: "#" },
      { name: t.footer.insurance, href: "#" },
    ],
  };

  return (
    <footer
      id="contact"
      className="bg-foreground text-primary-foreground py-16"
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
          <div>
            <h4 className="font-semibold mb-4">{t.footer.destinationsTitle}</h4>
            <ul className="space-y-3">
              {footerLinks.destinations.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t.footer.companyTitle}</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t.footer.supportTitle}</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/60 text-sm">
            {t.footer.copyright}
          </p>
          <div className="flex gap-6 text-sm text-primary-foreground/60">
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
