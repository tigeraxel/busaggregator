"use client";

import { Suspense, useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import TripCard from "@/components/TripCard";
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

function SearchContent() {
  const searchParams = useSearchParams();
  const [trips, setTrips] = useState<TripData[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  // Filter state from URL params
  const [departureCity, setDepartureCity] = useState(
    searchParams.get("departureCity") || ""
  );
  const [destination, setDestination] = useState(
    searchParams.get("destination") || ""
  );
  const [maxPrice, setMaxPrice] = useState(
    searchParams.get("maxPrice") || ""
  );
  const [weekNumber, setWeekNumber] = useState(
    searchParams.get("weekNumber") || ""
  );
  const [sortBy, setSortBy] = useState("price");

  const fetchTrips = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (departureCity) params.set("departureCity", departureCity);
      if (destination) params.set("destination", destination);
      if (maxPrice) params.set("maxPrice", maxPrice);
      if (weekNumber) params.set("weekNumber", weekNumber);
      params.set("sortBy", sortBy);

      const res = await fetch(`/api/trips?${params.toString()}`);
      const data = await res.json();
      setTrips(data.trips || []);
      setTotalCount(data.pagination?.totalCount || 0);
    } catch (error) {
      console.error("Search failed:", error);
      setTrips([]);
    } finally {
      setLoading(false);
    }
  }, [departureCity, destination, maxPrice, weekNumber, sortBy]);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTrips();
  };

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
            href="/admin"
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Admin
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-72 shrink-0">
            <form
              onSubmit={handleFilterSubmit}
              className="bg-white rounded-lg shadow-md border border-gray-200 p-6 sticky top-8"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                🔍 Filtrera resor
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Avgångsort
                  </label>
                  <input
                    type="text"
                    value={departureCity}
                    onChange={(e) => setDepartureCity(e.target.value)}
                    placeholder="t.ex. Göteborg"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Destination
                  </label>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="t.ex. St. Anton"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max pris (SEK)
                  </label>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="t.ex. 7000"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vecka
                  </label>
                  <input
                    type="number"
                    value={weekNumber}
                    onChange={(e) => setWeekNumber(e.target.value)}
                    placeholder="t.ex. 8"
                    min="1"
                    max="52"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sortera efter
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  >
                    <option value="price">Lägsta pris</option>
                    <option value="date">Senast tillagda</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  Sök resor
                </button>
              </div>
            </form>
          </aside>

          {/* Results */}
          <section className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Sökresultat</h2>
              {!loading && (
                <p className="text-sm text-gray-600">
                  {totalCount} {totalCount === 1 ? "resa" : "resor"} hittade
                </p>
              )}
            </div>

            {loading && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-2 text-gray-600">Söker resor...</p>
              </div>
            )}

            {!loading && trips.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
                <p className="text-xl text-gray-500 mb-2">
                  Inga resor hittades
                </p>
                <p className="text-sm text-gray-400">
                  Prova att ändra dina sökkriterier.
                </p>
              </div>
            )}

            {!loading && trips.length > 0 && (
              <div className="grid grid-cols-1 gap-6">
                {trips.map((trip) => (
                  <TripCard key={trip.id} trip={trip} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Laddar...</p>
          </div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
