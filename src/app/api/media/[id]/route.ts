import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireRole, AuthError } from '@/lib/auth-api';
import { unlink } from 'fs/promises';
import { join } from 'path';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    requireRole(req, ['SUPER_ADMIN', 'ADMIN', 'EDITOR']);

    const media = await prisma.media.findUnique({
      where: { id: params.id },
    });

    if (!media) {
      return NextResponse.json({ error: 'Media not found' }, { status: 404 });
    }

    // Resolve file path
    const fileName = media.url.replace('/uploads/', '');
    const filePath = join(process.cwd(), 'public', 'uploads', fileName);

    // Delete database record first
    await prisma.media.delete({
      where: { id: params.id },
    });

    // Try deleting actual file
    try {
      await unlink(filePath);
    } catch (err) {
      console.warn(`Could not delete file at path ${filePath}`, err);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
