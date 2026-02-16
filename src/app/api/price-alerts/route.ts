import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, departureCity, destination, maxPrice } = body;

    if (!email || !departureCity) {
      return NextResponse.json(
        { error: "Email and departureCity are required" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const alert = await prisma.priceAlert.create({
      data: {
        email,
        departureCity,
        destination: destination || null,
        maxPrice: maxPrice ? parseFloat(maxPrice) : null,
      },
    });

    return NextResponse.json(alert, { status: 201 });
  } catch (error) {
    console.error("Failed to create price alert:", error);
    return NextResponse.json(
      { error: "Failed to create price alert" },
      { status: 500 }
    );
  }
}
