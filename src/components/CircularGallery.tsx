import { useState, useEffect, useRef } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import destBali from "@/assets/dest-bali.jpg";
import destSwitzerland from "@/assets/dest-switzerland.jpg";
import destJapan from "@/assets/dest-japan.jpg";
import destMorocco from "@/assets/dest-morocco.jpg";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import { Button } from "./ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import DestinationWeatherBadge from "@/components/DestinationWeatherBadge";

const CircularGallery = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const swipeState = useRef<{
    pointerId: number | null;
    startX: number;
    startY: number;
    hasSwiped: boolean;
  }>({ pointerId: null, startX: 0, startY: 0, hasSwiped: false });

  const destinations = [
    {
      name: t.destinations.bali,
      description: t.destinations.baliDesc,
      image: destBali,
      latitude: -8.4095,
      longitude: 115.1889,
      price: `${t.destinations.from} $1,299`,
      duration: `7 ${t.destinations.days}`,
    },
    {
      name: t.destinations.swissAlps,
      description: t.destinations.swissDesc,
      image: destSwitzerland,
      latitude: 46.6863,
      longitude: 7.8632,
      price: `${t.destinations.from} $2,499`,
      duration: `10 ${t.destinations.days}`,
    },
    {
      name: t.destinations.kyoto,
      description: t.destinations.kyotoDesc,
      image: destJapan,
      latitude: 35.0116,
      longitude: 135.7681,
      price: `${t.destinations.from} $1,899`,
      duration: `8 ${t.destinations.days}`,
    },
    {
      name: t.destinations.marrakech,
      description: t.destinations.marrakechDesc,
      image: destMorocco,
      latitude: 31.6295,
      longitude: -7.9811,
      price: `${t.destinations.from} $1,199`,
      duration: `6 ${t.destinations.days}`,
    },
    {
      name: t.destinations.paris,
      description: t.destinations.parisDesc,
      image:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop",
      latitude: 48.8566,
      longitude: 2.3522,
      price: `${t.destinations.from} $1,799`,
      duration: `5 ${t.destinations.days}`,
    },
    {
      name: t.destinations.rome,
      description: t.destinations.romeDesc,
      image:
        "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=600&fit=crop",
      latitude: 41.9028,
      longitude: 12.4964,
      price: `${t.destinations.from} $1,599`,
      duration: `6 ${t.destinations.days}`,
    },
    {
      name: t.destinations.munich,
      description: t.destinations.munichDesc,
      image:
        "https://images.unsplash.com/photo-1595867818082-083862f3d630?w=800&h=600&fit=crop",
      latitude: 48.1351,
      longitude: 11.582,
      price: `${t.destinations.from} $1,499`,
      duration: `5 ${t.destinations.days}`,
    },
    {
      name: t.destinations.madrid,
      description: t.destinations.madridDesc,
      image:
        "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&h=600&fit=crop",
      latitude: 40.4168,
      longitude: -3.7038,
      price: `${t.destinations.from} $1,399`,
      duration: `5 ${t.destinations.days}`,
    },
    {
      name: t.destinations.athens,
      description: t.destinations.athensDesc,
      image:
        "https://images.unsplash.com/photo-1555993539-1732b0258235?w=800&h=600&fit=crop",
      latitude: 37.9838,
      longitude: 23.7275,
      price: `${t.destinations.from} $1,299`,
      duration: `6 ${t.destinations.days}`,
    },
    {
      name: t.destinations.london,
      description: t.destinations.londonDesc,
      image:
        "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop",
      latitude: 51.5074,
      longitude: -0.1278,
      price: `${t.destinations.from} $1,899`,
      duration: `5 ${t.destinations.days}`,
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

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isMobile) return;
    if (event.pointerType !== "touch") return;

    swipeState.current.pointerId = event.pointerId;
    swipeState.current.startX = event.clientX;
    swipeState.current.startY = event.clientY;
    swipeState.current.hasSwiped = false;
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isMobile) return;
    if (event.pointerType !== "touch") return;
    if (swipeState.current.pointerId !== event.pointerId) return;
    if (swipeState.current.hasSwiped) return;

    const dx = event.clientX - swipeState.current.startX;
    const dy = event.clientY - swipeState.current.startY;

    // If the user is primarily scrolling vertically, don't hijack.
    if (Math.abs(dy) > Math.abs(dx)) return;

    const swipeThresholdPx = 40;
    if (Math.abs(dx) < swipeThresholdPx) return;

    swipeState.current.hasSwiped = true;
    setIsAutoRotating(false);

    if (dx < 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  };

  const onPointerUpOrCancel = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isMobile) return;
    if (event.pointerType !== "touch") return;
    if (swipeState.current.pointerId !== event.pointerId) return;

    swipeState.current.pointerId = null;
    swipeState.current.hasSwiped = false;
  };

  return (
    <div
      className={`relative w-full min-h-[700px] flex items-center justify-center py-12 ${
        isMobile ? "touch-pan-y" : ""
      }`}
      onPointerDown={isMobile ? onPointerDown : undefined}
      onPointerMove={isMobile ? onPointerMove : undefined}
      onPointerUp={isMobile ? onPointerUpOrCancel : undefined}
      onPointerCancel={isMobile ? onPointerUpOrCancel : undefined}
    >
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

        <div className="flex justify-center mb-4">
          <DestinationWeatherBadge
            latitude={destinations[activeIndex].latitude}
            longitude={destinations[activeIndex].longitude}
          />
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
        className="hidden md:inline-flex absolute left-4 md:left-12 top-1/2 -translate-y-1/2 z-20 rounded-full w-12 h-12 shadow-lg"
        aria-label="Previous destination"
      >
        <ChevronLeft className="h-4 w-4 md:h-4 md:w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={nextSlide}
        className="hidden md:inline-flex absolute right-4 md:right-12 top-1/2 -translate-y-1/2 z-20 rounded-full w-12 h-12 shadow-lg"
        aria-label="Next destination"
      >
        <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
      </Button>

      {/* Navigation Dots */}
      <div className="absolute -bottom-10 md:-bottom-12 left-1/2 -translate-x-1/2 flex gap-2 z-20">
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
