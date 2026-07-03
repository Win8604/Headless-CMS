import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireRole, AuthError } from '@/lib/auth-api';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const faq = await prisma.fAQ.findUnique({
      where: { id: params.id },
    });

    if (!faq) {
      return NextResponse.json({ error: 'FAQ not found' }, { status: 404 });
    }

    return NextResponse.json(faq);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    requireRole(req, ['SUPER_ADMIN', 'ADMIN', 'EDITOR']);
    const body = await req.json();
    const { question, answer, category, status } = body;

    const faq = await prisma.fAQ.update({
      where: { id: params.id },
      data: {
        question,
        answer,
        category,
        status: status !== undefined ? Boolean(status) : undefined,
      },
    });

    return NextResponse.json(faq);
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

    await prisma.fAQ.delete({
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
