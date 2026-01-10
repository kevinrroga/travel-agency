import { MapPin, Instagram, Facebook, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import { toast } from "@/components/ui/sonner";

const EMAIL_ADDRESS = "arlintravelandtour@gmail.com";

const socialLinks = [
  {
    icon: Instagram,
    href: "https://www.instagram.com/arlin_travel_and_tours/",
    label: "Instagram",
    kind: "external" as const,
  },

  {
    icon: Facebook,
    href: "https://www.facebook.com/p/Arlin-Travel-and-Tour-Agency-61553088734617/",
    label: "Facebook",
    kind: "external" as const,
  },

  {
    icon: Mail,
    href: EMAIL_ADDRESS,
    label: "Email",
    kind: "copy" as const,
  },
];

async function copyToClipboard(text: string) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall through
  }

  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const footerLinks = {};

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
              {socialLinks.map((social) =>
                social.kind === "copy" ? (
                  <button
                    key={social.label}
                    type="button"
                    aria-label={`Copy email address ${social.href}`}
                    title={social.href}
                    className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                    onClick={async () => {
                      const ok = await copyToClipboard(social.href);
                      if (ok) {
                        toast.success("Email copied", {
                          description: social.href,
                        });
                      } else {
                        toast.error("Couldn't copy email", {
                          description: social.href,
                        });
                      }
                    }}
                  >
                    <social.icon className="h-5 w-5" />
                  </button>
                ) : (
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
                )
              )}
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
