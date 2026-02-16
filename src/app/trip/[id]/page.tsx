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

  const priceColor =
    trip.price < 5000
      ? "text-green-600"
      : trip.price < 8000
        ? "text-yellow-600"
        : "text-red-600";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold text-blue-600">
              🚌 Bussresa.ai
            </h1>
          </Link>
          <Link
            href="/search"
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            ← Tillbaka till sökresultat
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Trip Header */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                {trip.destination}
              </h2>
              {trip.destinationCountry && (
                <p className="text-gray-500 mt-1">{trip.destinationCountry}</p>
              )}
              <p className="text-sm text-gray-400 mt-1">
                via{" "}
                <span className="font-medium text-gray-600">
                  {trip.company.name}
                </span>
              </p>
            </div>
            <div className="text-right">
              <p className={`text-4xl font-bold ${priceColor}`}>
                {trip.price.toLocaleString()} {trip.currency}
              </p>
              <p className="text-sm text-gray-400">per person</p>
            </div>
          </div>

          {/* Trip Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">
                  🚌 Avgångsorter
                </h4>
                <p className="text-gray-900">
                  {trip.departureCities.join(", ")}
                </p>
              </div>

              {trip.stops.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    📍 Stopp längs vägen
                  </h4>
                  <p className="text-gray-900">{trip.stops.join(", ")}</p>
                </div>
              )}

              {trip.weekNumber && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    📅 Vecka
                  </h4>
                  <p className="text-gray-900">Vecka {trip.weekNumber}</p>
                </div>
              )}

              {trip.startDate && trip.endDate && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    📅 Datum
                  </h4>
                  <p className="text-gray-900">
                    {trip.startDate} — {trip.endDate}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-3">
              {trip.hotelName && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    🏨 Hotell
                  </h4>
                  <p className="text-gray-900">
                    {trip.hotelName}
                    {trip.hotelStars && " ⭐".repeat(trip.hotelStars)}
                  </p>
                </div>
              )}

              {trip.includes.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    ✅ Ingår i resan
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {trip.includes.map((item, i) => (
                      <span
                        key={i}
                        className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                      >
                        ✓ {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t">
            <button
              onClick={handleBookClick}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg transition-colors text-center cursor-pointer"
            >
              Boka nu →
            </button>
            <Link
              href={`/compare/${trip.id}`}
              className="flex-1 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-medium px-8 py-3 rounded-lg transition-colors text-center"
            >
              📊 Jämför alternativ
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
