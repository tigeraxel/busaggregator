import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tripId, referrer } = body;

    if (!tripId) {
      return NextResponse.json(
        { error: "tripId is required" },
        { status: 400 }
      );
    }

    const ip = request.headers.get("x-forwarded-for") || "unknown";

    await prisma.click.create({
      data: {
        tripId: parseInt(tripId),
        userIp: ip,
        referrer: referrer || null,
      },
    });

    // Get the booking URL
    const trip = await prisma.trip.findUnique({
      where: { id: parseInt(tripId) },
      select: { bookingUrl: true },
    });

    if (!trip) {
      return NextResponse.json({ error: "Trip not found" }, { status: 404 });
    }

    // Add UTM parameters
    const bookingUrl = new URL(trip.bookingUrl);
    bookingUrl.searchParams.set("utm_source", "bussresa");
    bookingUrl.searchParams.set("utm_medium", "referral");

    return NextResponse.json({ bookingUrl: bookingUrl.toString() });
  } catch (error) {
    console.error("Failed to track click:", error);
    return NextResponse.json(
      { error: "Failed to track click" },
      { status: 500 }
    );
  }
}
