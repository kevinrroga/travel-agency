import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    location: "New York, USA",
    rating: 5,
    text: "Wanderlust transformed our honeymoon into a fairy tale. Every detail was perfect—from the private villa in Bali to the surprise sunset dinner. Absolutely magical!",
    avatar: "SM",
  },
  {
    name: "James Chen",
    location: "London, UK",
    rating: 5,
    text: "As a solo traveler, I was nervous about my Japan trip. Their team made everything seamless and I discovered hidden gems I never would have found on my own.",
    avatar: "JC",
  },
  {
    name: "Maria Rodriguez",
    location: "Barcelona, Spain",
    rating: 5,
    text: "Third trip booked with Wanderlust and each one exceeds expectations. Their local connections and attention to detail are unmatched in the industry.",
    avatar: "MR",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary font-medium mb-4 tracking-wide uppercase text-sm">
            Traveler Stories
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            What Our Adventurers Say
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="relative p-8 bg-card rounded-2xl shadow-card hover:shadow-elevated transition-all duration-500"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/20" />

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>

              {/* Text */}
              <p className="text-foreground leading-relaxed mb-8">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-muted-foreground text-sm">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
