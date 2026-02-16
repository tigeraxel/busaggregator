"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface TripData {
  id: number;
  destination: string;
  destinationCountry?: string | null;
  price: number;
  currency: string;
  weekNumber?: number | null;
  startDate?: string | null;
  endDate?: string | null;
  includes: string[];
  hotelName?: string | null;
  company: {
    name: string;
  };
}

export default function ComparePage() {
  const params = useParams();
  const [trip, setTrip] = useState<TripData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // User inputs for comparison
  const [people, setPeople] = useState(2);
  const [fuelCostPerLiter, setFuelCostPerLiter] = useState(20);
  const [distanceKm, setDistanceKm] = useState(1500);
  const [fuelConsumption, setFuelConsumption] = useState(0.7);
  const [tollCost, setTollCost] = useState(500);
  const [cabinPricePerNight, setCabinPricePerNight] = useState(3000);
  const [nights, setNights] = useState(7);
  const [flightPrice, setFlightPrice] = useState(3000);
  const [hotelPricePerNight, setHotelPricePerNight] = useState(1500);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Laddar...</p>
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

  // Calculations
  const busTotalCost = trip.price * people;

  const fuelTotal = distanceKm * 2 * fuelConsumption * fuelCostPerLiter;
  const cabinTotal = cabinPricePerNight * nights;
  const carTotalCost = fuelTotal + tollCost * 2 + cabinTotal;

  const flightTotal = flightPrice * people;
  const hotelTotal = hotelPricePerNight * nights;
  const flightTotalCost = flightTotal + hotelTotal;

  const cheapest = Math.min(busTotalCost, carTotalCost, flightTotalCost);

  const busSavingsVsCar = carTotalCost - busTotalCost;
  const busSavingsVsFlight = flightTotalCost - busTotalCost;

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
            href={`/trip/${trip.id}`}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            ← Tillbaka till resan
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            📊 Jämför resealternativ
          </h2>
          <p className="text-gray-500">
            {trip.destination}
            {trip.weekNumber ? ` — Vecka ${trip.weekNumber}` : ""}
          </p>
        </div>

        {/* People selector */}
        <div className="bg-white rounded-lg shadow-sm border p-4 mb-6 max-w-md mx-auto">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Antal resenärer
          </label>
          <input
            type="number"
            value={people}
            onChange={(e) => setPeople(Math.max(1, parseInt(e.target.value) || 1))}
            min="1"
            max="20"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 3-Column Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Bus Option */}
          <div
            className={`bg-white rounded-lg shadow-md border-2 p-6 ${
              busTotalCost === cheapest
                ? "border-green-500 ring-2 ring-green-200"
                : "border-gray-200"
            }`}
          >
            {busTotalCost === cheapest && (
              <div className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
                ✅ Billigast
              </div>
            )}
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              🚌 Bussresa
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              via {trip.company.name}
            </p>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Busspris per person</span>
                <span className="text-gray-900 font-medium">
                  {trip.price.toLocaleString()} {trip.currency}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Antal resenärer</span>
                <span className="text-gray-900 font-medium">× {people}</span>
              </div>
              {trip.includes.length > 0 && (
                <div className="pt-2 border-t">
                  <p className="text-xs text-gray-500 mb-1">Ingår:</p>
                  <div className="flex flex-wrap gap-1">
                    {trip.includes.map((item, i) => (
                      <span
                        key={i}
                        className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full"
                      >
                        ✓ {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="border-t pt-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-900">Totalt</span>
                <span className="text-2xl font-bold text-blue-600">
                  {busTotalCost.toLocaleString()} kr
                </span>
              </div>
            </div>
          </div>

          {/* Car + Cabin Option */}
          <div
            className={`bg-white rounded-lg shadow-md border-2 p-6 ${
              carTotalCost === cheapest
                ? "border-green-500 ring-2 ring-green-200"
                : "border-gray-200"
            }`}
          >
            {carTotalCost === cheapest && (
              <div className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
                ✅ Billigast
              </div>
            )}
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              🚗 Bil + Stuga
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Kör själv och hyr stuga
            </p>

            <div className="space-y-3 mb-4">
              <div>
                <label className="block text-xs text-gray-500 mb-0.5">
                  Avstånd enkel väg (km)
                </label>
                <input
                  type="number"
                  value={distanceKm}
                  onChange={(e) =>
                    setDistanceKm(parseInt(e.target.value) || 0)
                  }
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm text-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-0.5">
                  Bränsleförbrukning (kr/km)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={fuelConsumption}
                  onChange={(e) =>
                    setFuelConsumption(parseFloat(e.target.value) || 0)
                  }
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm text-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-0.5">
                  Bränslepris (kr/liter)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={fuelCostPerLiter}
                  onChange={(e) =>
                    setFuelCostPerLiter(parseFloat(e.target.value) || 0)
                  }
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm text-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-0.5">
                  Vägtullar enkel väg (kr)
                </label>
                <input
                  type="number"
                  value={tollCost}
                  onChange={(e) => setTollCost(parseInt(e.target.value) || 0)}
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm text-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-0.5">
                  Stugpris per natt (kr)
                </label>
                <input
                  type="number"
                  value={cabinPricePerNight}
                  onChange={(e) =>
                    setCabinPricePerNight(parseInt(e.target.value) || 0)
                  }
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm text-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-0.5">
                  Antal nätter
                </label>
                <input
                  type="number"
                  value={nights}
                  onChange={(e) =>
                    setNights(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm text-gray-900"
                />
              </div>
            </div>

            <div className="text-xs text-gray-500 space-y-1 mb-3 border-t pt-2">
              <div className="flex justify-between">
                <span>Bränsle (tur & retur)</span>
                <span>{Math.round(fuelTotal).toLocaleString()} kr</span>
              </div>
              <div className="flex justify-between">
                <span>Vägtullar (tur & retur)</span>
                <span>{(tollCost * 2).toLocaleString()} kr</span>
              </div>
              <div className="flex justify-between">
                <span>
                  Stuga ({nights} nätter)
                </span>
                <span>{cabinTotal.toLocaleString()} kr</span>
              </div>
            </div>

            <div className="border-t pt-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-900">Totalt</span>
                <span className="text-2xl font-bold text-orange-600">
                  {Math.round(carTotalCost).toLocaleString()} kr
                </span>
              </div>
            </div>
          </div>

          {/* Flight + Hotel Option */}
          <div
            className={`bg-white rounded-lg shadow-md border-2 p-6 ${
              flightTotalCost === cheapest
                ? "border-green-500 ring-2 ring-green-200"
                : "border-gray-200"
            }`}
          >
            {flightTotalCost === cheapest && (
              <div className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
                ✅ Billigast
              </div>
            )}
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              ✈️ Flyg + Hotell
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Flyg och boka hotell separat
            </p>

            <div className="space-y-3 mb-4">
              <div>
                <label className="block text-xs text-gray-500 mb-0.5">
                  Flygpris per person (kr)
                </label>
                <input
                  type="number"
                  value={flightPrice}
                  onChange={(e) =>
                    setFlightPrice(parseInt(e.target.value) || 0)
                  }
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm text-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-0.5">
                  Hotellpris per natt (kr)
                </label>
                <input
                  type="number"
                  value={hotelPricePerNight}
                  onChange={(e) =>
                    setHotelPricePerNight(parseInt(e.target.value) || 0)
                  }
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm text-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-0.5">
                  Antal nätter
                </label>
                <input
                  type="number"
                  value={nights}
                  onChange={(e) =>
                    setNights(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm text-gray-900"
                />
              </div>
            </div>

            <div className="text-xs text-gray-500 space-y-1 mb-3 border-t pt-2">
              <div className="flex justify-between">
                <span>
                  Flyg ({people} {people === 1 ? "person" : "personer"})
                </span>
                <span>{flightTotal.toLocaleString()} kr</span>
              </div>
              <div className="flex justify-between">
                <span>
                  Hotell ({nights} nätter)
                </span>
                <span>{hotelTotal.toLocaleString()} kr</span>
              </div>
            </div>

            <div className="border-t pt-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-900">Totalt</span>
                <span className="text-2xl font-bold text-purple-600">
                  {flightTotalCost.toLocaleString()} kr
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Savings Summary */}
        {busTotalCost === cheapest && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-green-800 mb-2">
              🎉 Bussen är billigast!
            </h3>
            <div className="space-y-1">
              {busSavingsVsCar > 0 && (
                <p className="text-green-700">
                  Du sparar{" "}
                  <span className="font-bold">
                    {Math.round(busSavingsVsCar).toLocaleString()} kr
                  </span>{" "}
                  jämfört med att köra bil.
                </p>
              )}
              {busSavingsVsFlight > 0 && (
                <p className="text-green-700">
                  Du sparar{" "}
                  <span className="font-bold">
                    {Math.round(busSavingsVsFlight).toLocaleString()} kr
                  </span>{" "}
                  jämfört med flyg + hotell.
                </p>
              )}
            </div>
          </div>
        )}

        {carTotalCost === cheapest && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 text-center max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-orange-800 mb-2">
              🚗 Bil + stuga är billigast!
            </h3>
            <p className="text-orange-700">
              Du sparar{" "}
              <span className="font-bold">
                {Math.round(busTotalCost - carTotalCost).toLocaleString()} kr
              </span>{" "}
              jämfört med bussen.
            </p>
          </div>
        )}

        {flightTotalCost === cheapest && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-purple-800 mb-2">
              ✈️ Flyg + hotell är billigast!
            </h3>
            <p className="text-purple-700">
              Du sparar{" "}
              <span className="font-bold">
                {Math.round(busTotalCost - flightTotalCost).toLocaleString()} kr
              </span>{" "}
              jämfört med bussen.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
