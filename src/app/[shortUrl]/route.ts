import { db } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";


export async function GET(request: Request, { params }: { params: Promise<{ shortUrl: string }> }) {
    // espera a los params (await params)
    const { shortUrl } = await params;

    // buscar en la base de datos
    const link = await db.link.findUnique({
        where: { shortUrl }
    });

    // si no existe el link
    if (!link) {
        return NextResponse.json({ error: 'Link no encontrado' }, { status: 404 });
    }
    // si existe captura los datos (ip, clicks, dispositivo, etc)
    const data = {
        ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
        userAgent: request.headers.get('user-agent'),
        country: request.headers.get('x-vercel-ip-country'),
        device: request.headers.get('sec-ch-device-memory'),
        referrer: request.headers.get('referer'),
        language: request.headers.get('accept-language'),
        city: request.headers.get('x-vercel-ip-city'),
        region: request.headers.get('x-vercel-ip-region'),
        timezone: request.headers.get('x-vercel-ip-timezone'),
        latitude: request.headers.get('x-vercel-ip-latitude'),
        longitude: request.headers.get('x-vercel-ip-longitude'),
    }
    console.log(data);
    // guardar el click en la base de datos
    await db.click.create({
        data: {
            linkId: link.id,
            ip: data.ip || '0.0.0.0',
            userAgent: data.userAgent || 'unknown',
            country: data.country || 'unknown',
            device: data.device || 'desktop',
        }
    })

    //redireccionar al usuario
    redirect(link.originalUrl);
};
