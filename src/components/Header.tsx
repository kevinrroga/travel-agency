import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import LanguageSwitcher from "./LanguageSwitcher";
import ViewTransitionLink from "@/components/ViewTransitionLink";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    if (!isMenuOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      const menuEl = mobileMenuRef.current;
      if (!menuEl) return;

      const targetNode = event.target as Node | null;
      if (!targetNode) return;

      // If the click/tap is outside the menu panel, close it.
      if (!menuEl.contains(targetNode)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown, { capture: true });
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, {
        capture: true,
      } as AddEventListenerOptions);
    };
  }, [isMenuOpen]);

  const navLinks = [
    {
      name: t.header.destinations,
      href: "#destinations",
      type: "anchor" as const,
    },
    {
      name: t.header.accommodation,
      href: "/accommodation",
      type: "link" as const,
    },
    { name: t.header.contact, href: "#contact", type: "anchor" as const },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <ViewTransitionLink to="/" className="flex items-center gap-2">
            <MapPin className="h-8 w-8 text-primary" />
            <span className="font-display text-2xl font-semibold text-foreground">
              Arlin Travel&amp;Tours
            </span>
          </ViewTransitionLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              link.type === "link" ? (
                (() => {
                  const isActive = location.pathname === link.href;

                  return (
                    <ViewTransitionLink
                      key={link.name}
                      to={link.href}
                      className={`transition-colors duration-300 font-medium hover:text-foreground ${
                        isActive
                          ? "text-foreground underline underline-offset-8 decoration-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      {link.name}
                    </ViewTransitionLink>
                  );
                })()
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-medium"
                >
                  {link.name}
                </a>
              )
            )}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <Button variant="default" size="lg">
              {t.header.planTrip}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <>
            {/* Backdrop: click to close */}
            <div
              className="md:hidden fixed inset-0 top-20 z-40 bg-foreground/10 pointer-events-auto"
              aria-hidden="true"
              onPointerDown={() => setIsMenuOpen(false)}
            />

            {/* Menu panel */}
            <div
              ref={mobileMenuRef}
              className="md:hidden fixed left-0 right-0 top-20 z-50 border-t border-border animate-fade-in bg-background/95 backdrop-blur-md"
            >
              <div className="container mx-auto px-6 py-6">
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) =>
                    link.type === "link" ? (
                      (() => {
                        const isActive = location.pathname === link.href;

                        return (
                          <ViewTransitionLink
                            key={link.name}
                            to={link.href}
                            className={`font-medium py-2 ${
                              isActive
                                ? "text-foreground underline underline-offset-8 decoration-primary"
                                : "text-foreground"
                            }`}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {link.name}
                          </ViewTransitionLink>
                        );
                      })()
                    ) : (
                      <a
                        key={link.name}
                        href={link.href}
                        className="text-foreground font-medium py-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.name}
                      </a>
                    )
                  )}
                  <LanguageSwitcher />
                  <Button variant="default" size="lg" className="mt-4">
                    {t.header.planTrip}
                  </Button>
                </nav>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
