import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const tripId = parseInt(id);

    if (isNaN(tripId)) {
      return NextResponse.json({ error: "Invalid trip ID" }, { status: 400 });
    }

    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
      include: {
        company: {
          select: { name: true, websiteUrl: true, logoUrl: true },
        },
      },
    });

    if (!trip) {
      return NextResponse.json({ error: "Trip not found" }, { status: 404 });
    }

    const parsedTrip = {
      ...trip,
      departureCities: JSON.parse(trip.departureCities),
      stops: trip.stops ? JSON.parse(trip.stops) : [],
      includes: trip.includes ? JSON.parse(trip.includes) : [],
    };

    return NextResponse.json(parsedTrip);
  } catch (error) {
    console.error("Failed to fetch trip:", error);
    return NextResponse.json(
      { error: "Failed to fetch trip" },
      { status: 500 }
    );
  }
}
