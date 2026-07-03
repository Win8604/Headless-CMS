import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireRole, AuthError } from '@/lib/auth-api';

export async function GET(req: NextRequest) {
  try {
    const packages = await prisma.package.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(packages);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    requireRole(req, ['SUPER_ADMIN', 'ADMIN', 'EDITOR']);
    const body = await req.json();
    const { name, price, features, imageUrl, status } = body;

    if (!name || !price || !features) {
      return NextResponse.json({ error: 'Name, price, and features are required' }, { status: 400 });
    }

    const pkg = await prisma.package.create({
      data: {
        name,
        price,
        features,
        imageUrl,
        status: status !== undefined ? Boolean(status) : true,
      },
    });

    return NextResponse.json(pkg, { status: 201 });
  } catch (error: any) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
