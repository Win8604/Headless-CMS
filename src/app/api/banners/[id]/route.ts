import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireRole, AuthError } from '@/lib/auth-api';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const banner = await prisma.banner.findUnique({
      where: { id: params.id },
    });

    if (!banner) {
      return NextResponse.json({ error: 'Banner not found' }, { status: 404 });
    }

    return NextResponse.json(banner);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    requireRole(req, ['SUPER_ADMIN', 'ADMIN', 'EDITOR']);
    const body = await req.json();
    const { title, description, imageUrl, buttonText, buttonUrl, order, status } = body;

    const banner = await prisma.banner.update({
      where: { id: params.id },
      data: {
        title,
        description,
        imageUrl,
        buttonText,
        buttonUrl,
        order: order !== undefined ? Number(order) : undefined,
        status: status !== undefined ? Boolean(status) : undefined,
      },
    });

    return NextResponse.json(banner);
  } catch (error: any) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    requireRole(req, ['SUPER_ADMIN', 'ADMIN', 'EDITOR']);

    await prisma.banner.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
