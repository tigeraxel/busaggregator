"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface Company {
  id: number;
  name: string;
  websiteUrl: string;
  scrapeUrl: string;
  logoUrl: string | null;
  isActive: boolean;
  lastScrapedAt: string | null;
  createdAt: string;
  _count: { trips: number };
}

interface ScrapeResult {
  success?: boolean;
  error?: string;
  tripsFound?: number;
  tripsSaved?: number;
}

export default function AdminPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [scraping, setScraping] = useState<number | null>(null);
  const [scrapeResult, setScrapeResult] = useState<ScrapeResult | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [scrapeUrl, setScrapeUrl] = useState("");
  const [showForm, setShowForm] = useState(false);

  const fetchCompanies = useCallback(async () => {
    try {
      const res = await fetch("/api/companies");
      const data = await res.json();
      setCompanies(data);
    } catch (error) {
      console.error("Failed to fetch companies:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const handleAddCompany = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/companies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, websiteUrl, scrapeUrl }),
      });

      if (res.ok) {
        setName("");
        setWebsiteUrl("");
        setScrapeUrl("");
        setShowForm(false);
        fetchCompanies();
      }
    } catch (error) {
      console.error("Failed to add company:", error);
    }
  };

  const handleScrape = async (companyId: number) => {
    setScraping(companyId);
    setScrapeResult(null);

    try {
      const res = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyId }),
      });

      const data = await res.json();
      setScrapeResult(data);
      fetchCompanies();
    } catch (error) {
      console.error("Scrape failed:", error);
      setScrapeResult({ error: "Scraping failed" });
    } finally {
      setScraping(null);
    }
  };

  const handleDelete = async (companyId: number) => {
    if (!confirm("Är du säker på att du vill ta bort detta bolag?")) return;

    try {
      await fetch(`/api/companies?id=${companyId}`, { method: "DELETE" });
      fetchCompanies();
    } catch (error) {
      console.error("Failed to delete company:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              ⚙️ Admin Panel
            </h1>
            <p className="text-sm text-gray-500">Hantera bussbolag och scraping</p>
          </div>
          <Link
            href="/"
            className="text-sm text-blue-600 hover:text-blue-700 underline"
          >
            ← Tillbaka till söksidan
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <p className="text-sm text-gray-500">Bussbolag</p>
            <p className="text-3xl font-bold text-gray-900">
              {companies.length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <p className="text-sm text-gray-500">Totalt antal resor</p>
            <p className="text-3xl font-bold text-gray-900">
              {companies.reduce((sum, c) => sum + c._count.trips, 0)}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <p className="text-sm text-gray-500">Aktiva bolag</p>
            <p className="text-3xl font-bold text-gray-900">
              {companies.filter((c) => c.isActive).length}
            </p>
          </div>
        </div>

        {/* Scrape Result */}
        {scrapeResult && (
          <div
            className={`mb-6 p-4 rounded-lg border ${
              scrapeResult.error
                ? "bg-red-50 border-red-200 text-red-700"
                : "bg-green-50 border-green-200 text-green-700"
            }`}
          >
            {scrapeResult.error
              ? `❌ ${scrapeResult.error}`
              : `✅ Scraping klar! Hittade ${scrapeResult.tripsFound} resor, sparade ${scrapeResult.tripsSaved}.`}
            <button
              onClick={() => setScrapeResult(null)}
              className="ml-4 underline cursor-pointer"
            >
              Stäng
            </button>
          </div>
        )}

        {/* Add Company Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors cursor-pointer"
          >
            {showForm ? "Avbryt" : "+ Lägg till bussbolag"}
          </button>
        </div>

        {/* Add Company Form */}
        {showForm && (
          <form
            onSubmit={handleAddCompany}
            className="bg-white rounded-lg shadow-sm border p-6 mb-6"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Lägg till nytt bussbolag
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bolagsnamn
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="t.ex. Nortlander"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hemsida
                </label>
                <input
                  type="url"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  required
                  placeholder="https://nortlander.se"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Scrape URL
                </label>
                <input
                  type="url"
                  value={scrapeUrl}
                  onChange={(e) => setScrapeUrl(e.target.value)}
                  required
                  placeholder="https://nortlander.se/skidresor-buss"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900"
                />
              </div>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-lg transition-colors cursor-pointer"
              >
                Spara
              </button>
            </div>
          </form>
        )}

        {/* Company List */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
                  Bolag
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
                  Scrape URL
                </th>
                <th className="text-center px-4 py-3 text-sm font-medium text-gray-600">
                  Resor
                </th>
                <th className="text-center px-4 py-3 text-sm font-medium text-gray-600">
                  Senast scrapad
                </th>
                <th className="text-right px-4 py-3 text-sm font-medium text-gray-600">
                  Åtgärder
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                    Laddar...
                  </td>
                </tr>
              )}
              {!loading && companies.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                    Inga bussbolag tillagda ännu. Klicka &ldquo;Lägg till bussbolag&rdquo;
                    för att börja.
                  </td>
                </tr>
              )}
              {companies.map((company) => (
                <tr key={company.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">
                      {company.name}
                    </div>
                    <a
                      href={company.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-500 hover:underline"
                    >
                      {company.websiteUrl}
                    </a>
                  </td>
                  <td className="px-4 py-3">
                    <a
                      href={company.scrapeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-500 hover:underline break-all"
                    >
                      {company.scrapeUrl}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                      {company._count.trips}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-gray-500">
                    {company.lastScrapedAt
                      ? new Date(company.lastScrapedAt).toLocaleDateString(
                          "sv-SE"
                        )
                      : "Aldrig"}
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button
                      onClick={() => handleScrape(company.id)}
                      disabled={scraping === company.id}
                      className="bg-green-500 hover:bg-green-600 text-white text-xs font-medium px-3 py-1 rounded transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      {scraping === company.id ? "Scrapar..." : "🔄 Scrapa"}
                    </button>
                    <button
                      onClick={() => handleDelete(company.id)}
                      className="bg-red-500 hover:bg-red-600 text-white text-xs font-medium px-3 py-1 rounded transition-colors cursor-pointer"
                    >
                      🗑️ Ta bort
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
