import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireRole, AuthError } from '@/lib/auth-api';

export async function GET(req: NextRequest) {
  try {
    const banners = await prisma.banner.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(banners);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    requireRole(req, ['SUPER_ADMIN', 'ADMIN', 'EDITOR']);
    const body = await req.json();
    const { title, description, imageUrl, buttonText, buttonUrl, order, status } = body;

    if (!title || !imageUrl) {
      return NextResponse.json({ error: 'Title and image URL are required' }, { status: 400 });
    }

    const banner = await prisma.banner.create({
      data: {
        title,
        description,
        imageUrl,
        buttonText,
        buttonUrl,
        order: Number(order) || 0,
        status: status !== undefined ? Boolean(status) : true,
      },
    });

    return NextResponse.json(banner, { status: 201 });
  } catch (error: any) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
