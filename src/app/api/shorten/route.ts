import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { encode } from "@/lib/base62";

// --- Rate limiter en memoria ---
const RATE_LIMIT = 2;          // máximo de peticiones
const WINDOW_MS = 60 * 1000;   // ventana de 60 segundos

const ipRequestMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const timestamps = (ipRequestMap.get(ip) ?? []).filter(t => now - t < WINDOW_MS);
    if (timestamps.length >= RATE_LIMIT) return true;
    ipRequestMap.set(ip, [...timestamps, now]);
    return false;
}
// ---------------------------------

export async function POST(request: Request) {
    try {
        // 0. Rate limiting por IP
        const ip =
            request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
            request.headers.get("x-real-ip") ??
            "unknown";

        if (isRateLimited(ip)) {
            return NextResponse.json(
                { error: "Demasiadas solicitudes. Espera un momento e intenta de nuevo." },
                { status: 429 }
            );
        }

        // 1. Obtener la 'url' del body (usa await request.json())
        const body = await request.json();
        const { url } = body;

        if (!url) {
            return NextResponse.json({ error: "URL is required" }, { status: 400 });
        }

        function extractDomainPrefix(rawUrl: string): string {
            try {
                const hostname = new URL(rawUrl).hostname;         // "www.exexex.com"
                const withoutWww = hostname.replace(/^www\./, ""); // "exexex.com"
                const name = withoutWww.split(".")[0];             // "exexex"
                return name.toLowerCase().slice(0, 10);            // "exexex"
            } catch {
                return "link";
            }
        }


        // 2. Crear el Link en Prisma.
        // IMPORTANTE: Como el campo 'shortUrl' es obligatorio en tu schema, 
        // ponle algo como "PENDING" de momento.
        const link = await db.link.create({
            data: {
                originalUrl: url,
                shortUrl: "PENDING",
            }
        });

        const domainPrefix = extractDomainPrefix(url);
        // 3. Tomar el ID numérico que generó la base de datos (link.id).
        const id = link.id;

        // 4. Generar el código Base62: const shortId = encode(link.id);
        const shortId = `${domainPrefix}-${encode(id)}`;

        // 5. Actualizar el registro en Prisma con el shortId final.
        const updatedLink = await db.link.update({
            where: { id: link.id },
            data: { shortUrl: shortId },
        });

        // 6. Responder con el objeto Link actualizado.
        return NextResponse.json(updatedLink);
    } catch (error) {
        console.error("Error shortening URL:", error);
        return NextResponse.json({ error: "Failed to shorten URL" }, { status: 500 });
    }
}

