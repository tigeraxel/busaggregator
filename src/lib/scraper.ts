import Anthropic from "@anthropic-ai/sdk";

interface ScrapedTrip {
  destination: string;
  destination_country?: string;
  departure_cities: string[];
  stops?: string[];
  price: number;
  currency?: string;
  week?: number;
  dates?: string;
  includes?: string[];
  hotel_name?: string;
  hotel_stars?: number;
  booking_url?: string;
}

export async function scrapeTripsWithAI(
  url: string,
  companyName: string
): Promise<ScrapedTrip[]> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is not configured");
  }

  // 1. Fetch HTML
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }

  const html = await response.text();

  // Truncate HTML to avoid token limits (keep first 100k chars)
  const truncatedHtml = html.slice(0, 100000);

  // 2. Call Claude API
  const anthropic = new Anthropic({ apiKey });

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4000,
    messages: [
      {
        role: "user",
        content: `Extract all bus trips from this HTML page from the company "${companyName}".

For each trip, return a JSON object with this structure:
{
  "destination": "St. Anton, Austria",
  "destination_country": "Austria",
  "departure_cities": ["Göteborg", "Skövde"],
  "stops": ["Kungsbacka", "Varberg", "Halmstad"],
  "price": 6995,
  "currency": "SEK",
  "week": 8,
  "dates": "2025-02-22 to 2025-03-01",
  "includes": ["liftkort", "halvpension", "skidfrakt"],
  "hotel_name": "Hotel Arlberg",
  "hotel_stars": 3,
  "booking_url": "https://..."
}

Rules:
- Return ONLY a valid JSON array.
- If no trips are found, return [].
- Do NOT include any markdown formatting, code fences, or explanations.
- For booking_url, use absolute URLs. If the URL is relative, prepend the base domain.
- Extract ALL trips you can find on the page.

HTML:
${truncatedHtml}`,
      },
    ],
  });

  // 3. Parse JSON response
  const content = message.content[0];
  if (content.type !== "text") {
    throw new Error("Unexpected response type from AI");
  }

  let responseText = content.text.trim();

  // Remove markdown code fences if present
  if (responseText.startsWith("```")) {
    responseText = responseText.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }

  const trips: ScrapedTrip[] = JSON.parse(responseText);

  if (!Array.isArray(trips)) {
    throw new Error("AI response is not an array");
  }

  return trips;
}
