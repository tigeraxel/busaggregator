import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const companies = await prisma.busCompany.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: { select: { trips: true } },
      },
    });
    return NextResponse.json(companies);
  } catch (error) {
    console.error("Failed to fetch companies:", error);
    return NextResponse.json(
      { error: "Failed to fetch companies" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, websiteUrl, scrapeUrl, logoUrl } = body;

    if (!name || !websiteUrl || !scrapeUrl) {
      return NextResponse.json(
        { error: "Name, websiteUrl, and scrapeUrl are required" },
        { status: 400 }
      );
    }

    const company = await prisma.busCompany.create({
      data: { name, websiteUrl, scrapeUrl, logoUrl },
    });

    return NextResponse.json(company, { status: 201 });
  } catch (error) {
    console.error("Failed to create company:", error);
    return NextResponse.json(
      { error: "Failed to create company" },
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

    await prisma.busCompany.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete company:", error);
    return NextResponse.json(
      { error: "Failed to delete company" },
      { status: 500 }
    );
  }
}
