# Bussresa.ai — AI-Powered Bus Trip Aggregator

A full-stack Next.js application that aggregates bus trip data from Swedish bus companies using AI-powered scraping.

## Features

- **Admin Panel** — Add bus company URLs, trigger scraping, view logs and stats
- **AI-Powered Scraping** — Uses Claude API to extract trip data from any website format
- **User Search** — Search trips by departure city, destination, week, and price
- **Click Tracking** — Track booking clicks with UTM parameters for monetization
- **Price Alerts** — Email signup for price drop notifications

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS 4
- **Backend**: Next.js API Routes
- **Database**: SQLite (via Prisma + libSQL adapter, switchable to PostgreSQL)
- **AI**: Anthropic Claude API for web scraping

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Environment Setup

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Required variables:
- `DATABASE_URL` — Database connection (default: `file:./prisma/dev.db`)
- `ANTHROPIC_API_KEY` — Your Anthropic API key for AI scraping

### Database Setup

```bash
npx prisma migrate dev
npx prisma generate
```

### Development

```bash
npm run dev
```

Visit:
- **Search page**: [http://localhost:3000](http://localhost:3000)
- **Admin panel**: [http://localhost:3000/admin](http://localhost:3000/admin)

### Build

```bash
npm run build
npm start
```

## API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/companies` | GET | List all bus companies |
| `/api/companies` | POST | Add a new bus company |
| `/api/companies?id=X` | DELETE | Delete a bus company |
| `/api/scrape` | POST | Trigger AI scraping for a company |
| `/api/trips` | GET | Search trips with filters |
| `/api/trips?id=X` | DELETE | Delete a trip |
| `/api/track-click` | POST | Track a booking click |
| `/api/price-alerts` | POST | Subscribe to price alerts |

## Example Bus Companies

- Nortlander — https://nortlander.se/skidresor-buss
- Lion Alpin — https://www.lionalpin.se/
- Skilink — https://skilink.se/
- MK Bussresor — https://mkbussresor.se/
- Slopestar — https://slopestar.se/
