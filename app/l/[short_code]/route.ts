import { NextRequest, NextResponse } from 'next/server';
import { getLinkByShortCode } from '@/data/links';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ short_code: string }> }
) {
  const { short_code } = await params;

  // Obtener el enlace de la base de datos
  const link = await getLinkByShortCode(short_code);

  // Si no existe el enlace, redirigir a página de error
  if (!link) {
    const url = new URL('/l/error-page', request.url);
    url.searchParams.set('type', 'not-found');
    url.searchParams.set('code', short_code);
    return NextResponse.redirect(url);
  }

  // Si el enlace ha expirado, redirigir a página de error
  if (link.expiresAt && new Date(link.expiresAt) < new Date()) {
    const url = new URL('/l/error-page', request.url);
    url.searchParams.set('type', 'expired');
    url.searchParams.set('code', short_code);
    return NextResponse.redirect(url);
  }

  // Redirigir a la URL original
  return NextResponse.redirect(link.originalUrl, { status: 307 });
}
