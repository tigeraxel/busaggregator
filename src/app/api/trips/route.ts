import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const departureCity = searchParams.get("departureCity");
    const destination = searchParams.get("destination");
    const maxPrice = searchParams.get("maxPrice");
    const weekNumber = searchParams.get("weekNumber");
    const sortBy = searchParams.get("sortBy") || "price";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    // Build where clause
    const where: {
      isActive: boolean;
      destination?: { contains: string };
      price?: { lte: number };
      weekNumber?: number;
    } = { isActive: true };

    if (destination) {
      where.destination = { contains: destination };
    }

    if (maxPrice) {
      where.price = { lte: parseFloat(maxPrice) };
    }

    if (weekNumber) {
      where.weekNumber = parseInt(weekNumber);
    }

    // Get all matching trips
    const [trips, totalCount] = await Promise.all([
      prisma.trip.findMany({
        where,
        include: {
          company: { select: { name: true, websiteUrl: true, logoUrl: true } },
        },
        orderBy: sortBy === "price" ? { price: "asc" } : { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.trip.count({ where }),
    ]);

    // Post-filter by departure city (since it's stored as JSON string)
    let filteredTrips = trips;
    if (departureCity) {
      const cityLower = departureCity.toLowerCase();
      filteredTrips = trips.filter((trip) => {
        try {
          const cities: string[] = JSON.parse(trip.departureCities);
          return cities.some((c) => c.toLowerCase().includes(cityLower));
        } catch {
          return false;
        }
      });
    }

    // Parse JSON fields for response
    const parsedTrips = filteredTrips.map((trip) => ({
      ...trip,
      departureCities: JSON.parse(trip.departureCities),
      stops: trip.stops ? JSON.parse(trip.stops) : [],
      includes: trip.includes ? JSON.parse(trip.includes) : [],
    }));

    return NextResponse.json({
      trips: parsedTrips,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error("Failed to fetch trips:", error);
    return NextResponse.json(
      { error: "Failed to fetch trips" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await prisma.trip.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete trip:", error);
    return NextResponse.json(
      { error: "Failed to delete trip" },
      { status: 500 }
    );
  }
}
