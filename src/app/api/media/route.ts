import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireRole, AuthError } from '@/lib/auth-api';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function GET(req: NextRequest) {
  try {
    const media = await prisma.media.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(media);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    requireRole(req, ['SUPER_ADMIN', 'ADMIN', 'EDITOR']);
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save path
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    // Ensure upload directory exists
    await mkdir(uploadDir, { recursive: true });

    // File name cleanup
    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const cleanedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const finalFileName = `${uniquePrefix}-${cleanedFileName}`;
    const filePath = join(uploadDir, finalFileName);

    // Write file
    await writeFile(filePath, buffer);

    const fileUrl = `/uploads/${finalFileName}`;

    const media = await prisma.media.create({
      data: {
        name: file.name,
        url: fileUrl,
        size: file.size,
        type: file.type || 'application/octet-stream',
      },
    });

    return NextResponse.json(media, { status: 201 });
  } catch (error: any) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    console.error('Upload error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
