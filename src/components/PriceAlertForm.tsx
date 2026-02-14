"use client";

import { useState, FormEvent } from "react";

export default function PriceAlertForm() {
  const [email, setEmail] = useState("");
  const [departureCity, setDepartureCity] = useState("");
  const [destination, setDestination] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/price-alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, departureCity, destination, maxPrice }),
      });

      if (res.ok) {
        setStatus("success");
        setMessage("Prisbevakning skapad! Vi meddelar dig när priset sjunker.");
        setEmail("");
        setDepartureCity("");
        setDestination("");
        setMaxPrice("");
      } else {
        const data = await res.json();
        setStatus("error");
        setMessage(data.error || "Något gick fel");
      }
    } catch {
      setStatus("error");
      setMessage("Kunde inte skapa prisbevakning");
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-2">
        📧 Bevaka priser
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Få ett mejl när priset sjunker på resor du är intresserad av.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Din e-postadress"
            required
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
          <input
            type="text"
            value={departureCity}
            onChange={(e) => setDepartureCity(e.target.value)}
            placeholder="Avgångsort"
            required
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Destination (valfritt)"
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max pris SEK (valfritt)"
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
        >
          {status === "loading" ? "Sparar..." : "Bevaka pris"}
        </button>

        {status === "success" && (
          <p className="text-green-600 text-sm">{message}</p>
        )}
        {status === "error" && (
          <p className="text-red-600 text-sm">{message}</p>
        )}
      </form>
    </div>
  );
}
