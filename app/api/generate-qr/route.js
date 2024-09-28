// app/api/generate-qr/route.js
import QRCode from 'qrcode';
import { NextResponse } from 'next/server';

// Definimos el método GET para el endpoint
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('text');

  if (!text) {
    return NextResponse.json({ error: 'Missing text parameter' }, { status: 400 });
  }

  try {
    // Generar el código QR como una URL base64
    const qrCode = await QRCode.toDataURL(text);

    return NextResponse.json({ qrCode });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}