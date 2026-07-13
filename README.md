# JITTER LEGENDS

An original esports statistics website inspired by professional FPS stat trackers. This project presents a fictional alternate-universe career where Jacob Daniel Powell (IGN: Jitter) became one of the greatest Counter-Strike players of all time.

> This website is a fictional parody created for entertainment.

## Tech Stack

- **Frontend:** Next.js 16, React 19, TypeScript, TailwindCSS v4
- **Animations:** Framer Motion
- **Charts:** Recharts
- **Backend:** Next.js API Routes, Prisma 7 ORM
- **Database:** SQLite
- **Authentication:** JWT + bcryptjs

## Getting Started

### One-Command Local Startup

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

### Full Setup

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed the database with fictional data
npm run seed

# Start development server
npm run dev
```

### Using Docker

```bash
docker-compose up --build
```

## Default Admin Credentials

- **Username:** `admin`
- **Password:** `jitter123`

Access the admin dashboard at `/admin/login`.

## Project Structure

```
jitter-legends/
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── seed.ts                # Seed data script
│   └── migrations/            # Database migrations
├── src/
│   ├── app/
│   │   ├── page.tsx           # Home page
│   │   ├── layout.tsx         # Root layout
│   │   ├── globals.css        # Global styles (esports theme)
│   │   ├── player/[slug]/     # Player profile
│   │   ├── teams/             # Teams list & detail
│   │   ├── tournaments/       # Tournaments list & detail
│   │   ├── matches/[slug]/    # Match detail
│   │   ├── search/            # Search page
│   │   ├── hall-of-fame/      # Hall of Fame
│   │   ├── news/              # News articles
│   │   ├── timeline/          # Career timeline
│   │   ├── achievements/      # Achievements
│   │   └── admin/             # Admin dashboard
│   ├── components/
│   │   ├── Navigation.tsx     # Top navigation
│   │   ├── Footer.tsx         # Site footer
│   │   ├── HeroSection.tsx    # Home hero section
│   │   ├── StatCard.tsx       # Stat display card
│   │   ├── SectionTitle.tsx   # Section header
│   │   ├── AnimatedCounter.tsx # Animated counter
│   │   ├── DataTable.tsx      # Sortable data table
│   │   ├── LoadingSpinner.tsx # Loading state
│   │   └── ParticleBackground.tsx # Animated particles
│   └── lib/
│       ├── prisma.ts          # Prisma client
│       ├── utils.ts           # Utility functions
│       └── auth.ts            # JWT auth utilities
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## Features

- **Home Page:** Animated hero, career highlights, ranking history graph, latest news
- **Player Profile:** Full stat breakdown, team history, radar charts, match history
- **Teams:** 5 fictional organizations with custom branding
- **Tournaments:** 15+ tournaments with brackets and standings
- **Match Pages:** Scoreboard, player stats, map breakdowns
- **Hall of Fame:** Satirical GOAT achievements
- **News Feed:** Fictional articles chronicling Jitter's career
- **Career Timeline:** Interactive scrolling timeline
- **Achievements:** Custom badges with animations
- **Search:** Search across players, teams, tournaments, matches
- **Admin Dashboard:** Password-protected CRUD for all entities

## Customization

### Adding New Data

Use the admin dashboard at `/admin/login` to add players, teams, tournaments, matches, news articles, and achievements without modifying code.

### Database

The SQLite database is stored in `dev.db` at the project root. To reset:

```bash
npm run db:reset
npm run seed
```

## Disclaimer

This website is a fictional parody created for entertainment. All player statistics, teams, tournaments, and news articles are entirely fabricated.
