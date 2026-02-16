import "dotenv/config";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

console.log("Starting seed with PostgreSQL database...");

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // Seed Companies
  const nybergsBuss = await prisma.busCompany.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Nybergs Buss",
      websiteUrl: "https://nybergsbuss.se",
      scrapeUrl: "https://nybergsbuss.se",
      logoUrl: "https://nybergsbuss.se/logo.png",
      isActive: true,
    },
  });

  const mkResor = await prisma.busCompany.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: "MK Flygresor Bussresor Kryssningar",
      websiteUrl: "https://www.mkresor.se",
      scrapeUrl: "https://www.mkresor.se",
      logoUrl: null,
      isActive: true,
    },
  });

  const fjallexpressen = await prisma.busCompany.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: "Fjällexpressen",
      websiteUrl: "https://fjallexpressen.se",
      scrapeUrl: "https://fjallexpressen.se",
      isActive: true,
    },
  });

  const harjedalingen = await prisma.busCompany.upsert({
    where: { id: 4 },
    update: {},
    create: {
      name: "Härjedalingen",
      websiteUrl: "https://harjedalingen.se",
      scrapeUrl: "https://harjedalingen.se",
      isActive: true,
    },
  });

  const flixbus = await prisma.busCompany.upsert({
    where: { id: 5 },
    update: {},
    create: {
      name: "FlixBus",
      websiteUrl: "https://www.flixbus.se",
      scrapeUrl: "https://www.flixbus.se",
      isActive: true,
    },
  });

  const masExpressen = await prisma.busCompany.upsert({
    where: { id: 6 },
    update: {},
    create: {
      name: "MasExpressen",
      websiteUrl: "https://masexpressen.se",
      scrapeUrl: "https://masexpressen.se",
      isActive: true,
    },
  });

  console.log("Created companies:", { nybergsBuss, mkResor, fjallexpressen, harjedalingen, flixbus, masExpressen });

  // Seed Trips
  const trips = [
    // Nybergs Buss - Val di Sole
    {
      companyId: nybergsBuss.id,
      destination: "Val di Sole",
      destinationCountry: "Italien",
      departureCities: JSON.stringify(["Stockholm", "Uppsala", "Gävle", "Sundsvall"]),
      stops: JSON.stringify(["Arlanda", "Bollnäs"]),
      price: 11500,
      currency: "SEK",
      weekNumber: 10,
      startDate: "2026-02-28",
      endDate: "2026-03-08",
      includes: JSON.stringify([
        "Bussresa",
        "Del i dubbelrum, halvpension (7 frukost och 6 middagar)",
        "Utflykter till skidområdena Pinzolo och Pejo med vår egen buss",
        "Väg och färjeavgifter",
        "Reseledare",
      ]),
      hotelName: "Hotel Dolomiti",
      hotelStars: 3,
      bookingUrl: "https://nybergsbuss.se/val-di-sole",
      originalDescription: "Drömmer du om strålande sol, perfekta pister och en magisk alpkänsla. Med sina fantastiska skidområden, moderna liftsystem och enastående vyer är Val di Sole i Italien den perfekta destinationen för skidåkare på alla nivåer.",
      isActive: true,
    },

    // MK Resor - Kirchberg in Tirol
    {
      companyId: mkResor.id,
      destination: "Kirchberg in Tirol",
      destinationCountry: "Österrike",
      departureCities: JSON.stringify(["Stockholm", "Göteborg", "Malmö"]),
      stops: JSON.stringify(["Jönköping", "Helsingborg"]),
      price: 12995,
      currency: "SEK",
      weekNumber: 8,
      startDate: "2026-02-14",
      endDate: "2026-02-22",
      includes: JSON.stringify([
        "Bussresa",
        "Logi på Hotel Zentral",
        "Halvpension",
        "6 dagars liftkort",
        "Reseledare",
      ]),
      hotelName: "Hotel Zentral",
      hotelStars: 4,
      bookingUrl: "https://www.mkresor.se/kirchberg",
      originalDescription: "Följ med oss till vår absoluta favoritort i Alpvärlden! Säkra är vintersemester med skidåkning i världsklass!",
      isActive: true,
    },

    // MK Resor - Zillertal
    {
      companyId: mkResor.id,
      destination: "Zillertal",
      destinationCountry: "Österrike",
      departureCities: JSON.stringify(["Stockholm", "Uppsala", "Örebro"]),
      stops: JSON.stringify(["Västerås", "Arboga"]),
      price: 10295,
      currency: "SEK",
      weekNumber: 9,
      startDate: "2026-02-21",
      endDate: "2026-03-01",
      includes: JSON.stringify([
        "Bussresa",
        "Logi",
        "Halvpension",
        "6 dagars liftkort",
        "Reseledare",
      ]),
      hotelName: null,
      hotelStars: null,
      bookingUrl: "https://www.mkresor.se/zillertal",
      originalDescription: "Att resa till Alperna i mars när vårsolen börjar titta fram är kanske bästa tiden för en härlig skidvecka.",
      isActive: true,
    },

    // Fjällexpressen - Åre
    {
      companyId: fjallexpressen.id,
      destination: "Åre, Jämtland",
      destinationCountry: "Sverige",
      departureCities: JSON.stringify(["Stockholm Cityterminalen", "Uppsala Resecentrum", "Gävle Bro"]),
      stops: JSON.stringify(["Arlanda", "Tierp"]),
      price: 895,
      currency: "SEK",
      weekNumber: 7,
      startDate: "2026-02-07",
      endDate: "2026-02-14",
      includes: JSON.stringify([
        "6 dagars liftkort ingår",
        "Modern turistbuss med WiFi",
        "Eluttag vid stolarna",
        "Toalett ombord",
        "Extra benutrymme",
      ]),
      hotelName: null,
      hotelStars: null,
      bookingUrl: "https://fjallexpressen.se/are",
      originalDescription: "Sveriges populäraste skidort med fantastisk offpist och ett livligt nöjesliv.",
      isActive: true,
    },

    // Härjedalingen - Sälen
    {
      companyId: harjedalingen.id,
      destination: "Sälen, Lindvallen",
      destinationCountry: "Sverige",
      departureCities: JSON.stringify(["Uppsala Resecentrum", "Stockholm Cityterminalen", "Västerås"]),
      stops: JSON.stringify(["Enköping", "Fagersta"]),
      price: 645,
      currency: "SEK",
      weekNumber: 9,
      startDate: "2026-02-21",
      endDate: "2026-02-28",
      includes: JSON.stringify([
        "Bussresa med WiFi",
        "Eluttag",
        "Toalett ombord",
      ]),
      hotelName: null,
      hotelStars: null,
      bookingUrl: "https://harjedalingen.se/salen",
      originalDescription: "Familjevänliga Sälen erbjuder skidåkning för alla nivåer med närhet till både Stockholm och Norge.",
      isActive: true,
    },

    // FlixBus - Vemdalen
    {
      companyId: flixbus.id,
      destination: "Vemdalen",
      destinationCountry: "Sverige",
      departureCities: JSON.stringify(["Gävle Bro", "Bollnäs", "Ljusdal"]),
      stops: JSON.stringify(["Järvsö"]),
      price: 520,
      currency: "SEK",
      weekNumber: 8,
      startDate: "2026-02-14",
      endDate: "2026-02-21",
      includes: JSON.stringify([
        "Bussresa med WiFi",
        "Toalett ombord",
      ]),
      hotelName: null,
      hotelStars: null,
      bookingUrl: "https://www.flixbus.se/vemdalen",
      originalDescription: "Mysiga och naturnära Vemdalen i Härjedalen erbjuder fantastisk skidåkning i vacker fjällmiljö.",
      isActive: true,
    },

    // MasExpressen - Idre Fjäll
    {
      companyId: masExpressen.id,
      destination: "Idre Fjäll",
      destinationCountry: "Sverige",
      departureCities: JSON.stringify(["Västerås Resecentrum", "Örebro", "Mora"]),
      stops: JSON.stringify(["Fagersta", "Ludvika"]),
      price: 710,
      currency: "SEK",
      weekNumber: 10,
      startDate: "2026-02-28",
      endDate: "2026-03-07",
      includes: JSON.stringify([
        "Bussresa med WiFi",
        "Toalett ombord",
      ]),
      hotelName: null,
      hotelStars: null,
      bookingUrl: "https://masexpressen.se/idre",
      originalDescription: "Sveriges sydligaste fjällby med garanterat snö och fjällupplevelser för hela familjen.",
      isActive: true,
    },

    // Additional trips
    {
      companyId: fjallexpressen.id,
      destination: "Trysil",
      destinationCountry: "Norge",
      departureCities: JSON.stringify(["Stockholm", "Uppsala", "Gävle"]),
      stops: JSON.stringify(["Arlanda"]),
      price: 1295,
      currency: "SEK",
      weekNumber: 8,
      startDate: "2026-02-14",
      endDate: "2026-02-21",
      includes: JSON.stringify([
        "Bussresa",
        "6 dagars liftkort",
        "WiFi och eluttag",
        "Toalett ombord",
      ]),
      hotelName: null,
      hotelStars: null,
      bookingUrl: "https://fjallexpressen.se/trysil",
      originalDescription: "Norges största skidområde med 40 liftar och över 70 nedfarter.",
      isActive: true,
    },

    {
      companyId: nybergsBuss.id,
      destination: "St. Anton am Arlberg",
      destinationCountry: "Österrike",
      departureCities: JSON.stringify(["Göteborg", "Borås", "Jönköping", "Helsingborg"]),
      stops: JSON.stringify(["Varberg", "Halmstad"]),
      price: 14995,
      currency: "SEK",
      weekNumber: 8,
      startDate: "2026-02-14",
      endDate: "2026-02-22",
      includes: JSON.stringify([
        "Bussresa",
        "6 dagars liftkort ingår",
        "Halvpension (Frukost & Middag)",
        "Modern turistbuss med WiFi",
        "Svensktalande guider på plats",
      ]),
      hotelName: "Hotel Arlberg",
      hotelStars: 4,
      bookingUrl: "https://nybergsbuss.se/st-anton",
      originalDescription: "Upplev legendarisk offpist och världens bästa afterski i hjärtat av Arlberg.",
      isActive: true,
    },

    {
      companyId: harjedalingen.id,
      destination: "Åre",
      destinationCountry: "Sverige",
      departureCities: JSON.stringify(["Sundsvall", "Ånge", "Östersund"]),
      stops: JSON.stringify(["Timrå", "Matfors"]),
      price: 425,
      currency: "SEK",
      weekNumber: 9,
      startDate: "2026-02-21",
      endDate: "2026-02-28",
      includes: JSON.stringify([
        "Bussresa",
        "WiFi ombord",
      ]),
      hotelName: null,
      hotelStars: null,
      bookingUrl: "https://harjedalingen.se/are-sundsvall",
      originalDescription: "Bekväm bussresa från Sundsvall till Åre.",
      isActive: true,
    },
  ];

  for (const tripData of trips) {
    await prisma.trip.create({
      data: tripData,
    });
  }

  console.log(`Created ${trips.length} trips`);

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
