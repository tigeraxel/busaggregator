"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import SearchForm, { SearchFilters } from "@/components/SearchForm";
import TripCard from "@/components/TripCard";
import PriceAlertForm from "@/components/PriceAlertForm";
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

export default function Home() {
  const router = useRouter();
  const [trips, setTrips] = useState<TripData[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const handleSearch = useCallback(async (filters: SearchFilters) => {
    // Navigate to search page with filters
    const params = new URLSearchParams();
    if (filters.departureCity)
      params.set("departureCity", filters.departureCity);
    if (filters.destination) params.set("destination", filters.destination);
    if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);
    if (filters.weekNumber) params.set("weekNumber", filters.weekNumber);

    router.push(`/search?${params.toString()}`);

    // Also show inline results
    setLoading(true);
    setHasSearched(true);

    try {
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
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-blue-600">
              🚌 Bussresa.ai
            </h1>
            <p className="text-sm text-gray-500">
              Jämför bussresor till Alperna från hela Sverige
            </p>
          </div>
          <Link
            href="/admin"
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Admin
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-3">
            Hitta billigaste bussresan till Alperna
          </h2>
          <p className="text-lg text-blue-100 mb-6">
            Vi samlar resor från alla svenska bussbolag — sök efter avgångsort,
            destination, vecka och pris.
          </p>
        </div>
      </section>

      {/* Search */}
      <main className="max-w-7xl mx-auto px-4 -mt-6">
        <SearchForm onSearch={handleSearch} />

        {/* Results */}
        <div className="mt-8">
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Söker resor...</p>
            </div>
          )}

          {!loading && hasSearched && trips.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500">
                Inga resor hittades. Prova att ändra dina sökkriterier.
              </p>
            </div>
          )}

          {!loading && trips.length > 0 && (
            <>
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-600">
                  Visar {trips.length} av {totalCount} resor
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {trips.map((trip) => (
                  <TripCard key={trip.id} trip={trip} />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Price Alert */}
        <div className="mt-12 mb-12">
          <PriceAlertForm />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">
            © 2025 Bussresa.ai — Jämför bussresor till Alperna från hela Sverige
          </p>
        </div>
      </footer>
    </div>
  );
}
