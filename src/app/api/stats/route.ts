import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireRole, AuthError } from '@/lib/auth-api';

export async function GET(req: NextRequest) {
  try {
    requireRole(req, ['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'VIEWER']);

    const [banners, packages, games, faqs, media, users] = await Promise.all([
      prisma.banner.count(),
      prisma.package.count(),
      prisma.game.count(),
      prisma.fAQ.count(),
      prisma.media.count(),
      prisma.user.count(),
    ]);

    return NextResponse.json({
      banners,
      packages,
      games,
      faqs,
      media,
      users,
    });
  } catch (error: any) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
