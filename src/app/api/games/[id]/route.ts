import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireRole, AuthError } from '@/lib/auth-api';

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const game = await prisma.game.findUnique({
      where: { id: params.id },
    });

    if (!game) {
      return NextResponse.json({ error: 'Game not found' }, { status: 404 });
    }

    return NextResponse.json(game);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    requireRole(req, ['SUPER_ADMIN', 'ADMIN', 'EDITOR']);
    const body = await req.json();
    const { name, slug, description, imageUrl, seoTitle, seoDescription, seoKeywords } = body;

    const current = await prisma.game.findUnique({
      where: { id: params.id },
    });

    if (!current) {
      return NextResponse.json({ error: 'Game not found' }, { status: 404 });
    }

    let finalSlug = undefined;
    if (slug !== undefined || name !== undefined) {
      const slugInput = slug !== undefined ? slug : name;
      finalSlug = slugify(slugInput);

      if (finalSlug !== current.slug) {
        const existing = await prisma.game.findUnique({
          where: { slug: finalSlug },
        });
        if (existing) {
          return NextResponse.json({ error: 'Game slug already exists' }, { status: 400 });
        }
      }
    }

    const game = await prisma.game.update({
      where: { id: params.id },
      data: {
        name,
        slug: finalSlug,
        description,
        imageUrl,
        seoTitle,
        seoDescription,
        seoKeywords,
      },
    });

    return NextResponse.json(game);
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

    await prisma.game.delete({
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
