"use client";

import { useState, FormEvent } from "react";

interface SearchFormProps {
  onSearch: (filters: SearchFilters) => void;
}

export interface SearchFilters {
  departureCity: string;
  destination: string;
  maxPrice: string;
  weekNumber: string;
}

export default function SearchForm({ onSearch }: SearchFormProps) {
  const [departureCity, setDepartureCity] = useState("");
  const [destination, setDestination] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [weekNumber, setWeekNumber] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch({ departureCity, destination, maxPrice, weekNumber });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-md border border-gray-200 p-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-2 rounded-lg transition-colors cursor-pointer"
        >
          🔍 Sök resor
        </button>
      </div>
    </form>
  );
}
