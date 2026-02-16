"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface TripData {
  id: number;
  destination: string;
  destinationCountry?: string | null;
  departureCities: string[];
  stops: string[];
  price: number;
  currency: string;
  weekNumber?: number | null;
  startDate?: string | null;
  endDate?: string | null;
  includes: string[];
  hotelName?: string | null;
  hotelStars?: number | null;
  bookingUrl: string;
  company: {
    name: string;
    websiteUrl: string;
    logoUrl?: string | null;
  };
}

export default function TripDetailPage() {
  const params = useParams();
  const [trip, setTrip] = useState<TripData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTrip = useCallback(async () => {
    try {
      const res = await fetch(`/api/trips/${params.id}`);
      if (!res.ok) {
        setError("Resan kunde inte hittas.");
        return;
      }
      const data = await res.json();
      setTrip(data);
    } catch {
      setError("Något gick fel.");
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    fetchTrip();
  }, [fetchTrip]);

  const handleBookClick = async () => {
    if (!trip) return;
    try {
      const res = await fetch("/api/track-click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tripId: trip.id,
          referrer: typeof window !== "undefined" ? window.location.href : "",
        }),
      });
      const data = await res.json();
      if (data.bookingUrl) {
        window.open(data.bookingUrl, "_blank");
      }
    } catch {
      window.open(trip.bookingUrl, "_blank");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Laddar resa...</p>
        </div>
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-500 mb-4">
            {error || "Resan kunde inte hittas."}
          </p>
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-700 underline"
          >
            ← Tillbaka till söksidan
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header / Navigation */}
      <header className="bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded flex items-center justify-center">
              <span className="material-icons text-white">directions_bus</span>
            </div>
            <span className="text-xl font-bold tracking-tight">
              Bussresa<span className="text-primary">.ai</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a className="hover:text-primary transition-colors" href="#">Resmål</a>
            <a className="hover:text-primary transition-colors" href="#">Gruppresor</a>
            <a className="hover:text-primary transition-colors" href="#">Om oss</a>
            <button className="bg-primary/10 text-primary px-4 py-2 rounded-full hover:bg-primary hover:text-white transition-all">
              Logga in
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="relative w-full h-[450px] rounded-xl overflow-hidden mb-8 shadow-2xl">
          <img 
            alt={trip.destination}
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBcyWxKCEqFAwmjYykRwI6tXtJbs5P6CqmGLAp85Y2y8Fz-q4YBSuQEQp1x3qsoxPdhPNFHP7-d4m1SGBnpG1Tw2XrlMPxcR9h_vNkUqW6rCrf92lWQQ4P3XNVxZJq0zP_zaEpLzMzn23xmsUerp9uYUdWeoNah0rvv0mgxoW6nZzkZWGB-vFINGdYSQOURjEEefgTqwr-kOu8XIof70N4Fj1kzrYoddHLqv5EgcDfi-k86h5cS9dz7SeEG7ADDRIKzbv6k3b4q1ao"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          <div className="absolute top-6 left-6 flex gap-3">
            <span className="bg-primary text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase">
              {trip.weekNumber ? `Vecka ${trip.weekNumber}` : 'Skidresa'}
            </span>
            <span className="bg-white/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase">
              Skidresa
            </span>
          </div>
          <div className="absolute bottom-10 left-10">
            {trip.destinationCountry && (
              <nav className="flex items-center gap-2 text-white/70 text-sm mb-4">
                <span>{trip.destinationCountry}</span>
                <span className="material-icons text-xs">chevron_right</span>
                <span>Alperna</span>
              </nav>
            )}
            <h1 className="text-5xl font-extrabold text-white mb-2">
              {trip.destination}{trip.destinationCountry && `, ${trip.destinationCountry}`}
            </h1>
            <p className="text-white/90 text-lg max-w-2xl font-light">
              {trip.hotelName || 'Upplev fantastisk skidåkning i hjärtat av Alperna.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Left Column (70%) */}
          <div className="col-span-12 lg:col-span-8 space-y-8">
            {/* Main Booking Card */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-8 shadow-sm border border-primary/5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">
                    Pris per person
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-extrabold text-success">
                      {trip.price.toLocaleString()} {trip.currency}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={handleBookClick}
                  className="bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-lg font-bold text-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
                >
                  <span>Boka plats</span>
                  <span className="material-icons">arrow_forward</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8 border-t border-slate-100 dark:border-slate-800">
                {trip.includes.slice(0, 4).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <span className="material-icons text-xl">
                        {idx === 0 ? 'confirmation_number' : idx === 1 ? 'restaurant' : idx === 2 ? 'directions_bus' : 'person_pin'}
                      </span>
                    </div>
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pickup Route Section */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <span className="material-icons text-primary">route</span>
                Resplan &amp; Påstigning
              </h3>
              
              <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-primary/5">
                <div className="space-y-0 relative">
                  {/* Timeline Line */}
                  <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-slate-200 dark:bg-slate-700"></div>
                  
                  {/* Stops */}
                  {trip.departureCities.map((city, idx) => (
                    <div 
                      key={idx}
                      className={`relative flex items-center gap-4 py-4 group ${
                        idx === 1 ? 'bg-primary/5 -mx-4 px-4 rounded-lg border-l-4 border-primary' : ''
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                        idx === 1 
                          ? 'bg-primary shadow-lg shadow-primary/30' 
                          : 'bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-600'
                      }`}>
                        {idx === 1 ? (
                          <span className="material-icons text-white text-sm">location_on</span>
                        ) : (
                          <div className="w-3 h-3 rounded-full bg-slate-400"></div>
                        )}
                      </div>
                      <div>
                        <p className={`text-xs font-bold uppercase tracking-tighter leading-none ${
                          idx === 1 ? 'text-primary' : 'text-slate-500'
                        }`}>
                          {`0${6 + idx}:${idx === 0 ? '00' : idx * 15}`}
                        </p>
                        <h4 className={`font-bold ${
                          idx === 1 ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'
                        }`}>
                          {city}
                        </h4>
                        {idx === 1 && (
                          <span className="inline-block bg-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded mt-1 uppercase">
                            Vald hållplats
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Description Text */}
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <h3 className="text-2xl font-bold mb-4">Om resan till {trip.destination}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                {trip.destination} är en fantastisk destination för skidåkning. Här möts du av ett liftsystem i världsklass 
                och ett omfattande nätverk av välpreparerade pister. För dig som älskar utmaningar finns goda möjligheter 
                till offpiståkning, men området erbjuder även breda, välpistade backar för njutningsfull carving.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {trip.hotelName && `Vi bor på ${trip.hotelName} som ligger centralt med bra läge. `}
                På kvällarna finns möjligheter till afterski och socialt umgänge. Resan genomförs med {trip.company.name}.
              </p>
            </div>
          </div>

          {/* Right Sidebar (30%) */}
          <div className="col-span-12 lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              {/* Availability Card */}
              <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-primary/5">
                <div className="flex items-center gap-2 mb-6">
                  <span className="material-icons text-warning">event_seat</span>
                  <span className="text-warning font-bold text-lg">Platser kvar</span>
                </div>
                
                <div className="space-y-4 mb-6">
                  {trip.startDate && (
                    <div className="flex justify-between items-center py-3 border-b border-slate-50 dark:border-slate-800">
                      <span className="text-slate-500 text-sm">Avresa</span>
                      <span className="font-bold">{trip.startDate}</span>
                    </div>
                  )}
                  {trip.endDate && (
                    <div className="flex justify-between items-center py-3 border-b border-slate-50 dark:border-slate-800">
                      <span className="text-slate-500 text-sm">Hemkomst</span>
                      <span className="font-bold">{trip.endDate}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center py-3">
                    <span className="text-slate-500 text-sm">Längd</span>
                    <span className="font-bold">8 dagar / 7 nätter</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-xs font-semibold text-slate-400 uppercase">Dela resa</p>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 p-2 rounded-lg transition-colors flex items-center justify-center">
                      <span className="material-icons text-xl text-slate-600 dark:text-slate-300">share</span>
                    </button>
                    <button className="flex-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 p-2 rounded-lg transition-colors flex items-center justify-center">
                      <span className="material-icons text-xl text-slate-600 dark:text-slate-300">mail_outline</span>
                    </button>
                    <button className="flex-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 p-2 rounded-lg transition-colors flex items-center justify-center">
                      <span className="material-icons text-xl text-slate-600 dark:text-slate-300">content_copy</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Similar Trips */}
              <div className="space-y-4">
                <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 px-2">
                  Liknande resor
                </h4>
                
                {/* Mini Card 1 */}
                <div className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm border border-primary/5 hover:border-primary/20 transition-all group cursor-pointer">
                  <div className="h-24 overflow-hidden relative">
                    <img 
                      alt="Bad Gastein"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDK3gwAUi9mgwPPV5HlYH7wFi5VZBzUnvuzcNrZrXe0kNeFN2KRRfJYijhiEJaco76ZldCQCgLpT31E0fyt5PCtCfZd7tZYwiZvvHjSviFhIuHcJ8hYpo_X5pzyGkA1Ebp6-HJ43lnaZzHpI9vx1sbmCgAJ7l3C7vyPtzocVaEbHX0o7kCKjGvbeofAvLL7-k4GfEduoyN7FsTy8PT1Tw5fl0WhLUrRrKF6xVTxue1Ci1Gs9oGAnB4TeddnLASGmRhxGqrlVRhYEDvQ"
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                  </div>
                  <div className="p-4">
                    <h5 className="font-bold mb-1">Bad Gastein, Österrike</h5>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-500">Vecka 9 • 8 dagar</span>
                      <span className="text-primary font-bold">5,250 kr</span>
                    </div>
                  </div>
                </div>

                {/* Mini Card 2 */}
                <div className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm border border-primary/5 hover:border-primary/20 transition-all group cursor-pointer">
                  <div className="h-24 overflow-hidden relative">
                    <img 
                      alt="Val Thorens"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9P0UV5gWhEkVSLDMhsp7XF_0lP00KU2FZmZk1T5KXJ-hTHLrhDIoYTx3PbGBUGCRjyV-cDUNkARQbNKHiJ0ZzaJRhVJKiLq-a4p9WdRMqIMaUbJKdxekIFsmNkqAGQhttedrf_mFHrcr-1zZ7B6Gp-mjLIw99QQabj7TvZCdTuC1aOknHsQz1PXbfenGiJaIeld81-qEbGa1HRZq8BJnc0Z68NZ9JuISGt_du8w7GhA6vEZQ59pc7VR_SecyGbpr5nZ5G0lqd7fGq"
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                  </div>
                  <div className="p-4">
                    <h5 className="font-bold mb-1">Val Thorens, Frankrike</h5>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-500">Vecka 8 • 8 dagar</span>
                      <span className="text-primary font-bold">6,800 kr</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-background-dark border-t border-primary/10 mt-20 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 opacity-60">
            <div className="w-8 h-8 bg-slate-400 rounded flex items-center justify-center">
              <span className="material-icons text-white text-sm">directions_bus</span>
            </div>
            <span className="font-bold">Bussresa.ai</span>
          </div>
          <p className="text-slate-400 text-sm">© 2024 Bussresa.ai - Din partner för äventyr i Alperna.</p>
          <div className="flex gap-6 text-slate-400 text-sm">
            <a className="hover:text-primary" href="#">Villkor</a>
            <a className="hover:text-primary" href="#">Integritet</a>
            <a className="hover:text-primary" href="#">FAQ</a>
          </div>
        </div>
      </footer>
    </>
  );
}
