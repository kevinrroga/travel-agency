const AccommodationPage = () => {
  return (
    <main>
      {/* Hero Section with Images */}
      <section className="container mx-auto px-6 py-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
          Luxury Apartment in Santorini
        </h1>

        {/* Image Gallery Placeholder */}
        <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[500px] rounded-2xl overflow-hidden">
          <div className="col-span-2 row-span-2 bg-muted">
            <img
              src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop"
              alt="Main view"
              className="w-full h-full object-cover"
              style={{ ["viewTransitionName" as never]: "hero-media" }}
            />
          </div>
          <div className="bg-muted">
            <img
              src="https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400&h=250&fit=crop"
              alt="View 2"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="bg-muted">
            <img
              src="https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=250&fit=crop"
              alt="View 3"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="bg-muted">
            <img
              src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=250&fit=crop"
              alt="View 4"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="bg-muted">
            <img
              src="https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=400&h=250&fit=crop"
              alt="View 5"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Property Details */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="md:col-span-2 space-y-8">
            {/* Quick Info */}
            <div>
              <h2 className="text-2xl font-bold mb-4">
                Entire apartment in Santorini, Greece
              </h2>
              <div className="flex gap-4 text-muted-foreground">
                <span>4 guests</span>
                <span>•</span>
                <span>2 bedrooms</span>
                <span>•</span>
                <span>2 beds</span>
                <span>•</span>
                <span>2 bathrooms</span>
              </div>
            </div>

            <hr />

            {/* Description */}
            <div>
              <h3 className="text-xl font-semibold mb-4">About this place</h3>
              <p className="text-muted-foreground leading-relaxed">
                Experience the magic of Santorini in this stunning apartment
                with breathtaking caldera views. Located in the heart of Oia,
                you'll be steps away from the famous blue domes and sunset
                views. The apartment features modern amenities, a private
                terrace, and authentic Cycladic architecture.
              </p>
            </div>

            <hr />

            {/* Amenities */}
            <div>
              <h3 className="text-xl font-semibold mb-4">
                What this place offers
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <span>🌊</span>
                  <span>Sea view</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>📶</span>
                  <span>WiFi</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>🍳</span>
                  <span>Kitchen</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>❄️</span>
                  <span>Air conditioning</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>🏊</span>
                  <span>Pool access</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>🅿️</span>
                  <span>Free parking</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="md:col-span-1">
            <div className="sticky top-24 border border-border rounded-2xl p-6 shadow-card">
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">$299</span>
                  <span className="text-muted-foreground">/ night</span>
                </div>
              </div>

              {/* Date Inputs */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Check-in
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Check-out
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Guests
                  </label>
                  <select className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>1 guest</option>
                    <option>2 guests</option>
                    <option>3 guests</option>
                    <option>4 guests</option>
                  </select>
                </div>
              </div>

              <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                Reserve
              </button>

              <p className="text-center text-sm text-muted-foreground mt-4">
                You won't be charged yet
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="container mx-auto px-6 py-12">
        <h3 className="text-2xl font-bold mb-6">Where you'll be</h3>
        <div className="bg-muted rounded-2xl h-96 flex items-center justify-center">
          <p className="text-muted-foreground">Map will be displayed here</p>
        </div>
        <p className="mt-4 text-muted-foreground">Oia, Santorini, Greece</p>
      </section>
    </main>
  );
};

export default AccommodationPage;
