import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-santorini.jpg";
import heroVideo from "@/assets/aiVideo1.mp4";
import type { CSSProperties } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import { Button } from "@/components/ui/button";
import TypewriterText from "@/components/TypewriterText";

const HeroSection = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const heroMediaStyle = {
    ["viewTransitionName" as never]: "hero-media",
  } as CSSProperties;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          className="w-full h-full object-cover"
          style={heroMediaStyle}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={heroImage}
          aria-label="Hero background video"
          disablePictureInPicture
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/70" />
      </div>

      {/* Content */}
      <div className="relative z-12 container mx-auto px-6 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Typewriter Text */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-8">
            <TypewriterText
              text={t.hero.typewriterText}
              typingSpeed={100}
              showCursor={false}
              cursorCharacter="|"
            />
          </h1>
          {/* Animated Moving Border Button */}
          <Button variant="hero">Shadow</Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
