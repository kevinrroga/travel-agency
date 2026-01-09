import { useState, useEffect } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import destBali from "@/assets/dest-bali.jpg";
import destSwitzerland from "@/assets/dest-switzerland.jpg";
import destJapan from "@/assets/dest-japan.jpg";
import destMorocco from "@/assets/dest-morocco.jpg";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import { Button } from "./ui/button";

const CircularGallery = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);

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

  const totalItems = destinations.length;
  const angleStep = 360 / totalItems;

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % totalItems);
    setRotation((prev) => prev - angleStep);
    setIsAutoRotating(false);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + totalItems) % totalItems);
    setRotation((prev) => prev + angleStep);
    setIsAutoRotating(false);
  };

  const rotateToIndex = (index: number) => {
    // Calculate how many steps forward to reach the target index
    let diff = index - activeIndex;
    if (diff < 0) {
      // If negative, wrap around to go forward
      diff = diff + totalItems;
    }

    setActiveIndex(index);
    setRotation((prev) => prev - diff * angleStep);
    setIsAutoRotating(false);
  };

  // Auto-rotate
  useEffect(() => {
    if (!isAutoRotating) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalItems);
      setRotation((prev) => prev - angleStep);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoRotating, angleStep, totalItems]);

  return (
    <div className="relative w-full min-h-[700px] flex items-center justify-center py-12">
      {/* Center Info Card */}
      <div className="absolute z-20 bg-card/95 backdrop-blur-md rounded-2xl p-8 shadow-elevated max-w-md border border-border">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="text-accent text-sm font-medium">
            {destinations[activeIndex].duration}
          </span>
          <span className="text-muted-foreground">•</span>
          <span className="text-muted-foreground text-sm">
            {destinations[activeIndex].price}
          </span>
        </div>
        <h3 className="font-display text-3xl font-bold text-foreground mb-3 text-center">
          {destinations[activeIndex].name}
        </h3>
        <p className="text-muted-foreground mb-6 text-center">
          {destinations[activeIndex].description}
        </p>
        <Button className="w-full gap-2" size="lg">
          <span>{t.destinations.explore}</span>
          <ArrowUpRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Circular Gallery */}
      <div
        className="relative w-[600px] h-[600px] transition-transform duration-1000 ease-in-out"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {destinations.map((dest, index) => {
          const angle = index * angleStep;
          const radius = 280;
          const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius;
          const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius;
          const isActive = index === activeIndex;

          return (
            <button
              key={dest.name}
              onClick={() => rotateToIndex(index)}
              className="absolute top-1/2 left-1/2 transition-all duration-1000 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-2xl"
              style={{
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${-rotation}deg) scale(${
                  isActive ? 1.2 : 0.8
                })`,
                zIndex: isActive ? 10 : 5,
              }}
              aria-label={`View ${dest.name}`}
            >
              <div
                className={`rounded-2xl overflow-hidden shadow-lg transition-all duration-500 ${
                  isActive
                    ? "ring-4 ring-primary"
                    : "opacity-60 hover:opacity-80"
                }`}
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-40 h-52 object-cover"
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="outline"
        size="icon"
        onClick={prevSlide}
        className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 z-20 rounded-full w-12 h-12 shadow-lg"
        aria-label="Previous destination"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={nextSlide}
        className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 z-20 rounded-full w-12 h-12 shadow-lg"
        aria-label="Next destination"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {destinations.map((_, index) => (
          <button
            key={index}
            onClick={() => rotateToIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === activeIndex
                ? "bg-primary w-8"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50 w-2"
            }`}
            aria-label={`Go to destination ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CircularGallery;
