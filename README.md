# 🔗 Link Shortener Pro

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.2.2-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38B2AC?style=flat-square&logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-7.7.0-2D3748?style=flat-square&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-336791?style=flat-square&logo=postgresql)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

**Transform long URLs into short, memorable links with detailed analytics**

</div>

---

## ✨ Features

| Feature | Description |
|---------|------------|
| 🚀 **Short URLs** | Generate short links using Base62 encoding |
| 📊 **Analytics** | Click tracking with geolocation and device info |
| ⚡ **Fast** | Instant redirects with SEO preservation |
| 🔒 **Secure** | Rate limiting to prevent abuse |
| 🎨 **Premium UI** | Dark theme interface with glassmorphism |
| 📱 **Responsive** | Adaptive design for any device |

---

## 🛠️ Tech Stack

<div align="center">

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework with App Router |
| **React 19** | UI library |
| **TypeScript** | Static typing |
| **Tailwind CSS 4** | Utility-first styles |
| **Prisma 7** | Database ORM |
| **Neon PostgreSQL** | Serverless database |
| **Lucide React** | Icons |

</div>

---

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm or bun
- PostgreSQL database (Neon)

### Steps

```bash
# 1. Clone the repository
git clone <repository-url>
cd acortador_link

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# Edit .env with your DATABASE_URL

# 4. Run database migrations
npx prisma migrate deploy

# 5. Start the development server
npm run dev
```

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
# PostgreSQL database (Neon)
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"

# Prisma Engine
PRISMA_CLIENT_ENGINE_TYPE="library"
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 🗄️ Database Schema

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│      User       │       │      Link       │       │      Click      │
├─────────────────┤       ├─────────────────┤       ├─────────────────┤
│ id: String      │──┐    │ id: Int         │──┐    │ id: Int         │
│ email: String   │  │    │ shortUrl: String│  │    │ linkId: Int     │
│ password: String│  └──► │ originalUrl     │  └──► │ ip: String      │
│ createdAt       │       │ userId: String? │       │ userAgent       │
│ updatedAt       │       │ createdAt       │       │ country         │
└─────────────────┘       │ updatedAt       │       │ device          │
                          └─────────────────┘       │ createdAt       │
                                                    └─────────────────┘
```

---

## 🔌 API Endpoints

### `POST /api/shorten`

Shortens a long URL.

**Request:**
```json
{
  "url": "https://example.com/some/very/long/path"
}
```

**Response:**
```json
{
  "id": 1,
  "shortUrl": "example-Aq",
  "originalUrl": "https://example.com/some/very/long/path",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

**Response codes:**
- `200` - URL shortened successfully
- `400` - URL not provided
- `429` - Rate limit exceeded (2 req/60s per IP)
- `500` - Server error

---

### `GET /[shortUrl]`

Redirects to the original URL and records the click.

**Features:**
- Captures IP, User-Agent, country, device
- Geolocation (city, region, timezone, coordinates)
- 301/302 redirect

---

## 📁 Project Structure

```
acortador_link/
├── prisma/
│   ├── migrations/          # Database migrations
│   └── schema.prisma       # Prisma schema
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── [shortUrl]/     # Dynamic redirect route
│   │   ├── api/            # API routes
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Main layout
│   │   └── page.tsx        # Home page
│   ├── components/          # React components
│   │   └── ShortenForm.tsx # Shortening form
│   ├── lib/                 # Utilities
│   │   ├── base62.ts       # Encoding algorithm
│   │   └── prisma.ts       # Prisma singleton client
│   └── generated/           # Generated files
├── public/                  # Static assets
├── .env                     # Environment variables
├── next.config.ts           # Next.js configuration
├── package.json             # Dependencies
├── prisma.config.ts         # Prisma configuration
└── tsconfig.json            # TypeScript configuration
```

---

## 🚧 Roadmap

### ✅ Implemented

- [x] Database setup (Prisma 7 + Neon)
- [x] Base62 URL encoding algorithm
- [x] URL shortening API
- [x] Smart redirect with tracking
- [x] Analytics system (IP, geolocation, device)
- [x] Rate limiting (2 req/60s per IP)
- [x] Landing page with premium dark theme UI

### ⏳ In Development

- [ ] Analytics dashboard with charts
- [ ] Queries grouped by country and device
- [ ] User authentication
- [ ] Per-user link management

---

## 🎨 Design

The project features a premium dark theme design:

- **Primary color:** `#22c55e` (green)
- **Background:** `#0a0a0a` (deep black)
- **Effects:** Glassmorphism with blur and transparencies
- **Animations:** Smooth transitions

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

<div align="center">

Made with ❤️ using Next.js, Prisma and PostgreSQL

</div>
