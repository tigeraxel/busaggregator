import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { scrapeTripsWithAI } from "@/lib/scraper";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { companyId } = body;

    if (!companyId) {
      return NextResponse.json(
        { error: "companyId is required" },
        { status: 400 }
      );
    }

    const company = await prisma.busCompany.findUnique({
      where: { id: parseInt(companyId) },
    });

    if (!company) {
      return NextResponse.json(
        { error: "Company not found" },
        { status: 404 }
      );
    }

    let scrapedTrips;
    try {
      scrapedTrips = await scrapeTripsWithAI(company.scrapeUrl, company.name);
    } catch (scrapeError) {
      const errorMessage =
        scrapeError instanceof Error ? scrapeError.message : "Unknown error";

      await prisma.scrapeLog.create({
        data: {
          companyId: company.id,
          status: "error",
          message: errorMessage,
          tripsFound: 0,
        },
      });

      await prisma.busCompany.update({
        where: { id: company.id },
        data: { lastScrapedAt: new Date() },
      });

      return NextResponse.json(
        { error: `Scraping failed: ${errorMessage}` },
        { status: 500 }
      );
    }

    // Store scraped trips
    let savedCount = 0;
    for (const trip of scrapedTrips) {
      try {
        // Parse dates if provided
        let startDate: string | undefined;
        let endDate: string | undefined;
        if (trip.dates) {
          const dateParts = trip.dates.split(" to ");
          if (dateParts.length === 2) {
            startDate = dateParts[0].trim();
            endDate = dateParts[1].trim();
          }
        }

        await prisma.trip.create({
          data: {
            companyId: company.id,
            destination: trip.destination,
            destinationCountry: trip.destination_country || null,
            departureCities: JSON.stringify(trip.departure_cities || []),
            stops: trip.stops ? JSON.stringify(trip.stops) : null,
            price: trip.price || 0,
            currency: trip.currency || "SEK",
            weekNumber: trip.week || null,
            startDate: startDate || null,
            endDate: endDate || null,
            includes: trip.includes ? JSON.stringify(trip.includes) : null,
            hotelName: trip.hotel_name || null,
            hotelStars: trip.hotel_stars || null,
            bookingUrl: trip.booking_url || company.websiteUrl,
          },
        });
        savedCount++;
      } catch (tripError) {
        console.error("Failed to save trip:", tripError);
      }
    }

    // Log success
    await prisma.scrapeLog.create({
      data: {
        companyId: company.id,
        status: "success",
        message: `Successfully scraped ${savedCount} trips`,
        tripsFound: savedCount,
      },
    });

    // Update last scraped timestamp
    await prisma.busCompany.update({
      where: { id: company.id },
      data: { lastScrapedAt: new Date() },
    });

    return NextResponse.json({
      success: true,
      tripsFound: scrapedTrips.length,
      tripsSaved: savedCount,
    });
  } catch (error) {
    console.error("Scrape error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
