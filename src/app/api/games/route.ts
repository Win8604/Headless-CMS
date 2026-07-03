import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireRole, AuthError } from '@/lib/auth-api';

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-') // collapse dashes
    .trim();
}

export async function GET(req: NextRequest) {
  try {
    const games = await prisma.game.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(games);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    requireRole(req, ['SUPER_ADMIN', 'ADMIN', 'EDITOR']);
    const body = await req.json();
    const { name, slug, description, imageUrl, seoTitle, seoDescription, seoKeywords } = body;

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const finalSlug = slug ? slugify(slug) : slugify(name);

    // Check slug uniqueness
    const existingGame = await prisma.game.findUnique({
      where: { slug: finalSlug },
    });

    if (existingGame) {
      return NextResponse.json({ error: 'Game slug already exists' }, { status: 400 });
    }

    const game = await prisma.game.create({
      data: {
        name,
        slug: finalSlug,
        description,
        imageUrl,
        seoTitle: seoTitle || name,
        seoDescription: seoDescription || description,
        seoKeywords,
      },
    });

    return NextResponse.json(game, { status: 201 });
  } catch (error: any) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
