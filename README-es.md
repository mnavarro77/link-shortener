# 🔗 Acortador de Enlaces Pro

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.2.2-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38B2AC?style=flat-square&logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-7.7.0-2D3748?style=flat-square&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-336791?style=flat-square&logo=postgresql)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

**Transforma URLs largas en enlaces cortos y memorables con analíticas detalladas**

</div>

---

## ✨ Características

| Característica | Descripción |
|----------------|-------------|
| 🚀 **URLs Cortas** | Genera enlaces cortos usando codificación Base62 |
| 📊 **Analíticas** | Tracking de clics con geolocalización y dispositivo |
| ⚡ **Rápido** | Redirección instantánea con preservación SEO |
| 🔒 **Seguro** | Rate limiting para prevenir abuso |
| 🎨 **UI Premium** | Interfaz dark theme con glassmorphism |
| 📱 **Responsive** | Diseño adaptable a cualquier dispositivo |

---

## 🛠️ Stack Tecnológico

<div align="center">

| Tecnología | Propósito |
|------------|-----------|
| **Next.js 16** | Framework React con App Router |
| **React 19** | Librería UI |
| **TypeScript** | Tipado estático |
| **Tailwind CSS 4** | Estilos utility-first |
| **Prisma 7** | ORM para base de datos |
| **Neon PostgreSQL** | Base de datos serverless |
| **Lucide React** | Iconos |

</div>

---

## 📦 Instalación

### Prerrequisitos

- Node.js 18+
- npm, yarn, pnpm o bun
- Base de datos PostgreSQL (Neon)

### Pasos

```bash
# 1. Clonar el repositorio
git clone <repository-url>
cd acortador_link

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tu DATABASE_URL

# 4. Ejecutar migraciones de base de datos
npx prisma migrate deploy

# 5. Iniciar el servidor de desarrollo
npm run dev
```

---

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Base de datos PostgreSQL (Neon)
DATABASE_URL="postgresql://usuario:password@host/database?sslmode=require"

# Motor de Prisma
PRISMA_CLIENT_ENGINE_TYPE="library"
```

### Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Iniciar servidor de desarrollo |
| `npm run build` | Compilar para producción |
| `npm run start` | Iniciar servidor de producción |
| `npm run lint` | Ejecutar ESLint |

---

## 🗄️ Modelo de Base de Datos

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│      User       │       │      Link       │       │      Click      │
├─────────────────┤       ├─────────────────┤       ├─────────────────┤
│ id: String      │──┐    │ id: Int         │──┐    │ id: Int         │
│ email: String   │  │    │ shortUrl: String│  │    │ linkId: Int     │
│ password: String│  └──► │ originalUrl    │  └──► │ ip: String      │
│ createdAt       │       │ userId: String?│       │ userAgent       │
│ updatedAt       │       │ createdAt      │       │ country         │
└─────────────────┘       │ updatedAt      │       │ device          │
                          └────────────────┘       │ createdAt       │
                                                   └─────────────────┘

gestion de usuarios y autenticación serán implementadas en la siguiente version

```

---

## 🔌 API Endpoints

### `POST /api/shorten`

Acorta una URL larga.

**Request:**
```json
{
  "url": "https://ejemplo.com/ruta/muy/larga"
}
```

**Response:**
```json
{
  "id": 1,
  "shortUrl": "ejemplo-Aq",
  "originalUrl": "https://ejemplo.com/ruta/muy/larga",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

**Códigos de respuesta:**
- `200` - URL acortada exitosamente
- `400` - URL no proporcionada
- `429` - Rate limit excedido (2 req/60s por IP)
- `500` - Error del servidor

---

### `GET /[shortUrl]`

Redirige a la URL original y registra el clic.

**Features:**
- Captura IP, User-Agent, país, dispositivo
- Geolocalización (ciudad, región, timezone, coordenadas)
- Redirección 301/302

---

## 📁 Estructura del Proyecto

```
acortador_link/
├── prisma/
│   ├── migrations/          # Migraciones de base de datos
│   └── schema.prisma       # Esquema de Prisma
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── [shortUrl]/     # Ruta dinámica de redirección
│   │   ├── api/            # API routes
│   │   ├── globals.css     # Estilos globales
│   │   ├── layout.tsx      # Layout principal
│   │   └── page.tsx        # Página de inicio
│   ├── components/          # Componentes React
│   │   └── ShortenForm.tsx # Formulario de acortamiento
│   ├── lib/                 # Utilidades
│   │   ├── base62.ts       # Algoritmo de codificación
│   │   └── prisma.ts       # Cliente Prisma singleton
│   └── generated/           # Archivos generados
├── public/                  # Assets estáticos
├── .env                     # Variables de entorno
├── next.config.ts           # Configuración de Next.js
├── package.json             # Dependencias
├── prisma.config.ts         # Configuración de Prisma
└── tsconfig.json            # Configuración de TypeScript
```

---

## 🚧 Roadmap

### ✅ Implementado

- [x] Configuración de base de datos (Prisma 7 + Neon)
- [x] Algoritmo Base62 para codificación de URLs
- [x] API de acortamiento de URLs
- [x] Redirección inteligente con tracking
- [x] Sistema de analíticas (IP, geolocalización, dispositivo)
- [x] Rate limiting (2 req/60s por IP)
- [x] Landing page con UI premium dark theme

### ⏳ En Desarrollo

- [ ] Dashboard de analíticas con gráficos
- [ ] Queries agrupadas por país y dispositivo
- [ ] Autenticación de usuarios
- [ ] Gestión de enlaces por usuario

---

## 🎨 Diseño

El proyecto cuenta con un diseño premium dark theme:

- **Color primario:** `#22c55e` (verde)
- **Background:** `#0a0a0a` (negro profundo)
- **Efectos:** Glassmorphism con blur y transparencias
- **Animaciones:** Transiciones suaves

---

## 📄 Licencia

MIT License - ver archivo [LICENSE](LICENSE) para más detalles.

---

<div align="center">

Hecho con ❤️ usando Next.js, Prisma y PostgreSQL

</div>
