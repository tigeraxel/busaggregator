"use client";

import { useState } from "react";
import Link from "next/link";

interface TripCardProps {
  trip: {
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
  };
}

export default function TripCard({ trip }: TripCardProps) {
  const [isTracking, setIsTracking] = useState(false);

  const handleBookClick = async () => {
    setIsTracking(true);
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
      // Fallback: open booking URL directly
      window.open(trip.bookingUrl, "_blank");
    } finally {
      setIsTracking(false);
    }
  };

  const priceColor =
    trip.price < 5000
      ? "text-green-600"
      : trip.price < 8000
        ? "text-yellow-600"
        : "text-red-600";

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-bold text-gray-900">
            {trip.destination}
          </h3>
          {trip.destinationCountry && (
            <p className="text-sm text-gray-500">{trip.destinationCountry}</p>
          )}
        </div>
        <div className="text-right">
          <p className={`text-2xl font-bold ${priceColor}`}>
            {trip.price.toLocaleString()} {trip.currency}
          </p>
          <p className="text-xs text-gray-400">per person</p>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600">🚌 Avgår:</span>
          <span className="text-sm text-gray-800">
            {trip.departureCities.join(", ")}
          </span>
        </div>

        {trip.stops.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">📍 Stopp:</span>
            <span className="text-sm text-gray-800">
              {trip.stops.join(", ")}
            </span>
          </div>
        )}

        {trip.weekNumber && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">📅 Vecka:</span>
            <span className="text-sm text-gray-800">{trip.weekNumber}</span>
          </div>
        )}

        {trip.startDate && trip.endDate && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">📅 Datum:</span>
            <span className="text-sm text-gray-800">
              {trip.startDate} — {trip.endDate}
            </span>
          </div>
        )}

        {trip.hotelName && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">🏨 Hotell:</span>
            <span className="text-sm text-gray-800">
              {trip.hotelName}
              {trip.hotelStars && " ⭐".repeat(trip.hotelStars)}
            </span>
          </div>
        )}

        {trip.includes.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {trip.includes.map((item, i) => (
              <span
                key={i}
                className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
              >
                ✓ {item}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between border-t pt-3">
        <span className="text-sm text-gray-500">
          via <span className="font-medium">{trip.company.name}</span>
        </span>
        <div className="flex gap-2">
          <Link
            href={`/trip/${trip.id}`}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium px-4 py-2 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors"
          >
            Detaljer
          </Link>
          <button
            onClick={handleBookClick}
            disabled={isTracking}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
          >
            {isTracking ? "Laddar..." : "Boka nu →"}
          </button>
        </div>
      </div>
    </div>
  );
}
